const quizData = [
    {
      question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
      a: "<script name='xxx.js'>",
      b: "<script src='xxx.js'>",
      c: "<script href='xxx.js'>",
      d: "<script file='xxx.js'>",
      correct: "b"
    },
    {
      question: "How do you write 'Hello World' in an alert box?",
      a: "msg('Hello World');",
      b: "alert('Hello World');",
      c: "alertBox('Hello World');",
      d: "msgBox('Hello World');",
      correct: "b"
    },
    {
      question: "How do you create a function in JavaScript?",
      a: "function myFunction()",
      b: "function = myFunction()",
      c: "function:myFunction()",
      d: "create.myFunction()",
      correct: "a"
    },
    {
      question: "Which built-in method returns the calling string value converted to lower case?",
      a: "toLowerCase()",
      b: "toLower()",
      c: "changeCase()",
      d: "None of the above",
      correct: "a"
    },
    {
      question: "Which of the following function of Array object removes the last element from an array and returns that element?",
      a: "push()",
      b: "pop()",
      c: "join()",
      d: "map()",
      correct: "b"
    }
  ];
  
  let currentQuiz = 0;
  let score = 0;
  
  const questionEl = document.getElementById('question');
  const a_text = document.getElementById('a_text');
  const b_text = document.getElementById('b_text');
  const c_text = document.getElementById('c_text');
  const d_text = document.getElementById('d_text');
  const answersEls = document.querySelectorAll('.answer');
  const totalQuestionsEl = document.getElementById('total-questions'); // New element to show the number of questions
  const remainingQuestionsEl = document.getElementById('remaining-questions'); // New element to show remaining questions
  
  function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    
    // Display the question number before the question
    questionEl.innerText = `Question ${currentQuiz + 1}: ${currentQuizData.question}`;
    
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
  
    // Display total number of questions and how many are remaining
    totalQuestionsEl.innerText = `Total Questions: ${quizData.length}`;
    remainingQuestionsEl.innerText = `Remaining Questions: ${quizData.length - (currentQuiz + 1)}`;
  }
  
  function getSelected() {
    let answer = undefined;
    answersEls.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = answerEl.id;
      }
    });
    return answer;
  }
  
  function deselectAnswers() {
    answersEls.forEach((answerEl) => {
      answerEl.checked = false;
    });
  }
  
  function nextQuestion() {
    const answer = getSelected();
    if (answer) {
      if (answer === quizData[currentQuiz].correct) {
        score++;
      }
  
      currentQuiz++;
  
      if (currentQuiz < quizData.length) {
        loadQuiz();
      } else {
        showResult();
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select an answer before moving to the next question!',
      });
    }
  }
  
  function prevQuestion() {
    if (currentQuiz > 0) {
      currentQuiz--;
      loadQuiz();
    }
  }
  
  function showResult() {
    const percentage = (score / quizData.length) * 100;
    let remark = '';
  
    if (percentage >= 80) {
      remark = 'Excellent!';
    } else if (percentage >= 50) {
      remark = 'Good Job!';
    } else {
      remark = 'Better Luck Next Time!';
    }
  
    Swal.fire({
      title: 'Quiz Completed!',
      html: `<p>You answered ${score}/${quizData.length} correctly.</p>
             <p>Percentage: ${percentage.toFixed(2)}%</p>
             <p>${remark}</p>`,
      icon: 'success',
    });
  }
  
  loadQuiz();
  