import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  get,
  query,
  orderByChild,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { firebaseApp } from "../../Firebase/firebase-config.js";

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
  //Links
  navLinks.classList.toggle("open");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });

  //Animation
  hamburger.classList.toggle("toggle");
});

//feed

const userList = document.getElementById("feed");

function createQuestionCardTemplate(question) {
  console.log(question);
  return `
  <li class="user-card">
  <div class="content">
    <p class="title">${question.title}</p>
    <p class="tags"># java, web </p>

    <div class="reactions">
      <div class="upVotes">
          <img src="../../Assets/images/thumbs-up.svg" alt="thumb">
          <p>${question.upVotes}</p>
      </div>

      <div class="replies">
          <img src="../../Assets/images/reply-all.svg" alt="thumb">
          <p>${question.reply}</p>
      </div>
    </div>
    
    <div id="uploader-info">
      <div class="profile-img">
          <img src="../../Assets/images/default-profile.png" alt="profile img">
      </div>
      <div class="user-name">
          <p class="user">${question.user}</p>
          <div class="seperator"></div>
          <p class="time">${timeAgo(question.time)}</p>
      </div>
    </div>
  </div>
</li>
            `;
}

const db = getDatabase(firebaseApp);
// const usersRef = ref(db, "questions");
const usersRef = query(ref(db, "questions"), orderByChild("time"));

const questionsArray = [];

get(usersRef)
  .then((snapshot) => {
    userList.innerHTML = "";
    // Loop through the data
    snapshot.forEach((childSnapshot) => {
      const questionId = childSnapshot.key;
      const questionData = childSnapshot.val();
      questionsArray.push(questionData);
    });
    questionsArray.reverse();

    questionsArray.forEach((questionObj) => {
      const card = createQuestionCardTemplate(questionObj);
      userList.innerHTML += card;
    });

    // const card = createQuestionCardTemplate(questionData, questionId)
    // userList.innerHTML += card;
  })
  .catch((error) => {
    console.error("Error reading data: ", error);
  });

function timeAgo(timestamp) {
  const now = new Date();
  const time = new Date(timestamp);
  const seconds = Math.floor((now - time) / 1000);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minutes ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} hours ago`;
  } else {
    const days = Math.floor(seconds / 86400);
    return `${days} days ago`;
  }
}
