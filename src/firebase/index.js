import * as firebase from "firebase";

var closure = null

const firebaseConfig = {
    apiKey: "AIzaSyDQrg_QY98OalGl7P-Kjw0jf5bslfpxVrQ",
    authDomain: "knowitall-893d7.firebaseapp.com",
    databaseURL: "https://knowitall-893d7.firebaseio.com",
    projectId: "knowitall-893d7",
    storageBucket: "knowitall-893d7.appspot.com",
    messagingSenderId: "904997770636"
};

export const getCurrentUser = () => {
	return firebase.auth().currentUser
}

export const addWhoVoted = (id, entity, userID) => {
	var whoVoted = entity.whoVoted
	
	if(whoVoted == undefined)
	{
		firebase.database().ref(`entities/${id}/whoVoted`).push(userID);
		return true
	}

	for(var key in whoVoted)
	{
		if(whoVoted[key] == userID)
		{
			return false
		}
	}

	firebase.database().ref(`entities/${id}/whoVoted`).push(userID);
	return true
}

export const removeEntity = (entityID) => {
	return firebase.database().ref(`entities/${entityID}`).remove();
};

export const removeComment = (entityID, commentID) => {
	firebase.database().ref(`entities/${entityID}/comments/${commentID}`).remove();
};

export const firebaseInit = () => {
    firebase.initializeApp(firebaseConfig);
};

export const getEntities = (dispatchGetEntities, entityId) => {
    firebase.database().ref('entities/').on('value', (snapshot)=>{
    	dispatchGetEntities(snapshot.val());
    });
};

export const getEntity = (dispatchGetEntity, entityId) => {
	firebase.database().ref(`entities/${entityId}`).on('value', 
		(snapshot)=>{
		dispatchGetEntity(snapshot.val());
	});
};


export const checkPollResponseExists = (entityId, poster) => {
	return firebase.database().ref(`entities/${entityId}/pollResponses`).child(poster).once('value'); 
}

export const createPollResponse = (entityId, option, poster, posterEmail, anonymous) => {
	const postObj = {
		poster, posterEmail, option, anonymous, entityId
	}
	console.log(postObj)
	firebase.database().ref(`entities/${entityId}/pollResponses`).child(poster).set(postObj)
}

export const checkReviewExists = (entityId, reviewer) => {
	return firebase.database().ref(`entities/${entityId}/reviews`).child(reviewer).once('value'); 
}

export const createEntityReview = (entityType, entityId, stars, reviewer, reviewerEmail, review, anonymous) => {
	const reviewObj = {
		stars, reviewer, review, anonymous, entityId, reviewerEmail
	}
	console.log(reviewObj, entityId, reviewer)
	firebase.database().ref(`entities/${entityId}/reviews`).child(reviewer).set(reviewObj)
}

export const createEntityComment = (entityType, entityId, comment, commentor, commentorEmail, anonymous) => {
	const commentObj = {
		entityId, comment, commentor, anonymous, commentorEmail
	}
	firebase.database().ref(`entities/${entityId}/comments`).push(commentObj)
}


export const registerUser = (email, password) => {
	let promise = new Promise((resolve, reject) =>{
		if(firebase.auth().currentUser) {
			 reject('You are already logged in');
		}
		var uscEmail = email.substr(email.length - 7);
		
		if(uscEmail != 'usc.edu') {
			reject('Please enter an USC email');
		}

		firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
			sendEmailVerification();
			let newUser = {
	        	"isAdmin": false,
	        	"email" : user.email
	    	};
	    	resolve('success');
			firebase.database().ref(`users/${user.uid}`).set(newUser).then(()=>{
				
			});
		}).catch((error)=>{
			reject(error.message);
		})
	});
	return promise;
	
}

export const getUserData = dispatchAttemptLogin => {
    firebase.auth().onAuthStateChanged(function(user) {
    	if(user != null) {
    		var path = firebase.database().ref(`users/${user.uid}`)    		
	    	
	    	 closure = path.on('value', function(snapshot) {
	    	 	if(user != firebase.auth().currentUser){
					path.off('value', closure)
					closure = null
					return
	    	 	}

	    		const isAdmin = snapshot.val().isAdmin
	    		const newUser = {
					uid: user.uid,
					displayName: user.displayName,
					photoURL: snapshot.val().photoURL,
					email: user.email,
					emailVerified: user.emailVerified,
					isAdmin: isAdmin
	    		}

	    		dispatchAttemptLogin(newUser)
	    	}) 
    	} else {
    		dispatchAttemptLogin(user)
    	}
	});
};


export const login = (email, password, goBackToHome, otherThis) => {

	if(firebase.auth().currentUser) {
		return
	}
	firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
		goBackToHome()
	}).catch((error)=>{
		otherThis.toggleError(error.message)
	})
}

export const logout = () => {
	let currUser = firebase.auth().currentUser.uid
 	firebase.auth().signOut()
}

export const sendEmailVerification = () => {
	const user = firebase.auth().currentUser
	user.sendEmailVerification().catch(function(error) {
		console.log(error)
	})
}
/*
	entityType: String --> can be a Poll, Rating, or Question
	anonymous: bool -> default is false
	owner: String -> username
	options: [String] -> poll options 
	subject: String
	timeLimit:Int -> Days to Expire
*/
export const addEntity = (entityType, options, owner, subject, timeLimit, anonymous=false, category, details) => {
	const toPush = {
		entityType, options, owner, subject, timeLimit, anonymous, category, details
	}

	return firebase.database().ref('entities/').push(toPush)

}

export const upVote = (entityId) => {
	var databaseRef = firebase.database().ref('entities/').child(entityId).child('numUpVote');
	databaseRef.transaction((numUpVote) => {
		return (numUpVote || 0) + 1;
	})
}

export const downVote = (entityId) => {
	var databaseRef = firebase.database().ref('entities/').child(entityId).child('numDownVote');
	databaseRef.transaction((numDownVote) => {
		return (numDownVote || 0) + 1;
	})
}

export const updateProfilePic = (file) =>{
	const user = firebase.auth().currentUser

	var storageRef = firebase.storage().ref('profile_pics/').child(user.email).child(file.name);
	var task = storageRef.put(file);

	task.on('state_changed', 
		function progress(snapshot){},

		function error(err){
			console.log(err)
		},

		function complete(){
			var path = '/users/' + user.uid + '/photoURL';
			storageRef.getDownloadURL().then(function(url){
				var update = {}
				update[path] = url
				firebase.database().ref().update(update)
				
			}).catch((error) =>{
				console.log(error)
			})

			
		})
}