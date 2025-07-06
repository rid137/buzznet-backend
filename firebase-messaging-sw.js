importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBqm2p3E91XSW5HKh5oU7VgwljOBO_IclU",
  authDomain: "buzznet-42bbc.firebaseapp.com",
  projectId: "buzznet-42bbc",
  storageBucket: "buzznet-42bbc.firebasestorage.app",
  messagingSenderId: "550197848744",
  appId: "1:550197848744:web:947c5c10e2631dfb77b09d",
  measurementId: "G-JLJENGKRY4"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const { title, body, icon, badge } = payload.notification;

  self.registration.showNotification(title, {
    body: body,
    icon: icon,
    badge: badge
  });
});
