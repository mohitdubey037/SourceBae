/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

var config = {
    apiKey: "AIzaSyAyvbv5RFnFoVXyADTweYZDAWuo7_xP9J0",
    authDomain: "testsourcebae.firebaseapp.com",
    projectId: "testsourcebae",
    storageBucket: "testsourcebae.appspot.com",
    messagingSenderId: "388399049977",
    appId: "1:388399049977:web:c09e1d807408f12eeb8628",
    measurementId: "G-6F9HHQWTR0"
};

// Initialize Firebase
firebase.initializeApp(config);
// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("Received background message come ", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );
});