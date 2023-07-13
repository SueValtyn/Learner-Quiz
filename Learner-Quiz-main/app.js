const firebaseConfig = {
apiKey: "AIzaSyCgSCtC4TnfNYvNNpxP8I3NLSza0mAbKw4",
authDomain: "my-app-1fd34.firebaseapp.com",
databaseURL: "https://my-app-1fd34-default-rtdb.firebaseio.com",
projectId: "my-app-1fd34",
storageBucket: "my-app-1fd34.appspot.com",
messagingSenderId: "166968764883",
appId: "1:166968764883:web:bde8c9fa16241a28d36726",
measurementId: "G-BWF4ME9HV4"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()

  /*/ Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
  //Initialize variables
const auth= firebase.auth()
const database = firebase.database();*/

function register() {
    email= document.getElementById('email');
    password= document.getElementById('password');
    username= document.getElementById('username');

     //Validate textboxes
     if (validate_email(email) == false || validate_password(password)== false);{
        alert('Email or password is not detected.');
}
   auth.createUserWithEmail(email, password).then(function(){
    var user = auth.currentUser

    //Send email verification
    user.sendEmailVerification()
    .then(function(){
        alert("Email sent. Please check your inbox.");
    })
    .catch(function(error){
        console.log(error.message);
   });

   var database_ref = database_ref()

   //Create the user account
   var user_data = {
    email: email,
    username: username,
    last_login: Date.now(),
   }
 database_ref.child('user/' + user.uid).set(user_data)
alert('Welcome to our app. Thanks for signing up!')
setTimeout(function(){
window.location.href ='/login.html';
}, 500);
})
.catch(function(error) {
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
})

}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Sign in with email and password
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            // Redirect to login page
            window.location.href = '/login.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(InvalidUsernameorPassword);
        });
}


const questions = [
    {
        question: "1. What is the capital of South Africa?",
        options: ["Paris", "Bloemfontein", "Cape Town", "Pretoria"],
        correctAnswer: 3
    },
    {
        question: "2. What is the only food that cannot go bad?",
        options: ["Dark chocolate", "Peanut butter", "Canned tuna", "Honey"],
        correctAnswer: 3
    },
    {
        question: "3. What does HTML stand for?",
        options: ["Human Text Made Up Language", "Home Tool Makeover Language", "Hyper Text Markup Language", "Hyperlinks and Text Markup Language"],
        correctAnswer: 2
    },
    {
        question: "4. Which of the following is NOT a valid CSS selector",
        options: ["Class selector (.class)", "Element selector (element)", "ID selector (#id)", "Attribute selector [attribute]"],
        correctAnswer: 3
    },
    {
        question: "5. What keyword is used to declare a variable in JavaScript?",
        options: ["var", "int", "string", "variable"],
        correctAnswer: 0
    },
    {
        question: "6.What is the correct HTML tag for inserting a line break?",
        options: ["<br>", "<hr>", "<lb>", "<break>"],
        correctAnswer: 0
    },
    {
        question: "7. How can you change the background color of an element in CSS?",
        options: ["background-color", "color", "background", "bgcolor"],
        correctAnswer: 0
    },
    {
        question: "8. Which of the following is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Integer", "Object"],
        correctAnswer: 2
    },
    {
        question: "9. Which tag is used to define an unordered list in HTML?",
        options: ["<li>", "<ol>", "<ul>", "<list>"],
        correctAnswer: 2
    },
    {
        question: "10. What is the correct syntax for referring to an external script called `script.js` in HTML?",
        options: ["<script>script.js</script>", "<script src=``script.js``></script>", "<script href=``script.js``></script>", "<script name=``script.js``></script>"],
        correctAnswer: 1
    }
]

// continue

let score = 0;
let currentQuestionIndex = 0;
let countdownDuration = 600;
let timerInterval;

function displayQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    if (currentQuestionIndex < questions.length) {
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
        if (currentQuestionIndex === 0) {
           updateTimer();
        }
    } else {
        endQuiz();
    }
}

function handleSubmission() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {
        const selectedOption = Number(selectedAnswer.value);

        if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
            score++;
            document.getElementById("feedback").textContent = "";
        } else {
            document.getElementById("feedback").textContent = "";
        }

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            endQuiz();
        }
    }
}

function updateTimer() {
    const timerElement = document.getElementById("timer");

    timerInterval = setInterval(() => {
        // Calculate minutes and seconds
        const minutes = Math.floor(countdownDuration / 60);
        let seconds = countdownDuration % 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        // Update the timer display
        timerElement.textContent = `${minutes}:${seconds}`;

        if (countdownDuration <= 0) {
            endQuiz();
            clearInterval(timerInterval);
        }

        countdownDuration--;
    }, 1000);
}

function endQuiz() {
   clearInterval(timerInterval);

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