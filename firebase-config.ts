// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import Constants from 'expo-constants';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const keys = Constants.expoConfig?.extra;

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: keys?.apiKey,
	authDomain: keys?.authDomain,
	projectId: keys?.projectId,
	storageBucket: keys?.storageBucket,
	messagingSenderId: keys?.messagingSenderId,
	appId: keys?.appId,
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
export { firebase };
