import firebase from 'firebase';
var config = {
  apiKey: "AIzaSyC5kKXGWRz4McaRJIMpbEmNXRnhUfre0q0",
  authDomain: "first-react-1f5ab.firebaseapp.com",
  databaseURL: "https://first-react-1f5ab.firebaseio.com",
  projectId: "first-react-1f5ab",
  storageBucket: "first-react-1f5ab.appspot.com",
  messagingSenderId: "511054240100",
  appId: "1:511054240100:web:fa00747900306e9cf68271"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export default firebase;