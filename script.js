const quiztitle =localStorage.getItem("quiztitle");
const questionTitre = document.getElementById('question-titre');
const radio1 = document.getElementById('radio1');
const radio2 = document.getElementById('radio2');
const radio3 = document.getElementById('radio3');
const radio4 = document.getElementById('radio4');
const type = document.getElementById('type');
const QuestionCount = document.getElementById('Question-Count');
const qcmdiv = document.querySelector('.qcm');
const vfdiv = document.getElementById('vf-content');
const textdiv = document.querySelector('.textdiv');
const submitBtn = document.getElementById('submit-btn');
const counter = document.getElementById('counter');
const progress = document.querySelector('.progress');
const countDown = document.querySelector('.seconds')
const radioInputs = document.querySelectorAll('input[type="radio"]');
const parentDivs = document.querySelectorAll('.qcm > div');
const trueBtn = document.getElementById('trueBtn');
const falseBtn = document.getElementById('falseBtn');
const userInput = document.getElementById('exampleFormControlInputText');
const scoreQS = document.getElementById('scoreQS');
const scoreActuelle = document.getElementById('scoreActuelle');
const detailsdiv = document.getElementById('dettails-content');
const detailsContent = document.querySelector('.content');
const IncorrectContent = document.getElementById('Incorrect-content');
const correctContent = document.getElementById('correct-content');
const resultatdiv = document.getElementById('Resultat-content');
const scoreBar = document.getElementById('scoreBar');
const typeBar = document.getElementById('typeBar');
const BtmQuiz = document.querySelector('.bottom-quiz');
const bonneReponses = document.getElementById('bonRepons');
const Pourcentage = document.getElementById('Pourcentage');
const temptotal = document.getElementById('temptotal');
const scoretotal = document.getElementById('scoretotal');
const again = document.getElementById('again');
const retour = document.getElementById('retour');

const quizzes = JSON.parse(localStorage.getItem('quizzes'));


let i = 0;
let counterQ= 1;
counter.textContent = counterQ;

let scoreQSS = 100;
scoreQS.textContent = scoreQSS;

let scoreAct = 0 ;
scoreActuelle.textContent = scoreAct;

let bonneReponse =0;
let questionAnswered = false;
let questionIncorrect = false;
let questioncorrect = false;


function addScore() {
  if(!questionAnswered){
    scoreAct += scoreQSS; 
    scoreActuelle.textContent = scoreAct;
    questionAnswered = true;
    bonneReponse++;
    bonneReponses.textContent = bonneReponse;
    scoretotal.textContent = scoreActuelle.textContent;
    setTimeout(()=>{
      questionAnswered = false;
    },5000);
  }
}


function addIncorrect(IncorrectQs,IncorrectQsDet){
  if(!questionIncorrect){
    IncorrectContent.innerHTML += `<p class="mr-3 font-bold text-xl text-red-500">${IncorrectQs}</p>
    <p>${IncorrectQsDet}</p>`;
    questionIncorrect= true;
    setTimeout(()=>{
      questionIncorrect = false;
    },5000);
  }
}

function addcorrect(correctQs,correctQsDet){
  if(!questioncorrect){
    correctContent.innerHTML += `<p class="mr-3 font-bold text-xl text-green-500">${correctQs}</p>
    <p>${correctQsDet}</p>`;
    questioncorrect= true;
    setTimeout(()=>{
      questioncorrect = false;
    },5000);
  }
}


let timerInterval; 

function countTimer() {

  clearInterval(timerInterval);

  let timeLeft = 10;
  countDown.textContent = timeLeft + "s";
  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      countDown.textContent = "Temps écoulé!";
      
      submitBtn.click();
    } else {
      countDown.textContent = timeLeft + "s";
      timeLeft--;
    }
  }, 1000);
}


function createIncrementer() {

    let counter = 0;
    timetotal = setInterval(()=>{
        counter++;
        temptotal.textContent = counter + 's';
      },1000);
      
}


quizzes.forEach((card, index) => {
  if (card.name === quiztitle) {
    QuestionCount.textContent = card.questions.length;
    displayQuestion(card, i);
    countTimer();
    createIncrementer();
    for (let i = 0; i < card.questions.length; i++) {
      progress.innerHTML += `<span class="prog"></span>`;
    }
    const prog = document.querySelectorAll('.prog');
    prog[0].style.backgroundColor = "#056EE6";


    
    
    submitBtn.addEventListener('click', () => {
      clearInterval(timerInterval);
      if (i <= card.questions.length) {
        const correctAnswerIndex = card.questions[i].CorrectAnswer;
        detailsContent.textContent = card.questions[i].Explanation;
         IncorrectQs = card.questions[i].Question;
         IncorrectQsDet = card.questions[i].Explanation;
         correctQs = card.questions[i].Question;
         correctQsDet = card.questions[i].Explanation;
        i++;
        counterQ++;
      
        

        radioInputs.forEach((radio, index) => {
          const parentDiv = parentDivs[index];

           parentDiv.style.backgroundColor = ''; 
           
      
           if (qcmdiv.style.display == 'block'){
            if (radio.checked) {
            if (index == correctAnswerIndex) {
              parentDiv.style.backgroundColor = 'green';
              addcorrect(correctQs,correctQsDet);
              addScore();
              
            } else {
              parentDiv.style.backgroundColor = 'red';
              addIncorrect(IncorrectQs,IncorrectQsDet);
               setTimeout(()=>{
                detailsdiv.style.display = 'block';
               },1000);
                
            }
            } 
              parentDivs[correctAnswerIndex].style.backgroundColor = 'green';
           }

            
           if (vfdiv.style.display == 'block'){
            trueBtn.addEventListener('click', ()=>{
              if (correctAnswerIndex === 'true') {
                trueBtn.style.backgroundColor = "green";
                falseBtn.style.backgroundColor = ""; 
                addcorrect(correctQs,correctQsDet);
                addScore();
              } else {
                trueBtn.style.backgroundColor = "red"; 
                falseBtn.style.backgroundColor = "green";

                addIncorrect(IncorrectQs,IncorrectQsDet);
                setTimeout(()=>{
                  detailsdiv.style.display = 'block';
                 },1000);
              }
              trueBtn.disabled = true;
              falseBtn.disabled = true;
            })
      
            falseBtn.addEventListener('click',()=> {
              if (correctAnswerIndex === 'false') {
                falseBtn.style.backgroundColor = "green"; 
                trueBtn.style.backgroundColor = ""; 
                addcorrect(correctQs,correctQsDet);
                addScore();
              } else {
                falseBtn.style.backgroundColor = "red";
                trueBtn.style.backgroundColor = "green";

                addIncorrect(IncorrectQs,IncorrectQsDet);
                

                setTimeout(()=>{
                  detailsdiv.style.display = 'block';
                 },1000);
              }
              trueBtn.disabled = true;
              falseBtn.disabled = true;
            })
          }

          if (textdiv.style.display == 'block'){ 
            if(correctAnswerIndex.map(answer => answer.toLowerCase()).includes(userInput.value.toLowerCase())){
              userInput.style.backgroundColor = 'green'
              addcorrect(correctQs,correctQsDet);
              addScore();
            }else{
              userInput.style.backgroundColor = 'red';

              addIncorrect(IncorrectQs,IncorrectQsDet);

              setTimeout(()=>{
                detailsdiv.style.display = 'block';
               },1000);
            }
          }
           
          submitBtn.disabled = true;
          
          setTimeout(()=>{
            parentDiv.style.backgroundColor = '';
            radio.checked = false;
            falseBtn.style.backgroundColor = ""; 
            trueBtn.style.backgroundColor = ""; 
            userInput.style.backgroundColor = '';
            userInput.textContent = '';
            detailsdiv.style.display = 'none';
            submitBtn.disabled = false;
            trueBtn.disabled = false;
            falseBtn.disabled = false;
            if(i==card.questions.length){
                  clearInterval(timetotal);
                  qcmdiv.style.display = "none";
                  vfdiv.style.display = "none";
                  textdiv.style.display = "none";
                  scoreBar.style.display = "none";
                  typeBar.style.display = "none";
                  questionTitre.style.display= "none";
                  BtmQuiz.style.display = "none";
                  Pourcentage.textContent = (bonneReponse*100)/QuestionCount.textContent;
                  resultatdiv.style.display = "block";
            }
          },5000);

        });


        
        setTimeout(() => {
          counter.textContent = counterQ;
          countTimer();
          prog[i].style.backgroundColor = "#056EE6";
          displayQuestion(card, i);
          submitBtn.disabled = false;
          trueBtn.disabled = false;
          falseBtn.disabled = false;
            falseBtn.style.backgroundColor = ""; 
            trueBtn.style.backgroundColor = ""; 
            userInput.style.backgroundColor = '';
            userInput.textContent = '';
            detailsdiv.style.display = 'none';
      }, 5000);
        

      
        
      } else{
        qcmdiv.style.display = "none";
        vfdiv.style.display = "none";
        textdiv.style.display = "none";
        scoreBar.style.display = "none";
        typeBar.style.display = "none";
        questionTitre.style.display= "none";
        resultatdiv.style.display = "block";
      }
    });

    

  }
});

function displayQuestion(card, i) {
  type.textContent = card.questions[i].Type;
  questionTitre.textContent = card.questions[i].Question;

  if (type.textContent == "QCM") {
    qcmdiv.style.display = "block";
    vfdiv.style.display = "none";
    textdiv.style.display = "none";
    radio1.textContent = card.questions[i].Options[0];
    radio2.textContent = card.questions[i].Options[1];
    radio3.textContent = card.questions[i].Options[2];
    radio4.textContent = card.questions[i].Options[3];
  } else if (type.textContent == "Vrai/Faux") {
    vfdiv.style.display = "block";
    qcmdiv.style.display = "none";
    textdiv.style.display = "none";
  } else if (type.textContent == "Textuelle") {
    textdiv.style.display = "block";
    qcmdiv.style.display = "none";
    vfdiv.style.display = "none";
  }
}


 
again.addEventListener('click',()=>{
  window.location.href='quiz.html';
});

retour.addEventListener('click',()=>{
  window.location.href='index.html';
})