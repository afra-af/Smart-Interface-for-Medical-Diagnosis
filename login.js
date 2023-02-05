// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDQzcewDw6Ty7P7KYVbaxqNsr0LCbrCOr0",
    authDomain: "mediserv-777a0.firebaseapp.com",
    databaseURL: "https://mediserv-777a0-default-rtdb.firebaseio.com",
    projectId: "mediserv-777a0",
    storageBucket: "mediserv-777a0.appspot.com",
    messagingSenderId: "670977678055",
    appId: "1:670977678055:web:b36d7b3b6212f52ae12042",
    measurementId: "G-J7VZFT0HMD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function


function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  username = document.getElementById('username').value
 

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }
  if (validate_field(username) == false ) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      username : username,
      
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Created!!')
   
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })

   
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is wrong!!')
    return
    // Don't continue running the code
  }


  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    if(user){
      window.location = 'index.html';
      alert('User Logged In!!')
      
    }
    

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })

  
}

auth.onAuthStateChanged(user => {
  console.log(user)
})




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}s