const words = [
    { character: '日', french: 'soleil' },
    { character: '月', french: 'lune' },
    { character: '山', french: 'montagne' },
    { character: '川', french: 'rivière' },
    { character: '田', french: 'champ' },
    // Ajoute autant de mots que tu veux
];

let currentWordIndex = 0;

function displayWord() {
    document.getElementById('character').innerText = words[currentWordIndex].character;
    document.getElementById('answer').value = '';
    document.getElementById('result').innerText = '';
}

function checkAnswer() {
    const userAnswer = document.getElementById('answer').value.toLowerCase();
    const correctAnswer = words[currentWordIndex].french;
    if (userAnswer === correctAnswer) {
        document.getElementById('result').innerText = 'Correct!';
    } else {
        document.getElementById('result').innerText = 'Incorrect, essayez encore!';
    }
}

function nextWord() {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    displayWord();
}

document.addEventListener('DOMContentLoaded', displayWord);
