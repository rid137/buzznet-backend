// const admin = require('firebase-admin');
// const serviceAccount = require('../config/firebase-service-account')

// if (!admin.apps.length) {
//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//         // databaseURL: process.env.FIREBASE_DATABASE_URL
//     });
// }

// const messaging = admin.messaging();
// module.exports = messaging;

const admin = require('firebase-admin');

const serviceAccount = require('../config/firebase-service-account')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
