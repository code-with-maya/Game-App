
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions; 
let currentQuestionIndex = 0;
let score = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    console.log('Quiz started');
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0; // Reset score
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answer.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('wrong');
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        questionContainerElement.classList.add('hide');
        startButton.innerText = `Restart (Score: ${score})`;
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct === 'true') {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

// Array of questions
const questions = [
    {
        question: 'What is 2+2',
        answer: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    },
    {
        question: 'What is 10+10',
        answer: [
            { text: '15', correct: false },
            { text: '20', correct: true },
            { text: '50', correct: false },
            { text: '25', correct: false }
        ]
    },
    {
        question: 'What is 10*10',
        answer: [
            { text: '150', correct: false },
            { text: '100', correct: true },
            { text: '101', correct: false },
            { text: '159', correct: false }
        ]
    },
    {
        question: 'What is 10+40',
        answer: [
            { text: '150', correct: false },
            { text: '50', correct: true },
            { text: '15', correct: false },
            { text: '19', correct: false }
        ]
    },
    {
        question: 'What is 2*10',
        answer: [
            { text: '15', correct: false },
            { text: '20', correct: true }
        ]
    }
];
