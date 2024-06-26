const words = [
    // KANJI :
    { character: '日', french: 'soleil' },
    { character: '月', french: 'lune' },
    { character: '山', french: 'montagne' },
    { character: '川', french: 'rivière' },
    { character: '田', french: 'champ' },
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
        correctSound.play();
        nextWord();
        document.getElementById('result').innerText = 'Correct!';
    } else if (userAnswer === '') { 
        document.getElementById('result').innerText = 'La réponse est : ' + correctAnswer;
    } else {
        wrongSound.play();
        document.getElementById('result').innerText = 'Incorrect, essayez encore!';
    }
}

function nextWord() {
    currentWordIndex = Math.floor(Math.random() * words.length);
    displayWord();
}

document.add

document.addEventListener('DOMContentLoaded', () => {
    currentWordIndex = Math.floor(Math.random() * words.length);
    displayWord();
    
    const answerInput = document.getElementById('answer');
    answerInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
});
