var config = {
  apiKey: "AIzaSyCNMpdiFyhajV8LOncj1O6lDKxLiM49EB0",
  authDomain: "contactform-758db.firebaseapp.com",
  databaseURL: "https://contactform-758db-default-rtdb.firebaseio.com",
  projectId: "contactform-758db",
  storageBucket: "contactform-758db.appspot.com",
  messagingSenderId: "228973039931",
  appId: "1:228973039931:web:44d373cae20557fd76671e",
};
firebase.initializeApp(config);

const db = firebase.firestore();

//to generate Unique ID
const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

// fullName emailAddress phone message

const submitForm = () => {
  const fullName = document.getElementById("fullName").value;
  const emailAddress = document.getElementById("emailAddress").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;
  const uuid = uuidv4();
  db.collection(`Enquiry`)
    .doc(uuid)
    .set({
      fullName: fullName,
      emailAddress: emailAddress,
      phone: phone,
      message: message,
    })
    .then(() => {
      alert("Thank you for reaching out to us");
      location.reload();
    });
};

// // Reference messages collection
// var messagesRef = firebase.database().ref('messages');

// // Listen for form submit
// document.getElementById('contactForm').addEventListener('submit', submitForm);

// // Submit form
// function submitForm(e){
//   e.preventDefault();

//   // Get values
//   var name = getInputVal('fullName');
//   var email = getInputVal('emailAddress');
//   var phone = getInputVal('phone');
//   var message = getInputVal('message');

//   // Save message
//   saveMessage(name, email, phone, message);

//   // Show alert
//   document.querySelector('.alert').style.display = 'block';

//   // Hide alert after 3 seconds
//   setTimeout(function(){
//     document.querySelector('.alert').style.display = 'none';
//   },3000);

//   // Clear form
//   document.getElementById('contactForm').reset();
// }

// // Function to get get form values
// function getInputVal(id){
//   return document.getElementById(id).value;
// }

// // Save message to firebase
// function saveMessage(name, email, phone, message){
//   var newMessageRef = messagesRef.push();
//   newMessageRef.set({
//     name: fullName,
//     email:email,
//     phone:phone,
//     message:message
//   });
// }
