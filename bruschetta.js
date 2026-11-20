const menuopenbutton = document.querySelector("#menu-open-button");
const menuclosebutton = document.querySelector("#menu-close-button");

menuopenbutton.addEventListener("click", () => {
    document.body.classList.add("show-mobile-menu");
});
 
menuclosebutton.addEventListener("click", () => {
    document.body.classList.remove("show-mobile-menu");
    
}); 
const hamburgerBtn = document.querySelector(".hamburger-btn");
const dropdown = document.querySelector(".dropdown");

hamburgerBtn.addEventListener("click", () => {
    dropdown.classList.toggle("show");
});

// Fermer le menu si on clique ailleurs
window.addEventListener("click", function(e) {
    if (!e.target.closest('.dropdown')) {
        dropdown.classList.remove("show");
    }
});
 //quizz 
 // le bouton suivant s'affiche seulement si on choisir un choix
const menu = {
  poisson: [
    "Daurade au four",
    "Loup au four",
    "Filet de loup farci aux crevettes",
    "Symphonie de la mer grillée",
    "Marmite pêcheur",
    "Pavé d’espadon à la sicilienne"
  ],
  pates: [
    "Ravioli ricotta épinard",
    "Risotto fruits de mer",
    "Risotto 4 fromages",
    "Paella royale",
    "Lasagne bolognaise",
    "Pâte bolognaise",
    "Spaghetti fruits de mer",
    "Pâte salmone"
  ],
  volailles: [
    "Suprême de poulet sauce blanche champignons",
    "Poulet à la toscane",
    "Poulet pané",
    "Brochette de poulet grillée"
  ],
  viande: [
    "Côte à l’os grillée sauce champignons",
    "Filet de bœuf",
    "Grillade mixte",
    "Bœuf stroganov"
  ],
  pizza: [
    "Pizza Margherita",
    "Pizza Végétarienne",
    "Pizza Pepperoni",
    "Pizza Burrattina",
    "Pizza Salmone"
  ],
  fruitsDeMer: [
    "Calamar pané croustillant",
    "Moules sautées à l’ail et persil",
    "Petite seiche sautée à l’ail"
  ],
  salade: [
    "Salade César",
    "Salade Burrata",
    "Salade Venezia",
    "Salade Hannibal"
  ],
  dessert: [
    "Tiramisu",
    "Fraisier",
    "Gâteau du chef"
  ]
};

const questions = [
  {
    question: "Quelle est ton humeur aujourd’hui ?",
    answers: [
      { text: "😄 En pleine forme et joyeux(se)", plats: ["pizza", "viande"] },
      { text: "😌 Calme et zen", plats: ["poisson", "salade"] },
      { text: "😤 Stressé(e), besoin de réconfort", plats: ["pates", "volailles"] },
      { text: "😴 Fatigué(e), envie de quelque chose de simple", plats: ["pates"] },
      { text: "🤩 Festif(ve), je veux un vrai festin !", plats: ["poisson", "viande", "pates"] }
    ]
  },
  {
    question: "As-tu des préférences alimentaires ?",
    answers: [
      { text: "Non, je mange de tout 😋", plats: ["pizza", "viande", "pates"] },
      { text: "🥬 Végétarien(ne)", plats: ["salade", "pizza"] },
      { text: "🐟 Pescétarien(ne)", plats: ["poisson", "fruitsDeMer"] },
      { text: "🍗 Riche en protéines / sportif(ve)", plats: ["volailles", "viande"] },
      { text: "🧈 Faible en calories / régime minceur", plats: ["salade", "poisson"] }
    ]
  },
  {
    question: "Quel type de plat te décrit le mieux ?",
    answers: [
      { text: "🍕 Pizza", plats: ["pizza"] },
      { text: "🥗 Salade", plats: ["salade"] },
      { text: "🍝 Pâtes", plats: ["pates"] },
      { text: "🐟 Poisson", plats: ["poisson"] },
      { text: "🍰 Dessert", plats: ["dessert"] },
      { text: "🥩 Viande", plats: ["viande"] },
      { text: "🦑 Fruits de mer", plats: ["fruitsDeMer"] }
    ]
  },
  {
    question: "Ton niveau de faim ?",
    answers: [
      { text: "🥄 Juste un petit creux", plats: ["salade"] },
      { text: "🍽 Normalement", plats: ["pizza", "pates"] },
      { text: "🍛 Très faim", plats: ["pates", "volailles"] },
      { text: "🐺 Faim de loup", plats: ["viande", "poisson"] }
    ]
  }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let platsChoisis = []; // ⭐ NOUVEAU
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = currentQuestionIndex + 1 + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");

    button.addEventListener("click", () => {
      platsChoisis.push(...answer.plats); // ⭐ IMPORTANT
      nextButton.style.display = "block";

      Array.from(answerButtons.children).forEach(btn => {
        btn.classList.remove("selected");
      });
      button.classList.add("selected");
    });

    answerButtons.appendChild(button);
  });
}
function getTopCategories() {
  const count = {};

  platsChoisis.forEach(p => {
    count[p] = (count[p] || 0) + 1;
  });

  return Object.keys(count).sort((a, b) => count[b] - count[a]);
}
function showResult() {
  // Réinitialiser les boutons et cacher question
  resetState();

  // Vider l'enoncé de la dernière question
  questionElement.innerHTML = "";

  // Afficher le résultat dans result-box
  const resultBox = document.getElementById("result-box");
  resultBox.classList.remove("hidden");

  const topCategories = getTopCategories();

  const plat1 = menu[topCategories[0]][0];
  const plat2 = menu[topCategories[0]][1];

  resultBox.innerHTML = `
    <h2> Les suggestions du Chef</h2>
    <p>Selon vos réponses, nous vous recommandons :</p>
    <div class="plat-card">🍽️ ${plat1}</div>
    <div class="plat-card">🍽️ ${plat2}</div>
    <p style="margin-top:15px;">Bon appétit chez <strong>Bruschetta</strong> 😋</p>
  `;

  nextButton.innerHTML = "Recommencer";
  nextButton.style.display = "block";
}

function resetState() {
  nextButton.style.display = "none";

  // cacher le résultat
  const resultBox = document.getElementById("result-box");
  if (resultBox) resultBox.classList.add("hidden");

  // vider les boutons
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    platsChoisis = [];
    currentQuestionIndex = 0;
    startQuiz();
  }
});

function startQuiz() {
  currentQuestionIndex = 0;
  platsChoisis = [];
  nextButton.innerHTML = "Suivant";
  showQuestion();
}

startQuiz();
