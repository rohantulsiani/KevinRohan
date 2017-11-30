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

export const notifyUserOfTag = (yourUser, taggedUser, entity) => {
	var string = `${yourUser.email} Tagged You in a ${entity.entityType} Titled: ${entity.subject}`
	firebase.database().ref(`users/${taggedUser}/notifications`).push(string)
	let notificationCountRef = firebase.database().ref(`users/${taggedUser}/notificationCount`);
	notificationCountRef.once('value').then(function(snapshot) {
		let oldCount = snapshot.val();
		if(oldCount)
		{
			notificationCountRef.set(oldCount + 1);
		}
		else
		{
			notificationCountRef.set(1);
		}
	})
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

export const getUser = (otherThis, uid) => {
	firebase.database().ref(`users/${uid}`).on('value', 
		(snapshot)=>{
			var val = snapshot.val()
			otherThis.setState({userObject:val})
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

export const createEntityComment = (entityType, entityId, comment, commentor, commentorEmail, anonymous, image, that) => {
	const commentObj = {
		entityId, comment, commentor, anonymous, commentorEmail
	};
	const commentRef = firebase.database().ref(`entities/${entityId}/comments`).push(commentObj);
	var commentId = commentRef.key;
	

	//upload image to firebase
	var storageRef = firebase.storage().ref('comment_image/').child(entityId).child(image.name);
	var task = storageRef.put(image);

	task.on('state_changed', 
		function(snapshot){
			var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log("there");
    		console.log(percentage);
			that.updateProgress(percentage);

		},

		function error(err){
			console.log(err);
		},

		function(){
			var path = `entities/${entityId}/comments/${commentId}/imageURL`;
			storageRef.getDownloadURL().then(function(url){
				var update = {};
				update[path] = url;
				firebase.database().ref().update(update);
				
			}).catch((error) =>{
				console.log(error);
			});

			
		});

};




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
	        	"email" : user.email,
	        	"notificationCount":0
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

export const follow = (uidYou, youUsername, uidOther, otherUsername) => {
	let youRef = firebase.database().ref(`users/${uidYou}/following/${uidOther}`);
	let otherRef = firebase.database().ref(`users/${uidOther}/followers/${uidYou}`);
	
	otherRef.set(youUsername);
	youRef.set(otherUsername);
}

export const unfollow = (uidYou, uidOther) => {
	let youRef = firebase.database().ref(`users/${uidYou}/following/${uidOther}`);
	let otherRef = firebase.database().ref(`users/${uidOther}/followers/${uidYou}`);
	
	otherRef.remove();
	youRef.remove();
}

const pushToFollowers = (currUser, actionType, actionObject) => {
	if(actionType == "CreatePost") {
		var followers = currUser.followers;
		var followString = `${actionObject.owner} Created a New ${actionObject.entityType} Titled: ${actionObject.subject}`
		for(var followerID in followers) {
			firebase.database().ref(`users/${followerID}/notifications`).push(followString)
			let notificationCountRef = firebase.database().ref(`users/${followerID}/notificationCount`);
			notificationCountRef.once('value').then(function(snapshot) {
				let oldCount = snapshot.val();
				if(oldCount)
				{
					notificationCountRef.set(oldCount + 1);
				}
				else
				{
					notificationCountRef.set(1);
				}
			})
		}
	}
}

export const setNotificationCount = (uid, count) => {
	let ref = firebase.database().ref(`users/${uid}/notificationCount`);
	ref.set(count);
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
					isAdmin: isAdmin,
					notificationCount: snapshot.val().notificationCount,
					notifications: snapshot.val().notifications,
					followers: snapshot.val().followers,
					following: snapshot.val().following
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
export const addEntity = (user, uid, entityType, options, owner, subject, timeLimit, anonymous=false, category, details, tags, timeCreatedAt) => {
	const toPush = {
		uid, entityType, options, owner, subject, timeLimit, anonymous, category, details, tags, timeCreatedAt
	}
	
	pushToFollowers(user, "CreatePost", {owner, subject, entityType});
	return firebase.database().ref('entities/').push(toPush)
}

export const updateEntity = (entityType, options, owner, subject, timeLimit, anonymous=false, category, details, tags, entityId, timeCreatedAt) => {
	const toUpdate = {
		entityType, options, owner, subject, timeLimit, anonymous, category, details, tags, timeCreatedAt
	}
	firebase.database().ref('entities/').child(entityId).update(toUpdate);
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




export const updateCommentImage = (file) =>{
	const user = firebase.auth().currentUser;

	var storageRef = firebase.storage().ref('profile_pics/').child(user.email).child(file.name);
	var task = storageRef.put(file);

	task.on('state_changed', 
		function progress(snapshot){},

		function error(err){
			console.log(err);
		},

		function complete(){
			var path = '/users/' + user.uid + '/photoURL';
			storageRef.getDownloadURL().then(function(url){
				var update = {};
				update[path] = url;
				firebase.database().ref().update(update);
				
			}).catch((error) =>{
				console.log(error);
			});

			
		});
};

export const getUsers = (dispatchGetUsers) => {
	firebase.database().ref('users/').on('value', (snapshot) => {
		dispatchGetUsers(snapshot.val());
	});
}