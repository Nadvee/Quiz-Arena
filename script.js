const questions = [
    {
        question : "Which part of web development is responsible for handling data storage and retrieval?",
        answer : [
            {text : "Front-end development",correct:false},
            {text : "Back-end development",correct:true},
            {text : "Full-stack development",correct:false},
            {text : "Middleware development",correct:false}
        ]
    },
    {
     

        question : "Which programming language is mainly used for adding interactivity to websites?",
        answer : [
            {text : "HTML",correct:false},
            {text : "CSS",correct:false},
            {text : "Python",correct:false},
            {text : "JavaScript",correct:true}
        ]

    },
    {
        question : "Which HTML tag is used to create a hyperlink?",
        answer : [
            {text : "{a}",correct:true},
            {text : "{link}",correct:false},
            {text : "{h1}",correct:false},
            {text : "{p}",correct:false}
        ]
    },
    {
        question : "Which of the following is not a back-end programming language commonly used in web development?",
        answer : [
            {text : "PHP",correct:false},
            {text : "Ruby",correct:false},
            {text : "Java",correct:false},
            {text : "HTML",correct:true}
        ]
    }
]

const questionElement = document.getElementById("question");
const answerbuttons = document.getElementById("answer-btn");
const nextbutton = document.getElementById("next-btn");

let currentQuesIndex = 0 ;
let score = 0 ;

function startQuiz(){
    currentQuesIndex = 0 ;
    score = 0 ;
    nextbutton.innerHTML = "Next" ;
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQues = questions[currentQuesIndex];
    let questionNo = currentQuesIndex+1;
    questionElement.innerHTML = questionNo+". "+currentQues.question ;

    currentQues.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbuttons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}

function resetState(){
    nextbutton.style.display = "none";
    while(answerbuttons.firstChild){
        answerbuttons.removeChild(answerbuttons.firstChild)
    }
}

function selectAnswer(e){
    const selectbtn = e.target;
    const isCorrect = selectbtn.dataset.correct === "true";
    if(isCorrect){
        selectbtn.classList.add("correct");
        score++;
    }
    else{
        selectbtn.classList.add("incorrect");
    }
    Array.from(answerbuttons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true ;
    });
    nextbutton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length} !`;
    nextbutton.innerHTML = "Play again";
    nextbutton.style.display = "block";
}


function handleNextButton(){
    currentQuesIndex++;
    if(currentQuesIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}




nextbutton.addEventListener("click",()=>{
    if(currentQuesIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();