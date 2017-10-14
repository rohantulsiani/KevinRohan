import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDQrg_QY98OalGl7P-Kjw0jf5bslfpxVrQ",
    authDomain: "knowitall-893d7.firebaseapp.com",
    databaseURL: "https://knowitall-893d7.firebaseio.com",
    projectId: "knowitall-893d7",
    storageBucket: "knowitall-893d7.appspot.com",
    messagingSenderId: "904997770636"
};

export const firebaseInit = () => {
    firebase.initializeApp(firebaseConfig);
};

export const getEntities = dispatchGetEntities => {
    firebase.database().ref('entities/').on('value', dispatchGetEntities);
};
