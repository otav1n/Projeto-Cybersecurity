// ======================================================================
// 1. ANIMAÇÃO DE SCROLL (FADE/SLIDE)
// ======================================================================

const sections = document.querySelectorAll("section");
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // observer.unobserve(entry.target); // Descomente para animar apenas uma vez
    }
  });
}, observerOptions);

sections.forEach((section) => {
  observer.observe(section);
});

// ======================================================================
// 2. NAVEGAÇÃO MOBILE (MENU HAMBURGUER)
// ======================================================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  // Adicionar classe para animação do ícone hamburguer, se implementada no CSS
  menuToggle.classList.toggle("open");
});

// Fechar menu ao clicar em um link (apenas em mobile)
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("open");
    }
  });
});

// ======================================================================
// 3. LÓGICA DO QUIZ
// ======================================================================

const quizForm = document.getElementById("quizForm");
const quizResult = document.getElementById("quizResult");

quizForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Função para obter valores das variáveis CSS para uso no JS
  const getCssVar = (varName) =>
    getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

  // Define as cores CSS lidas do :root
  const accentColor = getCssVar("--color-accent");
  const dangerColor = getCssVar("--color-danger");
  const orangeColor = "orange"; // Cor simples para nível médio

  const answers = {
    q1: "b",
    q2: "b",
    q3: "b",
  };
  let score = 0;
  const totalQuestions = Object.keys(answers).length;

  for (const [question, correctAnswer] of Object.entries(answers)) {
    const userAnswer = document.querySelector(
      `input[name="${question}"]:checked`
    );
    if (userAnswer && userAnswer.value === correctAnswer) {
      score++;
    }
  }

  const percentage = (score / totalQuestions) * 100;
  let feedback = "";

  if (percentage === 100) {
    feedback =
      "Parabéns! Excelente conhecimento em segurança digital. Continue assim!";
    quizResult.style.color = accentColor;
  } else if (percentage >= 50) {
    feedback =
      'Muito bem! Você acertou a maioria. Revise as seções de "Riscos" e "Proteção Pessoal" para melhorar.';
    quizResult.style.color = orangeColor;
  } else {
    feedback =
      "Atenção! É fundamental revisar todo o conteúdo do site para se proteger melhor. O conhecimento é sua defesa!";
    quizResult.style.color = dangerColor;
  }

  quizResult.innerHTML = `Sua pontuação: ${score} de ${totalQuestions} (${percentage.toFixed(
    0
  )}%). ${feedback}`;
});
