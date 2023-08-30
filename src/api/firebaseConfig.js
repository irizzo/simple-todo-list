const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore/lite');

require('dotenv/config');

const firebaseConfig = {
	apiKey: process.env.FIREBASECONFIG_API_KEY,
	authDomain: process.env.FIREBASECONFIG_AUTH_DOMAIN,
	projectId: process.env.FIREBASECONFIG_PROJECT_ID,
	storageBucket: process.env.FIREBASECONFIG_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASECONFIG_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASECONFIG_APP_ID,
	measurementId: process.env.FIREBASECONFIG_MEASUREMENT_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = {
	db
};