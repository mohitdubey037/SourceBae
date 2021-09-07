import firebase from "firebase/app";
import "firebase/messaging";

const config = {
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
export default firebase;