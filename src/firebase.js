import firebase from "firebase/app";
import "firebase/messaging";

// const config = {
//     apiKey: "AIzaSyAyvbv5RFnFoVXyADTweYZDAWuo7_xP9J0",
//     authDomain: "testsourcebae.firebaseapp.com",
//     projectId: "testsourcebae",
//     storageBucket: "testsourcebae.appspot.com",
//     messagingSenderId: "388399049977",
//     appId: "1:388399049977:web:c09e1d807408f12eeb8628",
//     measurementId: "G-6F9HHQWTR0"
//   };
const config = {
  apiKey: "AIzaSyAmZmoINA9yjwpsU0Dh5AuQJczDau13ggI",
  authDomain: "whats-app-clone-6be49.firebaseapp.com",
  databaseURL: "https://whats-app-clone-6be49-default-rtdb.firebaseio.com",
  projectId: "whats-app-clone-6be49",
  storageBucket: "whats-app-clone-6be49.appspot.com",
  messagingSenderId: "729972322999",
  appId: "1:729972322999:web:effde3a19e21f95a7e9332",
  measurementId: "G-S9CVKPWDVH"
};
// Initialize Firebase
firebase.initializeApp(config);
export default firebase;