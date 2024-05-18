const words = [
    // HIRAGANA :
    { character: 'あき', french: 'printemps' },
    { character: 'あさ', french: 'matin' },
    { character: 'あたま', french: 'tête' },
    
    { character: 'いいえ', french: 'non' },
    { character: 'いえ', french: 'maison' },
    { character: 'いま', french: 'maintenant' },
    
    { character: 'うえ', french: 'haut' },
    { character: 'うしろ', french: 'derrière' },
    { character: 'うた', french: 'chanson' },
    { character: 'うみのひ', french: 'jour de la mer' },
    
    { character: 'えき', french: 'gare' },
    
    { character: 'おしいれ', french: 'armoire' },
    { character: 'おとこ', french: 'homme' },
    { character: 'おまわりさん', french: 'policier' },
    { character: 'おんな', french: 'femme' },


    
    { character: 'かう', french: 'acheter' },
    { character: 'き', french: 'arbre' },
    { character: 'くつ', french: 'chaussure' },
    { character: 'けさ', french: 'ce matin' },

    { character: 'こえ', french: 'voix' },
    { character: 'くつした', french: 'chausette' },
    { character: 'くち', french: 'bouche' },
    { character: 'かさ', french: 'parapluie' },

    { character: 'きく', french: 'écouter' },
    { character: 'かお', french: 'visage' },
    { character: 'ことし', french: 'cette année' },
    { character: 'このは', french: 'feuille' },

    { character: 'きょう', french: 'aujourdhui' },
    { character: 'けっきょく', french: 'finalement' },
    { character: 'きゅうきゅうしゃ', french: 'ambulance' },
     { character: 'きっぷ', french: 'ticket' },
    
    
    
    { character: 'このは', french: 'feuille' },

    // KANJI :
    /*
    { character: '日', french: 'soleil' },
    { character: '月', french: 'lune' },
    { character: '山', french: 'montagne' },
    { character: '川', french: 'rivière' },
    { character: '田', french: 'champ' },
    */
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
        nextWord();
        document.getElementById('result').innerText = 'Correct!';
    } else {
        document.getElementById('result').innerText = 'Incorrect, essayez encore!';
    }
}

function nextWord() {
    currentWordIndex = Math.floor(Math.random() * words.length);
    displayWord();
}

document.addEventListener('DOMContentLoaded', () => {
    currentWordIndex = Math.floor(Math.random() * words.length);
    displayWord();
});
