const config = {
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

// Reference messages collection

// Listen for form submit
document.getElementById("appointForm").addEventListener("submit", submitForm);

const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

// Submit form
function submitForm(e) {
  // Get values
  const name = getInputVal("name");
  const email = getInputVal("email");
  const number = getInputVal("number");
  const message = getInputVal("message");
  const department = getInputVal("department");
  const date = getInputVal("date");

  // Save message
  saveMessage(name, email, number, message, department, date).then(() => {
    location.reload();
  });

  // Clear form
}

// Function to get get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to firebase
const saveMessage = (name, email, number, message, department, date) => {
  const refKey = "messages";

  const uuid = uuidv4();
  return new Promise((resolve, reject) => {
    db.collection(refKey)
      .doc(uuid)
      .set({
        name: name,
        email: email,
        number: number,
        message: message,
        department: department,
        date: date,
      })
      .then(() => {
        alert("Thank you for reaching out to us");
        resolve(true);
      })
      .catch((err) => {
        alert("Error in submitting your request please try again later");
        console.log(err);
        reject(false);
      });
  });
};
