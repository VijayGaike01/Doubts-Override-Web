import {firebaseApp} from "../../Firebase/firebase-config.js"

import { getAuth } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

const auth = getAuth(firebaseApp);

const user = auth.currentUser;

if (user) {
    console.log("User is authenticated.");
    // Redirect to the authenticated user page
    location.assign("./ShowAllQuestions/index.html");
} else {
    console.log("No user is authenticated.");
    // Redirect to the authentication page
    location.assign("./Authentication/index.html");
}