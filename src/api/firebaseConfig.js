const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
	apiKey: 'AIzaSyDhWflJ5q5mPhcxSxtMUguNOhtC_hb8bfM',
	authDomain: 'organize-se-7cbb0.firebaseapp.com',
	databaseURL: 'https://organize-se-7cbb0-default-rtdb.firebaseio.com',
	projectId: 'organize-se-7cbb0',
	storageBucket: 'organize-se-7cbb0.appspot.com',
	messagingSenderId: '208886022234',
	appId: '1:208886022234:web:01f280b2cfb87ae78b5863'
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = {
	db
};