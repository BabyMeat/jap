let words = [];
let currentQuestion;
let correctAnswer;

document.getElementById('fileInput').addEventListener('change', handleFileUpload);

const dropZone = document.getElementById('dropZone');
dropZone.addEventListener('dragover', handleDragOver);
dropZone.addEventListener('dragleave', handleDragLeave);
dropZone.addEventListener('drop', handleFileDrop);
dropZone.addEventListener('click', () => document.getElementById('fileInput').click());

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        readFile(file);
    }
}

function handleDragOver(event) {
    event.preventDefault();
    dropZone.classList.add('dragging');
}

function handleDragLeave(event) {
    event.preventDefault();
    dropZone.classList.remove('dragging');
}

function handleFileDrop(event) {
    event.preventDefault();
    dropZone.classList.remove('dragging');
    const file = event.dataTransfer.files[0];
    if (file) {
        readFile(file);
    }
}

function readFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            words = JSON.parse(e.target.result);
            dropZone.classList.add('hidden');  // Masquer la zone de drop
            document.getElementById('startWithPredefinedWords').classList.add('hidden'); // Masquer le bouton
            document.getElementById('quiz').classList.remove('hidden'); // Afficher le quiz
            loadQuestion();
        } catch (error) {
            alert('Erreur lors de la lecture du fichier JSON.');
        }
    };
    reader.readAsText(file);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomBoolean() {
    return Math.random() < 0.5;
}

function loadQuestion() {
    if (words.length === 0) return;

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

    const choices = new Set();
    const filteredWords = words.filter(word => word.french !== correctAnswer && word.kana !== correctAnswer);

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
        resultElement.textContent = 'Correct!';
        setTimeout(loadQuestion, 500);
    } else {
        resultElement.textContent = 'Incorrect, essayez encore!';
    }
}

document.getElementById('startWithPredefinedWords').addEventListener('click', startPredefinedSession);

function startPredefinedSession() {
    fetch('characters.json')  // Assurez-vous que le chemin est correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            words = data;
            dropZone.classList.add('hidden');  // Masquer la zone de drop
            document.getElementById('startWithPredefinedWords').classList.add('hidden'); // Masquer le bouton
            document.getElementById('quiz').classList.remove('hidden'); // Afficher le quiz
            console.log("Session prédéfinie démarrée avec succès.");
            loadQuestion();
        })
        .catch(error => {
            console.error('Erreur lors de la lecture du fichier JSON prédéfini:', error);
        });
}