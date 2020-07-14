import firebase from 'firebase'
require("firebase/firestore")

var config = {
  apiKey: 'AIzaSyCTyu9XaF-S2qiYy70bfClOotnqJo175is',
  authDomain: 'ampj-telkom.firebaseapp.com',
  databaseURL: 'https://ampj-telkom.firebaseio.com',
  projectId: 'ampj-telkom',
  storageBucket: 'ampj-telkom.appspot.com',
  messagingSenderId: '418421080964',
  appId: '1:418421080964:web:2d102f26b329c8628bd3d1',
  measurementId: 'G-HN4HBGKJDT'
}

const fb = firebase.initializeApp(config)
const db = firebase.firestore()
const inc = firebase.firestore.FieldValue.increment

export { fb, db, inc }
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     this.$store.dispatch('autoLogin', user)
//   } else {
//     this.$router.push('/')
//   }
// })
// const db = firebase.firestore()
// db.enablePersistence()
//   .catch(err => {
//     if (err.code === 'failed-precondition') {
//       // Probably multiple tabs open at once
//       console.log('persistence failed')
//     } else if (err.code === 'unimplemented') {
//       // Lack of browser support
//       console.log('persistence is not available')
//     }
//   })