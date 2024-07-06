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
            words = parseCSV(e.target.result, ';'); // Utilisation du délimiteur ;
            loadQuestion();
        } catch (error) {
            alert('Erreur lors de la lecture du fichier CSV.');
        }
    };
    reader.readAsText(file);
}

function parseCSV(csv, delimiter = ';') {
    const lines = csv.split('\n');
    const result = [];

    for (let i = 0; i < lines.length; i++) {
        const values = lines[i].split(delimiter).map(value => value.trim());
        if (values.length > 1) {
            const entry = {
                character: values[0],  // Modifier en fonction de votre CSV
                french: values[1],     // Modifier en fonction de votre CSV
                kana: values[2]        // Modifier en fonction de votre CSV
                // Ajoutez d'autres champs si nécessaire
            };
            result.push(entry);
        }
    }

    return result;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Random Boolean
function getRandomBoolean() {
    return Math.random() < 0.5;
}

function loadQuestion() {
    if (words.length === 0) return;

    // Masquer la zone de drop et le bouton "Démarrer la session prédéfinie"
    document.getElementById('fileInput').classList.add('hidden');
    document.getElementById('dropZone').classList.add('hidden');
    document.getElementById('startWithPredefinedWords').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');  // Afficher le quiz

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

    if (selectedAnswer === currentQuestion.french) {
        resultElement.textContent = 'Correct!';
        setTimeout(loadQuestion, 500);
    } else {
        resultElement.textContent = 'Incorrect, essayez encore!';
    }
}

// Event listener pour démarrer une session prédéfinie
document.getElementById('startWithPredefinedWords').addEventListener('click', startPredefinedSession);

function startPredefinedSession() {
    fetch('kanji.csv')  // Assurez-vous que le chemin est correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            words = parseCSV(data, ';'); // Utilisation du délimiteur ;
            console.log("Session prédéfinie démarrée avec succès.");
            loadQuestion();
        })
        .catch(error => {
            console.error('Erreur lors de la lecture du fichier CSV prédéfini:', error);
        });
}