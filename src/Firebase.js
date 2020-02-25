import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD7WzkLzfh1CBA7Yq6XjSBJk2GhTz5RXZM",
    authDomain: "my-project-1570175172905.firebaseapp.com",
    databaseURL: "https://my-project-1570175172905.firebaseio.com",
    projectId: "my-project-1570175172905",
    storageBucket: "my-project-1570175172905.appspot.com",
    messagingSenderId: "246654900355",
    appId: "1:246654900355:web:ddd629e5de46f2f93463b6",
    measurementId: "G-YXT682BX0K"
};
firebase.initializeApp(firebaseConfig);
var Firebase = firebase;

export default Firebase;