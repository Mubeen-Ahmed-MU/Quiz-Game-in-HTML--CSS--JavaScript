let questions = [
    {
     
      question: "What is Full form of HTML?",
      options: ["Hyper Text Markup Language", "Hypertext Markup Language", "Hotspot Test Markup Language", "Hist Markup Language"],
      correctAnswer: "Hyper Text Markup Language"
    },
    {
      question: "What is the full form of CSS?",
      options: ["Case Sensitive Science", "Casecading Style Sheet", "Casecading System Sensitive", "Computer Science System"],
      correctAnswer: "Casecading Style Sheet"
    },
    {
      question: "Who is founder of HTML?",
      options: ["Brendan Eich", "Charles Babbage", "Tim Berners-Lee", "James Gosling"],
      correctAnswer: "Tim Berners-Lee"
    }
  ];

  let currentQuestion = 0;
  let score = 0;
  let timer;

  function startQuiz() {
    document.getElementById("description-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    loadQuestion();
  }

  function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    questionElement.textContent = questions[currentQuestion].question;
    optionsElement.innerHTML = "";

    questions[currentQuestion].options.forEach((option, index) => {
      const optionElement = document.createElement("div");
      optionElement.className = "option";
      optionElement.textContent = `${index + 1}. ${option}`;
      optionElement.onclick = () => selectOption(index);
      optionsElement.appendChild(optionElement);
    });

    startTimer();
  }

  function startTimer() {
    clearInterval(timer);
    let seconds = 5;
    timer = setInterval(() => {
      document.getElementById("result").textContent = `Time remaining: ${seconds} seconds`;
      seconds--;

      if (seconds < 0) {
        clearInterval(timer);
        document.getElementById("result").textContent = "";
        resetGame();
      }
    }, 1000);
  }

  function selectOption(index) {
    const selectedAnswer = questions[currentQuestion].options[index];
    const options = document.querySelectorAll('.option');

    options.forEach((option, i) => {
      option.classList.remove('selected');
      if (i === index) {
        option.classList.add('selected');
      }
    });

    clearInterval(timer);
    document.getElementById("result").textContent = "";
  }

  function submitAnswer() {
    const selectedOption = document.querySelector('.option.selected');
    
    if (selectedOption) {
      const selectedAnswer = selectedOption.textContent.split('. ')[1];
      const correctAnswer = questions[currentQuestion].correctAnswer;

      if (selectedAnswer === correctAnswer) {
        score++;
      }

      currentQuestion++;

      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        showResult();
      }
    } else {
      alert("Please select an option before submitting.");
    }
  }

  function showResult() {
    const resultElement = document.getElementById("result");
    resultElement.textContent = `Your score: ${score} out of ${questions.length}`;
    clearInterval(timer);
    showPopup(`Quiz completed! Your score: ${score} out of ${questions.length}`);
  }

  function resetGame() {
    currentQuestion = 0;
    score = 0;
    clearInterval(timer);

    // Randomize the order of questions
    questions = questions.sort(() => Math.random() - 0.5);

    loadQuestion();
  }

  function showPopup(message) {
    const popupElement = document.getElementById("popup");
    const popupMessageElement = document.getElementById("popup-message");
    popupMessageElement.textContent = message;
    popupElement.style.display = "block";
  }

  function returnToDescription() {
    document.getElementById("description-container").style.display = "block";
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("popup").style.display = "none";
  }