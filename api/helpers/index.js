const firebase = require("firebase")
const config = require("../config")

const firebaseConfig = {
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  projectId: config.PROJECT_ID,
  storageBucket: config.STORAGE_BUCKET,
  messagingSenderId: config.MESSAGING_SENDER_ID,
  appId: config.APP_ID,
}

firebase.initializeApp(firebaseConfig)

module.exports = {
  db: firebase.firestore(),
  FieldValue: firebase.firestore.FieldValue,
}
