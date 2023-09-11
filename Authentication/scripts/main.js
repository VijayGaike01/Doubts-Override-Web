import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import {firebaseApp} from "../../Firebase/firebase-config.js"



let btnGoToLogin = document.getElementById("goToLogin");
let btnGoToSignUp = document.getElementById("goToSignUp");

let signIn = document.querySelector(".login");
let signUp = document.querySelector(".signup");


btnGoToLogin.onclick = function(){
    signIn.classList.add("active");
    signUp.classList.add("inActive");
}

btnGoToSignUp.onclick = function(){
   signIn.classList.remove("active");
   signUp.classList.remove("inActive");
}

const auth = getAuth(firebaseApp); // Initialize Firebase Authentication

//login
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    signInWithEmailAndPassword(auth, email, password) // Use auth for signInWithEmailAndPassword
        .then((userCredential) => {
            // User signed in successfully
            const user = userCredential.user;
            location.assign('../../ShowAllQuestions/index.html');
        })
        .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
});

//signup
const signupForm = document.getElementById('signupForm');

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = signupForm.name.value;
    const email = signupForm.email.value;
    const password = signupForm.password.value;

    try {
        // Create a new user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Use auth for createUserWithEmailAndPassword
        let user_id = null;

        auth.onAuthStateChanged((user) => {
            if (user) {
                // User logged in already or has just logged in.
                console.log(user.uid);
                user_id = user.uid;

                // Now, we can add data to Firestore
                const db = getFirestore(firebaseApp);
                const dataRef = doc(db, "Users", user_id);

                const data = {
                    name: name,
                    email: email,
                    uid: user_id
                };

                // Use setDoc to add data to Firestore
                setDoc(dataRef, data)
                    .then(() => {
                        console.log('Data added to Firestore');
                        location.assign('../../ShowAllQuestions/index.html');
                    })
                    .catch((error) => {
                        console.log('Error adding data to Firestore:', error);
                    });
            }
        });

    } catch (error) {
        // Handle errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    }
});



// const send = document.getElementById("sendBtn");

// const db = getFirestore(firebaseApp);

// const collectionRef = doc(db, "test", "test1");

// const data = {
//     name : 'John',
//     email: "test@gmail.com",
//     uid: "jgiubrvgiurvggrviubriuhviurhv"
// };

// send.onclick = () => {
//     setDoc(collectionRef, data).then((docRef) => {
//         console.log(docRef.id);
//     })
//     .catch((error) => {
//         console.log(error);
//     })
// }