const nodemailer = require('nodemailer');
const path = require('path');
const { create } = require('express-handlebars');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const hbs = create({
  extname: '.hbs',
  defaultLayout: false,
});

// Async setup to inject handlebars compiler
async function setupEmailTemplates() {
  const { default: nodemailerExpressHandlebars } = await import('nodemailer-express-handlebars');

  transporter.use('compile', nodemailerExpressHandlebars({
    viewEngine: {
      extname: '.hbs',
      layoutsDir: path.resolve(__dirname, 'templates/layouts'),
      partialsDir: path.resolve(__dirname, 'templates/partials'),
      defaultLayout: 'base',
      helpers: {},
    },
    viewPath: path.resolve(__dirname, 'templates'),
    extName: '.hbs',
  }));
}

const sendEmail = async (options) => {
  await setupEmailTemplates();

  const currentYear = new Date().getFullYear();

  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME || 'App Name'}" <${process.env.EMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    template: options.template,
    context: {
      ...options.context,
      appName: process.env.APP_NAME || 'Our App',
      supportEmail: process.env.SUPPORT_EMAIL || 'support@example.com',
      baseUrl: process.env.BASE_URL || 'https://yourapp.com',
      logoUrl: process.env.LOGO_URL || '',
      year: currentYear,
    },
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Email sending failed');
  }
};

const sendVerificationEmail = async (email, username, otp) => {
  return sendEmail({
    to: email,
    subject: 'Verify Your Email Address',
    template: 'verification',
    context: { username, otp },
  });
};

const sendWelcomeEmail = async (email, username) => {
  return sendEmail({
    to: email,
    subject: 'Welcome to Our App!',
    template: 'welcome',
    context: { username },
  });
};

const sendForgotPasswordEmail = async (email, username, resetLink) => {
  return sendEmail({
    to: email,
    subject: 'Reset Your Password',
    template: 'forgotPassword',
    context: { username, resetLink },
  });
};

module.exports = {
  sendEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
  sendForgotPasswordEmail,
};