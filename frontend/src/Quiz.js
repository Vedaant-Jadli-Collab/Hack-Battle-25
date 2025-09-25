const quizData = {
  general: [
    {
      question: "What does ActiLearn aim to simplify?",
      answers: ["Education", "Sports", "Cooking", "Traveling"],
      correct: 0
    },
    {
      question: "What is the tagline of ActiLearn?",
      answers: ["Learn Fast", "SIMPLIFY GAMIFY CLARIFY", "Just Quiz", "ActiLearn Rocks"],
      correct: 1
    }
  ],
  science: [
    {
      question: "What does H2O represent?",
      answers: ["Oxygen", "Water", "Hydrogen", "Helium"],
      correct: 1
    },
    {
      question: "The process of plants making food using sunlight is?",
      answers: ["Circulation", "Photosynthesis", "Digestion", "Fermentation"],
      correct: 1
    }
  ],
  math: [
    {
      question: "What is 5 + 7?",
      answers: ["12", "14", "10", "11"],
      correct: 0
    },
    {
      question: "What is the square root of 81?",
      answers: ["9", "8", "7", "6"],
      correct: 0
    }
  ]
};

let currentSubject = null;
let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById('question');
const answersList = document.getElementById('answers-list');
const nextBtn = document.getElementById('nextBtn');
const resultDiv = document.getElementById('result');
const scoreSpan = document.getElementById('score');
const totalQuestionsSpan = document.getElementById('totalQuestions');
const quizContainer = document.getElementById('quiz-container');
const restartBtn = document.getElementById('restartBtn');
const subjectSelection = document.getElementById('subject-selection');
const subjectButtons = document.querySelectorAll('.subject-btn');
const homeBtn = document.getElementById('homeBtn');

// Home button redirects
homeBtn.onclick = () => {
  window.location.href = 'HB_1.html';
};

function loadQuestion() {
  const current = quizData[currentSubject][currentQuestionIndex];
  questionEl.textContent = current.question;
  answersList.innerHTML = '';
  nextBtn.disabled = true;

  current.answers.forEach((answer, index) => {
    const li = document.createElement('li');
    li.textContent = answer;
    li.addEventListener('click', () => selectAnswer(li, index));
    answersList.appendChild(li);
  });
}

function selectAnswer(li, index) {
  const lis = answersList.querySelectorAll('li');
  lis.forEach(item => item.classList.remove('selected'));
  li.classList.add('selected');
  nextBtn.disabled = false;
  nextBtn.dataset.selected = index;
}

nextBtn.addEventListener('click', () => {
  const selectedIndex = parseInt(nextBtn.dataset.selected);
  if (selectedIndex === quizData[currentSubject][currentQuestionIndex].correct) {
    score++;
  }
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData[currentSubject].length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizContainer.classList.add('hidden');
  resultDiv.classList.remove('hidden');
  scoreSpan.textContent = score;
  totalQuestionsSpan.textContent = quizData[currentSubject].length;
}

restartBtn.addEventListener('click', () => {
  currentSubject = null;
  currentQuestionIndex = 0;
  score = 0;
  resultDiv.classList.add('hidden');
  quizContainer.classList.add('hidden');
  subjectSelection.classList.remove('hidden');
});

subjectButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentSubject = button.dataset.subject;
    subjectSelection.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    resultDiv.classList.add('hidden');
    loadQuestion();
  });
});
