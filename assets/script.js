document.addEventListener('DOMContentLoaded', function () {
  displayHighScores();
});

const startBtn = document.getElementById('start-btn');
const submitBtn = document.getElementById('submit-btn');
const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const resultContainer = document.getElementById('result-container');
const scoreForm = document.getElementById('score-form');
const initialsInput = document.getElementById('initials');
const timerContainer = document.getElementById('timer');
const highScoresList = document.getElementById('high-scores-list');

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLimit = 60;

const questions = [
  {
    question: "What is the correct way to declare a variable in JavaScript?",
    options: ["var x = 5;", "variable x = 5;", "x = 5;", "let x = 5;"],
    correctAnswer: "let x = 5;"
  },
  {
    question: "Which of the following is a JavaScript data type?",
    options: ["Boolean", "String", "Both", "None of the above"],
    correctAnswer: "Both"
  },
  {
    question: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Dynamic Object Model"],
    correctAnswer: "Document Object Model"
  },
  {
    question: "What is the purpose of the 'this' keyword in JavaScript?",
    options: ["Refers to the current object", "Refers to the previous object", "Refers to a specific object", "Refers to a global object"],
    correctAnswer: "Refers to the current object"
  },
  {
    question: "How do you comment in JavaScript?",
    options: ["// Comment", "<!-- Comment -->", "/* Comment */", "## Comment ##"],
    correctAnswer: "// Comment"
  }
];

function startQuiz() {
  startBtn.style.display = 'none';
  resetTimer();
  loadQuestion();
  timer = setInterval(updateTimer, 1000);
}

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  questionContainer.textContent = currentQuestion.question;
  optionsContainer.innerHTML = '';

  if (currentQuestionIndex > 0) {
    // Add borders only when quiz is ongoing
    questionContainer.classList.add('border', 'border-gray-300', 'p-4', 'rounded-md');
    optionsContainer.classList.add('border', 'border-gray-300', 'p-4', 'rounded-md');
  }

  currentQuestion.options.forEach((option, index) => {
    const optionButton = document.createElement('button');
    optionButton.textContent = option;
    optionButton.addEventListener('click', () => checkAnswer(option, currentQuestion.correctAnswer));
    optionsContainer.appendChild(optionButton);
  });

  // Make the containers visible
  questionContainer.style.display = 'block';
  optionsContainer.style.display = 'block';
}

function resetTimer() {
  clearInterval(timer);
  timeLimit = 60;
  updateTimerDisplay();
}

function checkAnswer(selectedOption, correctAnswer) {
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedOption === correctAnswer) {
    score++;
  } else {
    timeLimit -= 10; // Deduct 10 seconds for incorrect answer
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);
  questionContainer.innerHTML = '';
  optionsContainer.innerHTML = '';

  if (currentQuestionIndex > 0) {
    // Remove borders when quiz ends
    questionContainer.classList.remove('border', 'border-gray-300', 'p-4', 'rounded-md');
    optionsContainer.classList.remove('border', 'border-gray-300', 'p-4', 'rounded-md');
  }

  resultContainer.innerHTML = `Your final score is: ${score}`;
  submitBtn.style.display = 'none';
  scoreForm.style.display = 'block';
}

function updateTimer() {
  timeLimit--;
  updateTimerDisplay();

  if (timeLimit <= 0) {
    endQuiz();
  }
}

function updateTimerDisplay() {
  timerContainer.textContent = timeLimit;
}

function saveScore() {
  console.log('Saving score...');
  const initials = initialsInput.value.toUpperCase();
  const savedScores = JSON.parse(localStorage.getItem('quizScores')) || [];
  const scoreData = { initials, score };

  if (savedScores.length >= 5) {
    // Move existing scores down the list
    for (let i = savedScores.length - 1; i > 0; i--) {
      savedScores[i] = savedScores[i - 1];
    }
    savedScores[0] = scoreData; // Add the new score at the top
  } else {
    savedScores.push(scoreData); // Add the new score
  }

  localStorage.setItem('quizScores', JSON.stringify(savedScores));

  console.log('Score saved:', savedScores);

  displayHighScores();
}

function displayHighScores() {
  console.log('Displaying high scores...');
  const scoresContainer = document.getElementById('high-scores-list');
  const savedScores = JSON.parse(localStorage.getItem('quizScores')) || [];

  scoresContainer.innerHTML = ''; // Clear previous scores

  const recentScores = savedScores.slice(0, 5); // Display only the 5 most recent scores

  recentScores.forEach((scoreData, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${scoreData.initials} - ${scoreData.score}`;
    scoresContainer.appendChild(listItem);
  });

  console.log('High scores displayed:', recentScores);
}

scoreForm.addEventListener('submit', function (event) {
  event.preventDefault();
  saveScore();
});

startBtn.addEventListener('click', startQuiz);
