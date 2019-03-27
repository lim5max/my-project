import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyAFo42GHrNyn72nijneYibq0SmOSbUxgws",
    authDomain: "todo-9f3b9.firebaseapp.com",
    databaseURL: "https://todo-9f3b9.firebaseio.com",
    projectId: "todo-9f3b9",
    storageBucket: "todo-9f3b9.appspot.com",
    messagingSenderId: "533425128281"
  } 
  const firebaseApp=firebase.initializeApp(config)
  const firestore =firebaseApp.firestore()
 

  export default firestore
  