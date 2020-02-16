import app from 'firebase/app';
import 'firebase/firestore';
import { firebaseApiKey } from '../api.js';

const config = {
    apiKey: firebaseApiKey,
    authDomain: "dino-watch-f4b2b.firebaseapp.com",
    databaseURL: "https://dino-watch-f4b2b.firebaseio.com",
    projectId: "dino-watch-f4b2b",
    storageBucket: "dino-watch-f4b2b.appspot.com",
    messagingSenderId: "139868814137",
    appId: "1:139868814137:web:1725bee6002fb6243146e8",
    measurementId: "G-T6TNN9Z79S"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.db = app.firestore();
    }

    hotLocations = () => this.db.collection("hotLocations");
}

export default Firebase;