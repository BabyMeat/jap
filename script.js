const words = [
    // HIRAGANA :
    // A .....................
    { character: 'あき', french: 'printemps' },
    { character: 'あさ', french: 'matin' },
    { character: 'あたま', french: 'tête' },
    // i
    { character: 'いいえ', french: 'non' },
    { character: 'いえ', french: 'maison' },
    { character: 'いま', french: 'maintenant' },
    // u
    { character: 'うえ', french: 'haut' },
    { character: 'うしろ', french: 'derrière' },
    { character: 'うた', french: 'chanson' },
    { character: 'うみのひ', french: 'jour de la mer' },
    // e
    { character: 'えき', french: 'gare' },
    // o
    { character: 'おしいれ', french: 'armoire' },
    { character: 'おとこ', french: 'homme' },
    { character: 'おまわりさん', french: 'policier' },
    { character: 'おんな', french: 'femme' },
    
    // KA .....................
    { character: 'かう', french: 'acheter' },
    { character: 'かお', french: 'visage' },
    { character: 'かさ', french: 'parapluie' },
    // ki
    { character: 'き', french: 'arbre' },
    { character: 'きく', french: 'écouter' },
    { character: 'きっぷ', french: 'ticket' },
    { character: 'きゅうきゅうしゃ', french: 'ambulance' },
    { character: 'きょう', french: 'aujourdhui' },
    // ku
    { character: 'くち', french: 'bouche' },
    { character: 'くつ', french: 'chaussure' },
    { character: 'くつした', french: 'chausette' },
    // ke
    { character: 'けさ', french: 'ce matin' },
    { character: 'けっきょく', french: 'finalement' },
    // ko
    { character: 'こえ', french: 'voix' },
    { character: 'ことし', french: 'cette année' },
    { character: 'このは', french: 'feuille' },
    
    // SA .....................
    { character: 'さかな', french: 'poisson' },
    { character: 'さき', french: 'avant' },
    { character: 'さら', french: 'assiette' },
    // shi
    { character: 'しかてつ', french: 'métro' },
    { character: 'した', french: 'dessous' },
    // su
    { character: 'すき', french: 'aimer' },
    { character: 'すこし', french: 'peu' },
    // se
    { character: 'せんせい', french: 'professeur' },
    // so
    { character: 'そら', french: 'ciel' },
    { character: 'そと', french: 'dehors' },

    // TA .....................
    { character: 'たかい', french: 'cher' },
    { character: 'たち', french: 'pluriel' },
    // chi
    { character: 'ちいさい', french: 'petit' },
    { character: 'ちゃい', french: 'thé' },
    // tsu
    { character: 'ついたち', french: 'premier soleil du mois' },
    { character: 'つくえ', french: 'bureau' },
    // te
    { character: 'てんき', french: 'méteo' },
    // to
    { character: 'とうきょう', french: 'tokyo' },
    { character: 'とき', french: 'temps' },
    { character: 'とけい', french: 'montre' },
    { character: 'とる', french: 'nuit' },
    
    // NA .....................
    { character: 'なつ', french: 'été' },
    // ni
    { character: 'にんじゃ', french: 'ninja' },
    // nu
    // ne
    // no 

    // HA .....................
    { character: 'はち', french: 'huit' },
    { character: 'はな', french: 'fleur' },
    { character: 'はる', french: 'automne' },
    // hi
    { character: 'ひる', french: 'midi' },
    { character: 'ひるごはん', french: 'déjeuner' },
    // fu 
    { character: 'ふゆ', french: 'hiver' },
    { character: 'ぱん', french: 'pain' },
    // he
    // ho

    // MA .....................
    { character: 'まいにち', french: 'chaque jour' },
    { character: 'まえ', french: 'devant' },
    // mi
    { character: 'みみ', french: 'oreilles' },
    // mu 
    // me
    { character: 'め', french: 'yeux' },
    // mo
    
    

    // YA .....................
    { character: 'やくそく', french: 'promesse' },
    { character: 'やさい', french: 'légumes' },
    { character: 'やすみ', french: 'repos' },
    // yu
    { character: 'ゆき', french: 'neige' },
    // yo
    { character: 'よく', french: 'souvent' },
    { character: 'よむ', french: 'lire' },
    
    // RA .....................
    // ri
    // ru
    // re
    // ro

    // WA .....................
    { character: 'わたし', french: 'je' },
    //wo

    // N .....................


    // KATAKANA :
    // A .....................
    // i
    // u
    // e 
    // o

    // KA .....................
    { character: 'カタカナ', french: 'katakana' },
    // ki
    { character: 'ギター', french: 'guitarre' },
    // ku
    // ke
    // ko
    { character: 'コート', french: 'manteau' },
    { character: 'コーヒー', french: 'café' },

    // SA .....................
    // shi
    // su
    // se
    // so

    // TA .....................
    { character: 'タクシー', french: 'taxi' },
    //chi
    // tsu
    // te
    // to

    // NA .....................
    // ni
    // nu
    // ne
    //no
    { character: 'ノート', french: 'cahier de notes' },

    // HA .....................
    { character: 'バター', french: 'beurre' },
    // hi
    // fu
    // he
    { character: 'ベッド', french: 'lit' },
    // ho


    // KANJI :
    /*
    { character: '日', french: 'soleil' },
    { character: '月', french: 'lune' },
    { character: '山', french: 'montagne' },
    { character: '川', french: 'rivière' },
    { character: '田', french: 'champ' },
    */
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
