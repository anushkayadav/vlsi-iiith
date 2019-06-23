function init() {

  $( ".startbtn" ).click(function(){
    $("#mainbox").empty();
    var qui = document.createElement("div");
    qui.setAttribute("id", "quiz");
    var element = document.getElementById("mainbox");
    element.appendChild(qui);

    var next = document.createElement("div");
    next.setAttribute("id", "next");
    next.setAttribute("class", "button");

    var element = document.getElementById("mainbox");
    element.appendChild(next);

  });

 $( "#ans" ).click(function(){
  window.open("answers.html");




 }
)







  var questions = [{
    question: "Can we reduce delay to zero?",
    choices: ["Yes","No","Yes in most of the cases","Yes in very few cases"],
    correctAnswer: 1
  }, {
    question: "What you mean by delay?",
    choices: ["time to correctly access the input","time to correctly access the output","average rise time and fall time","time taken for the output to come after the input has been captured"],
    correctAnswer: 3
  }, {
    question: "What does Cg1 corresponds to in the following formula?",
    choices: ["input gate capacitance of the last inverter driving capacitative load","sum of input capacitances of all the inverter in series","input gate capacitance of first inverter in series","None of the above"],
    correctAnswer: 2
  }, {
    question: "If the gate size is increased by n then what will be the effect on its resistance?",
    choices: ["increases by n","decreases by n","decreases by n2","remains constant"],
    correctAnswer: 1
  }, {
    question: "If the gate size is increased by n then what will be the effect on its capacitance?",
    choices: ["increases by n","decreases by n","decreases by n2","remains constant"],
    correctAnswer: 0
  },{
    question: "Choose the correct statement from the following.",
    choices: ["All the inveters in series are kept to be of same size for minimum delay","The inverter size does not matter as long as the inverter driving the load has very big size","The inverter size does not matter as long as the inverter driving the load has very small size","The size of the inverter driving the load is maximum of all and is some multiple of size of the previous inverters"],
    correctAnswer: 3
  }, {
    question: "For minimm delay, what is the no of inverters in the chain connected in series?",
    choices: [4,5,6,"need to calculate according to the situation given, it is not fixed."],
    correctAnswer: 3
  }, {
    question: "Let a be the stage ratio of an inverter chain. What is its optimum value to drive a load capacitor with minimum delay?",
    choices: [4,"1/e",2,"e"],
    correctAnswer: 3
  }, {
    question: " Let a be the stage ratio of an inverter chain., if parasitic capacitances are taken into consideration then what is the optimum value of a? ",
    choices: [4,"1/e",2,"e"],
    correctAnswer: 0
  },{
    question: "Rise time and fall time is _____ to load capacitance CL",
    choices: ["directly proportional","inversely proportonal","exponentially equal","not related"],
    correctAnswer: 0
  },{
    question: "Which quantity is slower?",
    choices: ["rise time","fall time","all of the mentioned","none of the mentioned"],
    correctAnswer: 0
  }, {
    question: "The inverter pair delay for inverters having 4:1 ratio is",
    choices: [ "4Ʈ","Ʈ","5Ʈ ","2Ʈ"],
    correctAnswer: 2
  },{
    question: " Effective fanout(f) in the figure 1 is ",
    choices: [2,4 ,8, 1],
    correctAnswer: 2
  },{
    question: " Effective fanout(f) at each stage in the figure 1 is ",
    choices: [2,4 ,8, 1],
    correctAnswer: 0
  },{
    question: "The optimum size of each inverter is ________ of its neighbours",
    choices: ["geometric mean","arithmetic mean","geometric or arithmetic mean","none of the above"],
    correctAnswer: 0
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
    $('#ans').hide();

  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
          $('#ans').hide();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
        $('#ans').show();

      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
}
$(init);