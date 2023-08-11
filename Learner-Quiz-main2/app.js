const questions = [
    {
        question: "What is the capital of South Africa?",
        options: ["Paris", "Bloemfontein", "Cape Town", "Pretoria"],
        correctAnswer: 3
    },
    {
        question: "What is the only food that cannot go bad?",
        options: ["Dark chocolate", "Peanut butter", "Canned tuna", "Honey"],
        correctAnswer: 3
    },
    {
        question: "What does HTML stand for?",
        options: ["Human Text Made Up Language", "Home Tool Makeover Language", "Hyper Text Markup Language", "Hyperlinks and Text Markup Language"],
        correctAnswer: 2
    },
    {
        question: "Which of the following is NOT a valid CSS selector",
        options: ["Class selector (.class)", "Element selector (element)", "ID selector (#id)", "Attribute selector [attribute]"],
        correctAnswer: 3
    },
    {
        question: "What keyword is used to declare a variable in JavaScript?",
        options: ["var", "int", "string", "variable"],
        correctAnswer: 0
    },
    {
        question: "What is the correct HTML tag for inserting a line break?",
        options: ["<br>", "<hr>", "<lb>", "<break>"],
        correctAnswer: 0
    },
    {
        question: "How can you change the background color of an element in CSS?",
        options: ["background-color", "color", "background", "bgcolor"],
        correctAnswer: 0
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Integer", "Object"],
        correctAnswer: 2
    },
    {
        question: "Which tag is used to define an unordered list in HTML?",
        options: ["<li>", "<ol>", "<ul>", "<list>"],
        correctAnswer: 2
    },
    {
        question: "What is the correct syntax for referring to an external script called `script.js` in HTML?",
        options: ["<script>script.js</script>", "<script src=``script.js``></script>", "<script href=``script.js``></script>", "<script name=``script.js``></script>"],
        correctAnswer: 1
    }
]

// continue

let score = 0;
let currentQuestionIndex = 0;

function displayQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    questionElement.textContent = questions[currentQuestionIndex].question;

    optionsElement.innerHTML = "";

    for (let i = 0; i < questions[currentQuestionIndex].options.length; i++) {
        const option = document.createElement("input");
        option.type = "radio";
        option.name = "answer";
        option.value = i;
        option.id = "option" + i;

        const label = document.createElement("label");
        label.textContent = questions[currentQuestionIndex].options[i];
        label.setAttribute("for", "option" + i);

        optionsElement.appendChild(option);
        optionsElement.appendChild(label);
    }
}

function handleSubmission() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {
        const selectedOption = Number(selectedAnswer.value);

        if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
            score++;
            document.getElementById("feedback").textContent = "Correct!";
        } else {
            document.getElementById("feedback").textContent = "Wrong!";
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    }
}

function endQuiz() {
    const quizContainer = document.getElementById("quiz-container");

    quizContainer.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Your score: ${score}/${questions.length}</p>
  `;
}

// Event listeners
document.getElementById("submit").addEventListener("click", handleSubmission);

// Initialize the quiz
displayQuestion();