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
            words = parseCSV(e.target.result);
            dropZone.classList.add('hidden');  // Masquer la zone de drop
            document.getElementById('startWithPredefinedWords').classList.add('hidden'); // Masquer le bouton
            document.getElementById('quiz').classList.remove('hidden'); // Afficher la section quiz
            loadQuestion();
        } catch (error) {
            alert('Erreur lors de la lecture du fichier CSV.');
        }
    };
    reader.readAsText(file);
}

function parseCSV(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(header => header.trim()); // Première ligne comme en-têtes
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length === headers.length) {
            const entry = {};
            for (let j = 0; j < headers.length; j++) {
                entry[headers[j]] = values[j].trim();
            }
            result.push(entry);
        }
    }

    return result;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function loadQuestion() {
    if (words.length === 0) return;

    const questionIndex = getRandomInt(words.length);
    currentQuestion = words[questionIndex];

    const kanjiElement = document.getElementById('kanji');
    kanjiElement.textContent = currentQuestion.character;

    const choices = new Set();
    const filteredWords = words.filter(word => word.french !== currentQuestion.french && word.kana !== currentQuestion.kana);

    while (choices.size < 3) {
        const choiceIndex = getRandomInt(filteredWords.length);
        choices.add(filteredWords[choiceIndex].french);
    }

    choices.add(currentQuestion.french);
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
            words = parseCSV(data);
            dropZone.classList.add('hidden');  // Masquer la zone de drop
            document.getElementById('startWithPredefinedWords').classList.add('hidden'); // Masquer le bouton
            document.getElementById('quiz').classList.remove('hidden'); // Afficher la section quiz
            console.log("Session prédéfinie démarrée avec succès.");
            loadQuestion();
        })
        .catch(error => {
            console.error('Erreur lors de la lecture du fichier CSV prédéfini:', error);
        });
}