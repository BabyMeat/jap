const words = [
    { character: '人', french: 'personne' , kana: 'ひと'},
    { character: '男', french: 'homme' , kana: 'おとこ'},
    { character: '女', french: 'femme' , kana: 'おんな'},
    { character: '子', french: 'enfant' , kana: 'こ'},
    { character: '日', french: 'soleil' , kana: 'ひ'},
    { character: '月', french: 'lune' , kana: 'つき'},
    { character: '時', french: 'temps' , kana: 'とき'},
    { character: '水', french: 'eau' , kana: 'みず'},
    { character: '火', french: 'feu' , kana: 'ひ'},
    { character: '土', french: 'terre' , kana: 'つち'},  
    { character: '風', french: 'vent' , kana: 'かぜ'},   
    { character: '空', french: 'ciel' , kana: 'そら'},
    { character: '山', french: 'montagne' , kana: 'やま'},   
    { character: '川', french: 'rivière' , kana: 'かわ'},  
    { character: '木', french: 'arbre' , kana: 'き'},  
    { character: '花', french: 'fleur' , kana: 'はな'},
    { character: '雨', french: 'pluie' , kana: 'あめ'},
    { character: '雪', french: 'neige' , kana: 'ゆき'},   
    { character: '金', french: 'argent' , kana: 'かね'},
    { character: '刀', french: 'sabre' , kana: 'かたな'},
];

let currentQuestion;
let correctAnswer;

// Random Index
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Random Boolean
function getRandomBoolean() {
    return Math.random() < 0.5;
}

function getRandomBoolean() {
    return Math.random() < 0.5;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function loadQuestion() {
    const questionType = getRandomBoolean();
    const questionIndex = getRandomInt(words.length);
    currentQuestion = words[questionIndex];
    
    if (questionType) {
        correctAnswer = currentQuestion.french;
    } else {
        correctAnswer = currentQuestion.kana;
    }

    const kanjiElement = document.getElementById('kanji');
    kanjiElement.textContent = currentQuestion.character;

    // Faire en sorte que toutes les réponses soient différentes
    const choices = new Set();
    
    // Filtrer les mots pour exclure la réponse correcte
    const filteredWords = words.filter(word => word.french !== correctAnswer);

    while (choices.size < 3) {
        const choiceIndex = getRandomInt(filteredWords.length);
        if (questionType) {
            choices.add(filteredWords[choiceIndex].french);
        } else {
            choices.add(filteredWords[choiceIndex].kana);
        }
    }

    choices.add(correctAnswer);
    const choicesArray = Array.from(choices);
    choicesArray.sort(() => Math.random() - 0.5);

    const choiceButtons = document.querySelectorAll('.choice');
    choiceButtons.forEach((button, index) => {
        button.textContent = choicesArray[index];
    });

    document.getElementById('result').textContent = '';
}


function checkAnswer(button) {
    const selectedAnswer = button.textContent;
    const resultElement = document.getElementById('result');
    
    if (selectedAnswer === correctAnswer) {
        correctSound.play();
        document.getElementById('result').innerText = 'Correct!';
        setTimeout(loadQuestion, 500);  // Chargement de la prochaine question après un délai de 500 ms
    } else {
        wrongSound.play();
        resultElement.textContent = `Incorrect, essayez encore!`;
    }
}


document.addEventListener('DOMContentLoaded', loadQuestion);