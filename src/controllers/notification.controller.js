const { successResponse } = require("../utils/apiResponse");
const notificationService = require("../services/notification.service");

class NotificationController {
    async registerDevice(req, res) {
        const userId = req.user.id;

        const { fcmToken, platform } = req.body;

        await notificationService.registerDevice(userId, fcmToken, platform)

        successResponse(res, {}, "Device registered for notifications");
    };

    async sendTestNotification(req, res) {
        // const { id } = req.params;
        const userId = req.user.id;

        await notificationService.sendToUser(userId, {
            title: 'Test Notification',
            body: 'This is a test notification from BuzzNet!',
            icon: "https://res.cloudinary.com/dnkhxafkz/image/upload/v1730950976/jcqwmzekkoejemeypfwc.png",
            badge: "https://res.cloudinary.com/dnkhxafkz/image/upload/v1730950976/jcqwmzekkoejemeypfwc.png"
        });

        successResponse(res, {}, "Test notification sent");
    };
}

module.exports = new NotificationController();
