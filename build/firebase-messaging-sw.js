/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

importScripts("https://www.gstatic.com/firebasejs/5.0.4/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/5.0.4/firebase-auth.js")
importScripts("https://cdn.firebase.com/libs/firebaseui/3.0.0/firebaseui.js")

const config = {
  apiKey: "AIzaSyA0G6lLOIX4oPNgDlDNbohB4UnkgqDakDk",
  authDomain: "test-5b61a.firebaseapp.com",
  projectId: "test-5b61a",
  storageBucket: "test-5b61a.appspot.com",
  messagingSenderId: "820347917785",
  appId: "1:820347917785:web:499db5408ebfef595f75c8",
  measurementId: "G-52KBXT2G6E",
};
// Initialize Firebase
firebase.initializeApp(config);
// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
