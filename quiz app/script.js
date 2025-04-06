const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false }
        ]
    },
    {
        question: "What is 5 + 3?",
        answers: [
            { text: "8", correct: true },
            { text: "9", correct: false },
            { text: "6", correct: false },
            { text: "10", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Mars", correct: true },
            { text: "Earth", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: "What is the square root of 144?",
        answers: [
            { text: "10", correct: false },
            { text: "11", correct: false },
            { text: "12", correct: true },
            { text: "13", correct: false },
        ]
    },
    {
        question: "If 3x = 27, what is the value of x?",
        answers: [
            { text: "6", correct: false },
            { text: "8", correct: false },
            { text: "9", correct: true },
            { text: "12", correct: false },
        ]
    },
    {
        question: "What is 25% of 200?",
        answers: [
            { text: "25", correct: false },
            { text: "50", correct: true },
            { text: "75", correct: false },
            { text: "100", correct: false },
        ]
    },
    {
        question: "Solve: 15 × 4 ÷ 3",
        answers: [
            { text: "5", correct: false },
            { text: "20", correct: true },
            { text: "60", correct: false },
            { text: "25", correct: false },
        ]
    },
    {
        question: "What is the value of (5² + 3²)?",
        answers: [
            { text: "25", correct: false },
            { text: "34", correct: true },
            { text: "64", correct: false },
            { text: "16", correct: false },
        ]
    },
    {
        question: "If a triangle has angles 60° and 60°, what is the third angle?",
        answers: [
            { text: "30°", correct: false },
            { text: "45°", correct: false },
            { text: "60°", correct: true },
            { text: "90°", correct: false },
        ]
    },
    {
        question: "What is the product of the first 3 prime numbers?",
        answers: [
            { text: "30", correct: true },  // 2 × 3 × 5 = 30
            { text: "20", correct: false },
            { text: "24", correct: false },
            { text: "18", correct: false },
        ]
    }
    
];

//These three lines are selecting HTML elements by their ID so you can interact with them using JavaScript.


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer");
const nextButton = document.getElementById("next");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    //resets the question counter to the first question
    //quiz starts from beginning
    currentQuestionIndex=0;
    //resets the score to 0
    score=0;
    //sets the text to the next button back to next 
    nextButton.innerText="NEXT";
    showQuestion()


}

function showQuestion(){
    resetState();
    const currentQuestion =questions[currentQuestionIndex];
    //updates the question text
    questionElement.innerText = currentQuestion.question;
    //For every answer in the answers array (like Answer 1, Answer 2...), create a new <button>
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("buttons");
        //If the answer is correct, we store that info using data-correct="true" (custom HTML attribute).
        if (answer.correct) {
            button.dataset.correct = "true";
        }
        //When the user clicks the button, it triggers selectAnswer() to check if the answer is correct and apply feedback.
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
    

}
//hides the next button
function resetState() {
    nextButton.style.display = "none";
    //loop and remove the previous buttons
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    //e stands for the button that was clicked

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.style.backgroundColor = "green";
        score++;
    } else {
        selectedBtn.style.backgroundColor = "red";
    }

    // Disable all buttons
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.style.backgroundColor = "green";
        }
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}! 🎉`;
    nextButton.innerText = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

// Start the quiz
startQuiz();
    