//quiz class
class Quiz{
    constructor(questions){
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;

    }
    getQuestionIndex(){
        return this.questions[this.questionIndex];
    }
    guess(answer){
        if(this.getQuestionIndex().isCrctAnsr(answer)){
            this.score++;
        }
        this.questionIndex++;
    }
    isEnded(){
        return this.questionIndex === this.questions.length;
    }
}
// question class

class Question{
    constructor(text, choices, answer){
        this.text = text;
        this.choices = choices;
        this.answer=answer;

    }
    isCrctAnsr(choice){
        return this.answer === choice;
    }
}


// question display  
 
function displayQs(){
    if(quiz.isEnded()){
        showScores();
    }
    // show the next question if the quiz has not been finished
    else{
        let qElement = document.getElementById("question");
        qElement.innerHTML = quiz.getQuestionIndex().text;

        //show the answer options
        let choices = quiz.getQuestionIndex().choices;
        for(let i=0; i<choices.length; i++){
            let choiceElement = document.getElementById("choice" +i);
            choiceElement.innerHTML = choices[i];
            guess("btn" +i, choices[i]);
        }
        showProgress();

    }
}

// Guess function

function guess(id, guess)
{
    let button = document.getElementById(id);
    button.onclick = function(){
        quiz.guess(guess);
        displayQs();
    }
}

// Show progress function
function showProgress(){
    let currentQuestionNumber = quiz.questionIndex +1;
    let progressElement = document.getElementById("footer");
    progressElement.innerHTML = `Question  ${currentQuestionNumber}   of ${quiz.questions.length}`;
}


//Show score function
function showScores(){
    let quizShowScores = `
    <div class="icon"><i class="fa-solid fa-crown"></i></div> 
    <h1> You have completed the QUIZ </h1>
    <h2 id="score"> You got: ${quiz.score} out of ${quiz.questions.length}</h2>
    <div class="quiz-repeat">
    <a href="index.html"> Take the quiz again !</a>
    
    </div>   
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizShowScores;
}

// The Quiz questions 

let questions = [
    new Question("1. What does HTML stands for?",[" Hypertext Markup Language","eXtensible Hypertext Markup Language","Home Markup Language","eXtra Markup Language"], " Hypertext Markup Language"),
    new Question("2. What does CSS stands for?", ["Common Style Sheet","Computer Style Sheet","Cascading Style Sheet","Colourful Style Sheet"], "Cascading Style Sheet"),
    new Question("3. What does PHP stands for?", ["Hypertext Programming Processor","Pre-Hypertext Processor","Hypertext Programming","Hypertext Preprocessor"] , "Hypertext Preprocessor"),
    new Question("4. What does SQL stands for?", ["Stylesheet Query Language","Stylish Query Language","Structured Query Language","Statement Query Language"], "Structured Query Language"),
    new Question("5. What does XML stands for?", ["eXtra Markup Language","eXtensible Markup Language","eXamine Multiple Language","eXectuable Multiple Language"], "eXtensible Markup Language")
];

let quiz = new Quiz(questions);

//Display the question(s)
displayQs();

//Timer condition

let time =1;
let quizTimeInMins = time * 60 * 60; 
let quizTime = quizTimeInMins /60;

let counting = document.getElementById("count-down");

function countDown(){
    let quizTimer = setInterval(function(){
        if (quizTime <= 0){
            clearInterval(quizTimer);
            showScores();
        }else{
            quizTime--;
            let second = Math.floor(quizTime % 60);
            let minute =Math.floor(quizTime / 60) %60;
            counting.innerHTML =`Time  ${minute} : ${second}`;
        }


    }, 1000)
}

countDown();