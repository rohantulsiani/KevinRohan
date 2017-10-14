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

/*
	entityType: String --> can be a Poll, Rating, or Question
	anonymous: bool -> default is false
	owner: String -> username
	options: [String] -> poll options 
	subject: String
	timeLimit:Int -> Days to Expire
*/
export const addEntity = (entityType, options, owner, subject, timeLimit, anonymous=false) => {
	const toPush = {
		entityType, options, owner, subject, timeLimit, anonymous
	}

	firebase.database().ref('entities/').push(toPush);
}