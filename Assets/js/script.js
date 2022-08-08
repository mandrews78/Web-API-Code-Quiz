// global variables and arrays
var time = questions.length * 15
var currentQuestionIndex = 0

// All required elements.
var startButton = document.querySelector('start-btn button')

// clears local storage of scores
function clearStorage () {
  localStorage.clear()
}

// event listeners
