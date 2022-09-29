// global variables
var time = questions.length * 15;
var currentQuestionIndex = 0;

// All required elements.
var startButton = document.querySelector('#start-button');
var questionsE1 = document.querySelector('#questions-section');
var timerEl = document.querySelector('#time');

var buttons = document.querySelectorAll('.button');


function startQuiz(event) {
  event.preventDefault();
  startScreen.setAttribute("class", "hidden");
  questionsE1.setAttribute("class", "visible");
  getCurrentQuestion();
  startTimer();
}

function endQuiz() {
  startScreen.setAttribute("class", "hidden");
  questionsE1.setAttribute("class", "hidden");
  endSection.setAttribute("class", "visible");

  score.textContent = time;
}
// clears local storage of scores
function clearStorage() {
  localStorage.clear()
}

// Timer
function startTimer() {
  var timer = setInterval(function () {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
      time = 0;
      timerEl.textContent = 0;
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

//listens to submit button and stores in local storage
function saveInitials(event) {
  event.preventDefault();
  console.log("Initials saved");

  //get letters that are entered by the user
  var initialArray = [];
  localStorage.setItem("initials", initials.value);
  var user1 = localStorage.getItem("initials");

  localStorage.setItem("score", parseInt(time));
  var score1 = localStorage.getItem("score");

  console.log(user1);
  console.log(score1);

  if (user1 !== "" && user1.length < 4) {
    initialArray.push(user1);
    initialArray.push(score1);

    console.log(initialArray);

    location.href = "highscores.html";

    tableELInitials.textContent = user1;
    tableElScore.textContent = score1;
  }
  else {
    alert("Please enter valid number of initials (1-3)");
  }
}

//clears local storage of scores
function clearStorage() {
  localStorage.clear();
}

// event listeners
if (submitButton) {
  submitButton.addEventListener("click", saveInitials);
}

if (startButton) {
  startButton.addEventListener("click", startQuiz);
}