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

export const registerUser = (email, password, otherThis) => {
	var uscEmail = email.substr(email.length - 7)
	
	if(uscEmail != 'usc.edu') {
		otherThis.toggleError();
		return
	}

	firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
		sendEmailVerification()
	}).catch((error)=>{
		otherThis.toggleError();
		console.log(error);
	})
}

export const getUserData = dispatchAttemptLogin => {
    firebase.auth().onAuthStateChanged(function(user) {
		dispatchAttemptLogin(user)
	});
};

export const login = (email, password) => {
	firebase.auth().signInWithEmailAndPassword(email, password)
}

export const logout = () => {
 	firebase.auth().signOut();   
}

export const sendEmailVerification = () => {
	firebase.auth().onAuthStateChanged(function(user) {
		user.sendEmailVerification().then(function() {
			console.log(user)
		}).catch(function(error) {
			console.log(error)
		})
	});
}
/*
	entityType: String --> can be a Poll, Rating, or Question
	anonymous: bool -> default is false
	owner: String -> username
	options: [String] -> poll options 
	subject: String
	timeLimit:Int -> Days to Expire
*/
export const addEntity = (entityType, options, owner, subject, timeLimit, anonymous=false, category) => {
	const toPush = {
		entityType, options, owner, subject, timeLimit, anonymous, category
	}

	firebase.database().ref('entities/').push(toPush);
}