// Variables
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const submitBtn = document.getElementById("submit-btn");
const previousBtn = document.getElementById("previous-btn");
const timerElement = document.getElementById("timer");
const totalTime = 15 * 60; // 15 minutes in seconds
const circleProgress = document.querySelector(".circle-progress");

let currentQuestion = 0;
let score = 0;
let timeLeft = totalTime; // Initialize timeLeft variable

// Initialize the timer interval
let timerInterval;

// Start the timer and update it every second
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;

        // Update the timer text
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

        // Update the progress circle
        const dashoffset = (283 * timeLeft) / totalTime;
        circleProgress.style.strokeDashoffset = dashoffset;

        // Display an alert when the timer gets to 05:00
        if (timeLeft === 5 * 60) {
            alert("Reminder: 5 minutes remaining");
        }

        // Stop the timer when timeLeft reaches 0
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
            showTotalScore(questions.length);
        }
    }, 1000);
}

// Fetch questions from JSON file
async function fetchQuestions() {
    const response = await fetch("questions.json");
    const questions = await response.json();
    return questions;
}

// Start the quiz
fetchQuestions().then((questions) => {
    displayQuestion(questions);
    startTimer();

    submitBtn.addEventListener("click", () => {
        // Add animation class
        submitBtn.classList.add("animate-pop");

        // Remove animation class after the animation ends
        submitBtn.addEventListener("animationend", () => {
            submitBtn.classList.remove("animate-pop");
        });

        checkAnswer(questions);
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion(questions);
        } else {
            endQuiz();
            showTotalScore(questions.length);
        }
    });
});
// ... Rest of the code remains the same

// Display question and options
function displayQuestion(questions) {
    const question = questions[currentQuestion];
    questionElement.textContent = `${currentQuestion + 1}. ${question.question}`; // Add question number
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionElement = document.createElement("label");
        optionElement.className = "option";
        optionElement.innerHTML = `
            <input type="radio" name="option" value="${index}">
            ${option}
        `;
        optionsContainer.appendChild(optionElement);
    });
}
// Check the selected answer
function checkAnswer(questions) {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const answerIndex = parseInt(selectedOption.value);
        if (answerIndex === questions[currentQuestion].correctAnswer) {
            score++;
        }
        selectedOption.checked = false;
    }
}

// End the quiz and display the final score
function endQuiz(callback) {
    setTimeout(callback, 5000);
    fetchQuestions().then((questions) => {
        // Your existing code

        if (currentQuestion < questions.length) {
            displayQuestion(questions);
        } else {
            endQuiz(() => {
                // Navigate to another page after the 5-second delay
                window.location.href = "dashboard.html";
            });
            showTotalScore(questions.length);
        }
    });

    //clearInterval(timerInterval);
    //quizContainer.innerHTML = `<h1>Quiz Completed!</h1>`;
}

function showTotalScore(totalQuestions) {
    const scoreContainer = document.createElement("div");
    let faceEmoji;
    let resultMessage;

    if (score >= 8) {
        faceEmoji = "😃"; // Smiling face
        resultMessage = "Great job! You scored well."
    } else if (score < 5) {
        faceEmoji = "😞"; // Sad face
        resultMessage = "Keep practicing! Better luck next time."
    } else {
        faceEmoji = "😐"; // Neutral face
        resultMessage = "Not bad, but you can do better!"
    }

    scoreContainer.innerHTML = `
      <h2>Your score: ${score} / ${totalQuestions} ${faceEmoji}</h2>
      <p>${resultMessage}</p>
    `;
    quizContainer.appendChild(scoreContainer);

    // Add the "Done" button
    const doneButton = document.getElementById("done-btn");
    doneButton.style.display = "block";

    // Add event listerner to the "Done" button
    doneButton.addEventListener("click", () => {
        // Redirect to another page
        window.location.href = "#";
    });
}

function updateTimer() {
    let remainingTime = totalTime;

    // Update the remainingTime variable based on your logic
    // You should replace this with your actual timer logic
    remainingTime--;

    // Calculate the stroke-dashoffset value
    const dashoffset = (283 * remainingTime) / totalTime;

    // Update the stroke-dashoffset value
    circleProgress.style.strokeDashoffset = dashoffset;

    // Update the timer text
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    // Continue updating the timer every second
    setTimeout(updateTimer, 1000);
}

// Start the timer
updateTimer();

// Start the countdown timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
            showTotalScore(questions.length);
        }
    }, 1000);
}
