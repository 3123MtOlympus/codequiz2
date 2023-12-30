const questions = [
    {
        question: "Javascript is a _______ langauge.",
        correctAnswer: "Object-Oriented",
        options: [
            "Object-Oriented",
            "Object-Based",
            "Procedural",
            "None"
        ]

    },
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        correctAnswer: "Both A and B",
        options: [
            "var",
            "let",
            "Both A and B",
            "None of the Above"
        ]

    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        correctAnswer: "Both A and B",
        options: [
            "getElementbyId",
            "getElementsByClassName()",
            "Both A and B",
            "None of the Above"
        ]

    },
    {
        question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
        correctAnswer: "ignores the statements",
        options: [
            "Throws an error",
            "ignores the statements",
            "Giving a warning",
            "None of the Above"]

    },
    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        correctAnswer: "All of the above",
        options: [
            "document.write()",
            "console.log()",
            "window.alert()",
            "All of the above"]
    },
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 15;
  let updateTimer;
  
  function startQuiz() {
    showQuestion();
    timer = setInterval(updateTimer, 1000);
  }
  
  function showQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const timeElement = document.getElementById("time");
  
    questionElement.textContent = questions[currentQuestion].question;
  
    optionsElement.innerHTML = "";
    for (let option of questions[currentQuestion].options) {
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => checkAnswer(option);
      optionsElement.appendChild(button);
    }
  
    timeElement.textContent = timeLeft;

    function updateTimer() {
        const timeElement = document.getElementById("time");
      
        timeLeft--;
      
        if (timeLeft >= 0) {
          timeElement.textContent = timeLeft;
        } else {

          clearInterval(timer);
          currentQuestion++;
      
          if (currentQuestion < questions.length) {
         
            resetTimer();
            showQuestion();
            timer = setInterval(updateTimer, 1000);
          } else {
            
            showResult();
          }
        }
      }

  function checkAnswer(selectedAnswer) {
    clearInterval(timer);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      score++;
    } else {
      timeLeft -= 3; 
    }
  
    showFeedback(selectedAnswer); 
    
    setTimeout(() => {
      currentQuestion++;
  
      if (currentQuestion < questions.length) {
        resetTimer();
        showQuestion();
        timer = setInterval(updateTimer, 1000);
      } else {
        showResult();
      }
    }, 2000); 
  }
  
  function showFeedback(selectedAnswer) {
    const optionsElement = document.getElementById("options");
    const feedbackElement = document.createElement("div");
  
    feedbackElement.classList.add("feedback");
  
    const feedbackText = selectedAnswer === questions[currentQuestion].correctAnswer
      ? "Correct!"
      : `Wrong! The correct answer is ${questions[currentQuestion].correctAnswer}.`;
  
    feedbackElement.textContent = feedbackText;
  
    optionsElement.appendChild(feedbackElement);
  }
  
  function resetTimer() {
    timeLeft = 10;
  }
  
  function showResult() {
   
  }
  
  let next = document.getElementsByClassName('.next-btn');

function showResult() {
    const quizBox = document.querySelector(".quiz-box");
    const resultBox = document.getElementById("result-box");
    const scoreElement = document.getElementById("score");
    const scoreList = document.getElementById("score-list");
  
    quizBox.style.display = "none";
    resultBox.style.display = "block";
  
    scoreElement.textContent = `Your score: ${score} out of ${questions.length}`;
  

    scoreList.innerHTML = "";
  

    const summaryItem = document.createElement("li");
    summaryItem.textContent = `Total Score: ${score} out of ${questions.length}`;
    summaryItem.style.fontWeight = 'bold';
    scoreList.appendChild(summaryItem);
  

    const initials = window.prompt("Enter your initials:");
    saveScore(initials, score);
  }
  
  function saveScore(initials, score) {

    const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
  

    scores.push({ initials, score });
  

    localStorage.setItem("quizScores", JSON.stringify(scores));
  }
  
  function nextQuestion() {
    if (currentQuestion < questions.length) {
      resetTimer();
      showQuestion(questions);
      timer = setInterval(updateTimer, 1000);
    } else {
    
      setTimeout(() => {
        showResult();
      }, 1000);
    }
  }
}


function showScores() {
    const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
  
    if (scores.length > 0) {
      alert("Quiz Scores:\n" + scores.map(score => `${score.initials}: ${score.score}`).join("\n"));
    } else {
      alert("No quiz scores available.");
    }
  }
  