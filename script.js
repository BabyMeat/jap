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
    // Diviser le CSV en lignes
    const lines = csv.trim().split('\n');

    // Vérifier si le CSV est vide
    if (lines.length === 0) return [];

    // Récupérer les en-têtes à partir de la première ligne
    const headers = lines[0].split(delimiter).map(header => header.trim());

    // Transformer chaque ligne en un objet basé sur les en-têtes
    const result = lines.slice(1).reduce((acc, line) => {
        if (line.trim() === '') return acc; // Ignorer les lignes vides

        const values = line.split(delimiter).map(value => value.trim());
        
        if (values.length === headers.length) {
            const entry = headers.reduce((obj, header, index) => {
                obj[header] = values[index];
                return obj;
            }, {});

            acc.push(entry);
        } else {
            console.error(`Mauvaise formatation à la ligne : ${line}`);
        }

        return acc;
    }, []);

    console.log('PARSE : ' + result);

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
    console.log('CSV V2 : ' + words[0].character + words[1].character + words[2].character);
    console.log(words.length);
    if (words.length < 1) return;
    console.log('passe');

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