/**
 * @swagger
 * tags:
 *   - name: Notifications
 *     description: Push notification and device token management
 */

/**
 * @swagger
 * /user/register-fcm-token:
 *   post:
 *     summary: Register or update device token for push notifications
 *     description: |
 *       Registers a new FCM token for the authenticated user.
 *       If the user already has a token, it will be updated.
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeviceRegistration'
 *           example:
 *             fcmToken: "dQw4w9WgXcQ:APA91bH..."
 *             platform: "web"
 *     responses:
 *       200:
 *         description: Device token registered/updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Device registered for notifications"
 *                 data:
 *                   $ref: '#/components/schemas/DeviceToken'
 *       400:
 *         description: Invalid request (missing token, etc.)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "FCM token is required"
 *               error:
 *                 code: "ERR_VALIDATION"
 *                 statusCode: 400
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */