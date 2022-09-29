//Define set of questions
const questions = [
    {
        questionText: "Who invented JavaScript?",
        choices: ["a. Douglas Crockford", "b. Sheryl Sandberg", "c. Brendan Eich", "d. Ben Javascript"],
        answer: "c. Brendan Eich"
    },
    {
        questionText: "Javascript is an ________________ language?",
        choices: ["a. Object-Oriented", "b. Object-Based", "c. Procedural", "d. None of the above"],
        answer: "a. Object-Oriented",
    },
    {
        questionText: "Arrays in JavaScript can be used to store ______.",
        choices: ["a. numbers and strings", "b. other arrays", "c. booleans", "d. all of the above"],
        answer: "d. all of the above",
    },
    {
        questionText: "The first index of an array is ____.",
        choices: ["a. 0", "b. 1", "c. 8", "d. any"],
        answer: "a. 0"
    },
    {
        questionText: "What does HTML stand for?",
        choices: ["a. Hyper Text Makeup Lines", "b. Hyper Text Multi Language", "c. Hyper Text Markup Language", "d. Hyper Tool Makeup Length"],
        answer: "c. Hyper Text Markup Language",
    },
    {
        questionText: "Which of the following is not a type of loop in javascript?",
        choices: ["a. do/while", "b. when", "c. for", "d. while"],
        answer: "b. when",
    },
    {
        questionText: "Which event occurs when the user clicks on an HTML element?",
        choices: ["a. onclick", "b. onchange", "c. onmouseover", "d. onmouseclick"],
        answer: "a. onclick"
    },
    {
        questionText:
            "Which is a not a commonly used data type?",
        choices: ["a. string", "b. boolean", "c. number", "d. alerts"],
        answer: "d. alerts",
    }
];

const startCard = document.querySelector("#start-card");
const questionCard = document.querySelector("#question-card");
const scoreCard = document.querySelector("#score-card");
const leaderboardCard = document.querySelector("#leaderboard-card");

//function hides all cards
function hideCards() {
    startCard.setAttribute("hidden", true);
    questionCard.setAttribute("hidden", true);
    scoreCard.setAttribute("hidden", true);
    leaderboardCard.setAttribute("hidden", true);
}


const resultDiv = document.querySelector("#results-div");
const resultText = document.querySelector("#results-text");

//hide results div
function hideResultText() {
    resultDiv.style.display = "none";
}

//global variables
var intervalID;
var time;
var currentQuestion;

document.querySelector("#start-button").addEventListener("click", startQuiz);

//function starts quiz questions
function startQuiz() {
    hideCards();
    questionCard.removeAttribute("hidden");
    currentQuestion = 0;
    displayQuestion();
    time = questions.length * 10;
    intervalID = setInterval(countdown, 1000);
    displayTime();
}
//function count downs the time by 1 second
function countdown() {
    time--;
    displayTime();
    if (time < 1) {
        endQuiz();
    }
}

//displays the time on the page
const timeDisplay = document.querySelector("#time");
function displayTime() {
    timeDisplay.textContent = time;
}
//function displays questions and answer choices
function displayQuestion() {
    let question = questions[currentQuestion];
    let choices = question.choices;

    let h2QuestionElement = document.querySelector("#question-text");
    h2QuestionElement.textContent = question.questionText;

    for (let i = 0; i < choices.length; i++) {
        let choice = choices[i];
        let answerButton = document.querySelector("#choice" + i);
        answerButton.textContent = choice;
    }
}

document.querySelector("#quiz-choices").addEventListener("click", checkAnswer);

//Compare the text content of the choice button with the answer to the current question
function choiceIsCorrect(answerButton) {
    return answerButton.textContent === questions[currentQuestion].answer;
}

//function to check answer, if incorrect, penalize time
function checkAnswer(eventObject) {
    let answerButton = eventObject.target;
    resultDiv.style.display = "block";
    if (choiceIsCorrect(answerButton)) {
        resultText.textContent = "Correct!";
        setTimeout(hideResultText, 1000);
    } else {
        resultText.textContent = "Incorrect!";
        setTimeout(hideResultText, 1000);
        if (time >= 10) {
            time = time - 10;
            displayTime();
        } else {
            //if time is less than 10, display time as 0 and end quiz
            time = 0;
            displayTime();
            endQuiz();
        }
    }

    //
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

//display scores
const score = document.querySelector("#score");

//at end of quiz, clear the timer, hide any visible cards and display the scorecard and display the score as the remaining time
function endQuiz() {
    clearInterval(intervalID);
    hideCards();
    scoreCard.removeAttribute("hidden");
    score.textContent = time;
}

const submitButton = document.querySelector("#submit-button");
const inputElement = document.querySelector("#initials");

//store user initials and score when submit button is clicked
submitButton.addEventListener("click", storeScore);

function storeScore(event) {
    event.preventDefault();

    if (!inputElement.value) {
        alert("Please enter your initials before pressing submit!");
        return;
    }

    //store score and initials in an object
    let leaderboardItem = {
        initials: inputElement.value,
        score: time,
    };

    updateStoredLeaderboard(leaderboardItem);

    //hide the question card, display the leaderboardcard
    hideCards();
    leaderboardCard.removeAttribute("hidden");

    renderLeaderboard();
}

//updates the leaderboard stored in local storage
function updateStoredLeaderboard(leaderboardItem) {
    let leaderboardArray = getLeaderboard();
    //append new leaderboard item to leaderboard array
    leaderboardArray.push(leaderboardItem);
    localStorage.setItem("leaderboardArray", JSON.stringify(leaderboardArray));
}

//get "leaderboardArray" from local storage (if it exists) and parse it into a javascript object using JSON.parse
function getLeaderboard() {
    let storedLeaderboard = localStorage.getItem("leaderboardArray");
    if (storedLeaderboard !== null) {
        let leaderboardArray = JSON.parse(storedLeaderboard);
        return leaderboardArray;
    } else {
        leaderboardArray = [];
    }
    return leaderboardArray;
}

//display high scores on leaderboard card
function renderLeaderboard() {
    let sortedLeaderboardArray = sortLeaderboard();
    const highscoreList = document.querySelector("#highscore-list");
    highscoreList.innerHTML = "";
    for (let i = 0; i < sortedLeaderboardArray.length; i++) {
        let leaderboardEntry = sortedLeaderboardArray[i];
        let newListItem = document.createElement("li");
        newListItem.textContent =
            leaderboardEntry.initials + " - " + leaderboardEntry.score;
        highscoreList.append(newListItem);
    }
}

//sort high scores from highest to lowest
function sortLeaderboard() {
    let leaderboardArray = getLeaderboard();
    if (!leaderboardArray) {
        return;
    }

    leaderboardArray.sort(function (a, b) {
        return b.score - a.score;
    });
    return leaderboardArray;
}

const clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click", clearHighscores);

//clear local storage
function clearHighscores() {
    localStorage.clear();
    renderLeaderboard();
}

const backButton = document.querySelector("#back-button");
backButton.addEventListener("click", returnToStart);

//Hide leaderboard card show start card
function returnToStart() {
    hideCards();
    startCard.removeAttribute("hidden");
}

//use link to view high scores from any point on the page
const leaderboardLink = document.querySelector("#leaderboard-link");
leaderboardLink.addEventListener("click", showLeaderboard);

function showLeaderboard() {
    hideCards();
    leaderboardCard.removeAttribute("hidden");

    //stop countdown
    clearInterval(intervalID);

    //assign undefined to time and display that, so that time does not appear on page
    time = undefined;
    displayTime();

    //display high scores on leaderboard card
    renderLeaderboard();
}