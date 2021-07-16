import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDUKhEJOWGTfS3DXzqZjgBR52U82LEv0yE",
    authDomain: "money-trek.firebaseapp.com",
    projectId: "money-trek",
    storageBucket: "money-trek.appspot.com",
    messagingSenderId: "553786898752",
    appId: "1:553786898752:web:6cc98306834cffea0fe2a5",
    measurementId: "G-9V0JPG7CXZ"
};

const fire = firebase.initializeApp(firebaseConfig)

export default fire;