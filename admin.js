const quizForm = document.getElementById('quizForm');
const questionForm = document.getElementById('questionForm');
const titre = document.getElementById('titre');
const categorie = document.getElementById('catégorie');
const statut = document.getElementById('statut');
const quizContainer = document.querySelector('.quizContainer');
const questionsContainer = document.querySelector('.questionsContainer');
const quizSelect = document.getElementById('QuizTitre');








window.addEventListener('load', () => {
    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    quizzes.forEach(quiz => {
        quizContainer.innerHTML += `
            <tr class="border-b hover:bg-blue-200 bg-gray-100">
                <td class="p-3 px-5">
                    <input type="text" value="${quiz.name}" disabled class="bg-transparent border-b-2 border-gray-300 py-2">
                </td>
                <td class="p-3 px-5">
                    <input type="text" value="${quiz.catégorie}" disabled class="bg-transparent border-b-2 border-gray-300 py-2">
                </td>
                <td class="p-3 px-5">
                    <input type="text" value="${quiz.statut}" disabled class="bg-transparent border-b-2 border-gray-300 py-2">
                </td>
                <td class="p-3 px-5 flex justify-end">
                    <button type="button" id="editBtn" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>
                    <button type="button" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                </td>
            </tr>`;


        quiz.questions.forEach(question => {
            questionsContainer.innerHTML += `
                <tr class="border-b hover:bg-blue-200 bg-gray-100">
                    <td class="p-3 px-5">
                        <input type="text" value="${question.QuizTitre}" disabled class="bg-transparent border-b-2 border-gray-300 py-2">
                    </td>
                    <td class="p-3 px-5">
                        <input type="text" value="${question.Type}" disabled class="bg-transparent border-b-2 border-gray-300 py-2">
                    </td>
                    <td class="p-3 px-5">
                        <input type="text" value="${quiz.Niveau}" disabled class="bg-transparent border-b-2 border-gray-300 py-2">
                    </td>
                    <td class="p-3 px-5 flex justify-end">
                        <button type="button" id="editQuestionBtn" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>
                        <button type="button" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                    </td>
                </tr>`;
        });

        const option = document.createElement('option');
        option.value = quiz.name;
        option.textContent = quiz.name;
        quizSelect.appendChild(option);
    });
});



quizForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

    const formData = new FormData(quizForm);
    const data = Object.fromEntries(formData);
    data.questions = [];
    quizzes.push(data);

    quizContainer.innerHTML += `
        <tr class="border-b hover:bg-blue-200 bg-gray-100">
            <td class="p-3 px-5">
                <input type="text" value="${data.name}" disabled class="bg-transparent border-b-2 border-gray-300 py-2">
            </td>
            <td class="p-3 px-5">
                <input type="text" value="${data.catégorie}" disabled class="bg-transparent border-b-2 border-gray-300 py-2">
            </td>
            <td class="p-3 px-5">
                <input type="text" value="${data.statut}" disabled class="bg-transparent border-b-2 border-gray-300 py-2">
            </td>
            <td class="p-3 px-5 flex justify-end">
                <button type="button" id="editBtn" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>
                <button type="button" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
            </td>
        </tr>`;
    const option = document.createElement('option');
    option.value = data.name; 
    option.textContent = data.name;
    quizSelect.appendChild(option);

    localStorage.setItem('quizzes', JSON.stringify(quizzes));

    quizForm.reset();
});



questionForm.addEventListener('submit',(e)=>{
    e.preventDefault();

     const type = questionForm.querySelector('[name="type"]').value;
     const quizTitre = questionForm.querySelector('[name="QuizTitre"]').value;
     const options = questionForm.querySelector('[name="options"]').value;

     let question, correctAnswer, explanation;

        if(type=="QCM"){
             question = questionForm.querySelector('[name="Question"]').value;
             correctAnswer = questionForm.querySelector('[name="Correct Answer"]').value;
             explanation = questionForm.querySelector('[name="Explanation"]').value;
        }else if(type=="Vrai/Faux"){
             question = document.getElementById('question-vf').value;
             correctAnswer = document.getElementById('answer-vf').value;
             explanation = document.getElementById('explanation-vf').value; 
        }else if(type=="Textuelle"){
             question = document.getElementById('question-textuelle').value;
             correctAnswer = document.getElementById('answer-textuelle').value.split(',');
             explanation = document.getElementById('explanation-textuelle').value; 
        }

     const questionData = {
        Question: question,
        Options: options.split(','),
        CorrectAnswer: correctAnswer,
        Explanation: explanation,
        Type: type,
        QuizTitre: quizTitre,
    };
    
    if (!question || !correctAnswer || !explanation) {
        alert("Please fill in all required fields (Question, Correct Answer, Explanation).");
        return;
    }


    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    

    const quiz = quizzes.find(q => q.name === quizTitre);

    if (quiz) {
        
        quiz.questions.push(questionData);


        questionsContainer.innerHTML += `
            <tr class="border-b hover:bg-blue-200 bg-gray-100">
                <td class="p-3 px-5">
                    <input type="text" value="${questionData.QuizTitre}" disabled class="bg-transparent border-b-2 border-gray-300 py-2">
                </td>
                <td class="p-3 px-5">
                    <input type="text" value="${questionData.Type}" disabled class="bg-transparent border-b-2 border-gray-300 py-2">
                </td>
                <td class="p-3 px-5">
                    <input type="text" value="${quiz.Niveau}" disabled class="bg-transparent border-b-2 border-gray-300 py-2">
                </td>
                <td class="p-3 px-5 flex justify-end">
                    <button type="button" id="editQuestionBtn"
                        class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>
                    <button type="button"
                        class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                </td>
            </tr>`;


        /************************************************************* */

    


    } else {
        alert('Quiz not found!');
    }

    localStorage.setItem('quizzes', JSON.stringify(quizzes));
    questionForm.reset();

    


})








 