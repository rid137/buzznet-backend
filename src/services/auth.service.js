const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/user');
const Otp = require('../models/otp');
const { BadRequest, NotFound } = require('../utils/error/httpErrors');
const { sendVerificationEmail, sendForgotPasswordEmail } = require('../utils/email/sendEmail');
const { Op } = require('sequelize');


const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const MAX_OTP_ATTEMPTS = process.env.MAX_OTP_ATTEMPTS;

class AuthService {
    async register({ userName, email, password, firstName, lastName, role }) {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) throw BadRequest('User already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstName,
            lastName,
            role,
            userName,
            email,
            password: hashedPassword,
        });

        const code = crypto.randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await Otp.create({ email, code, expiresAt });
        await sendVerificationEmail(email, userName, code);

        return user;
    }

    async createUser({ userName, email, password, firstName, lastName, role }) {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) throw BadRequest('User already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ 
            firstName,
            lastName,
            role,
            userName, 
            email,
            password: hashedPassword 
        });

        const code = crypto.randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await Otp.create({ email, code, expiresAt });
        await sendVerificationEmail(email, userName, code);

        return user;
    }

    async login({ email, password }) {
        const user = await User.scope('withPassword').findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw BadRequest('Invalid email or password');
        }

        return user;
    }

    async requestOtp(email) {
        const user = await User.findOne({ where: { email } });
        if (!user) throw NotFound('User not found.');
        if (user.isVerified) throw BadRequest('User already verified.');

        const code = crypto.randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await Otp.destroy({ where: { email } });
        await Otp.create({ email, code, expiresAt });
        await sendVerificationEmail(email, user.userName, code);

    }

    // async verifyOtp(email, code) {
    //     const otpRecord = await Otp.findOne({ where: { email, code } });

    //     if (!otpRecord) throw BadRequest('Invalid or expired OTP.');

    //     const isExpired = otpRecord.expiresAt.getTime() < Date.now();
    //     if (isExpired) {
    //         await otpRecord.destroy();
    //         throw BadRequest('OTP has expired.');
    //     }

    //     const user = await User.findOne({ where: { email } });
    //     if (!user) throw NotFound('User not found.');

    //     user.isVerified = true;
    //     await user.save();
    //     await otpRecord.destroy();
    // }

    async verifyOtp(email, code) {
        const otpRecord = await Otp.findOne({
            where: {
            email,
            code,
            expiresAt: { [Op.gt]: new Date() },
            },
        });

        if (!otpRecord) {
            // Still find by email and increment attempts
            const existingOtp = await Otp.findOne({ where: { email } });
            if (existingOtp) {
                await Otp.increment('attempts', { where: { email } });

                if (existingOtp.attempts + 1 >= MAX_OTP_ATTEMPTS) {
                    await existingOtp.destroy();
                    throw BadRequest('Too many incorrect attempts. Please request a new OTP.');
                }
            }

            throw BadRequest('Invalid or expired OTP');
        }

        // Check attempts
        if (otpRecord.attempts >= MAX_OTP_ATTEMPTS) {
            await otpRecord.destroy();
            throw BadRequest('Too many incorrect attempts. Please request a new OTP.');
        }

        const user = await User.findOne({ where: { email } });
        if (!user) throw NotFound('User not found');

        user.isVerified = true;
        await user.save();
        await otpRecord.destroy();
    }

    async forgotPassword(email) {
        if (!email) throw BadRequest('Email is required');

        const user = await User.findOne({ where: { email } });
        if (!user) throw NotFound('User not found');

        const code = crypto.randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await Otp.destroy({ where: { email } });

        await Otp.create({ email, code, expiresAt });

        const resetUrl = `${FRONTEND_URL}/reset-password?token=${code}`;

        await sendForgotPasswordEmail(email, user.userName, resetUrl);
    }

    async resetPassword({email, code, newPassword}) {
        if (!email || !code || !newPassword) {
            throw BadRequest('Email, OTP and new password are required');
        }

        const otpRecord = await Otp.findOne({
            where: {
                email,
                code,
                expiresAt: {
                    [Op.gt]: new Date(),
                },
            },
        });

        if (!otpRecord) throw BadRequest('Invalid or expired OTP');

        const user = await User.findOne({ where: { email } });
        if (!user) throw NotFound('User not found');

        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        await user.save();

        await otpRecord.destroy();
    }
    
    async getCurrentUser({ id }) {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            throw NotFound("User not found");
        }

        return user;
    }
}

module.exports = new AuthService();