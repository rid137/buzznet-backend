const DeviceToken = require('../models/device-token.js');
const { messaging } = require('../utils/firebase.js');
const { BadRequest } = require('../utils/error/httpErrors');
const admin = require('firebase-admin');


class NotificationService {
    async registerDevice(userId, fcmToken, platform) {
        if (!fcmToken) {
            throw BadRequest("FCM token is required");
        }

        const existing = await DeviceToken.findOne({ where: { userId, fcmToken } });

        if (existing) {
            return;
        }

        await DeviceToken.create({
            userId,
            fcmToken,
            platform,
        });

        return true;
    }



    static async sendToDevice(deviceToken, payload) {
        const message = {
            token: deviceToken,
            notification: {
                title: payload.title,
                body: payload.body,
            },
            webpush: {
                notification: {
                    icon: payload.icon,
                    badge: payload.badge
                }
            },
            data: payload.data || {}
        };

        // const response = await messaging.send(message);
        const response = await admin.messaging().send(message);
        return response;
    }

    async sendToUser(userId, payload) {
        const tokens = await DeviceToken.findOne({ userId });
        console.log("tokens", tokens)

        if (!tokens) {
            console.log(`No FCM tokens found for user ${userId}, skipping notification.`);
            return;
        }

        // return this.sendToDevice(tokens.fcmToken, payload);
        return NotificationService.sendToDevice(tokens.fcmToken, payload);
    }
}

module.exports = new NotificationService();
