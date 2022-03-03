import firebase from 'firebase/app';
import 'firebase/messaging';

const config = {
    apiKey: 'AIzaSyA0G6lLOIX4oPNgDlDNbohB4UnkgqDakDk',
    authDomain: 'test-5b61a.firebaseapp.com',
    projectId: 'test-5b61a',
    storageBucket: 'test-5b61a.appspot.com',
    messagingSenderId: '820347917785',
    appId: '1:820347917785:web:499db5408ebfef595f75c8',
    measurementId: 'G-52KBXT2G6E'
};
// Initialize Firebase

if (firebase?.messaging?.isSupported()) {
    firebase?.initializeApp(config);
} else {
    console.log('no-support :(');
}

export default firebase;
