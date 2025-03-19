// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
        });
        
        // Close mobile menu when a link is clicked
        const mobileNavLinks = mobileNav.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
            });
        });
    }
    
    // Quiz Functionality
    initializeQuiz();
});

function initializeQuiz() {
    // Quiz elements
    const startScreen = document.getElementById('quiz-start');
    const questionsScreen = document.getElementById('quiz-questions');
    const resultsScreen = document.getElementById('quiz-results');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const prevQuestionBtn = document.getElementById('prev-question');
    const nextQuestionBtn = document.getElementById('next-question');
    const questionNumber = document.getElementById('question-number');
    const questionText = document.getElementById('question-text');
    const quizOptions = document.getElementById('quiz-options');
    const currentScoreElement = document.getElementById('current-score');
    const finalScoreElement = document.getElementById('final-score');
    const scoreMessageElement = document.getElementById('score-message');
    const retakeQuizBtn = document.getElementById('retake-quiz');
    
    // Quiz state
    let currentQuestion = 0;
    let score = 0;
    let selectedOption = null;
    let quizStarted = false;
    let quizCompleted = false;
    
    // Quiz questions
    const questions = [
        {
            question: "How is TB primarily transmitted?",
            options: [
                "Through contaminated food and water",
                "Through airborne droplets when an infected person coughs or sneezes",
                "Through physical contact with an infected person",
                "Through insect bites"
            ],
            correctAnswer: 1
        },
        {
            question: "Which of the following is NOT a common symptom of TB?",
            options: [
                "Persistent cough lasting more than three weeks",
                "Night sweats",
                "Rash and itchy skin",
                "Weight loss"
            ],
            correctAnswer: 2
        },
        {
            question: "What is the BCG vaccine used for?",
            options: [
                "Treating active TB",
                "Preventing TB infection in children",
                "Curing latent TB",
                "Diagnosing TB"
            ],
            correctAnswer: 1
        },
        {
            question: "How long does standard TB treatment typically last?",
            options: [
                "2-4 weeks",
                "6-9 months",
                "1-2 years",
                "3-4 months"
            ],
            correctAnswer: 1
        },
        {
            question: "Which organization leads global efforts to combat TB?",
            options: [
                "UNICEF",
                "Red Cross",
                "World Health Organization (WHO)",
                "Doctors Without Borders"
            ],
            correctAnswer: 2
        }
    ];
    
    // Initialize event listeners
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', startQuiz);
    }
    
    if (prevQuestionBtn) {
        prevQuestionBtn.addEventListener('click', goToPreviousQuestion);
    }
    
    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', goToNextQuestion);
    }
    
    if (retakeQuizBtn) {
        retakeQuizBtn.addEventListener('click', restartQuiz);
    }
    
    // Quiz functions
    function startQuiz() {
        quizStarted = true;
        currentQuestion = 0;
        score = 0;
        selectedOption = null;
        quizCompleted = false;
        
        startScreen.classList.remove('active');
        questionsScreen.classList.add('active');
        resultsScreen.classList.remove('active');
        
        updateQuestion();
    }
    
    function updateQuestion() {
        const question = questions[currentQuestion];
        questionNumber.textContent = `Question ${currentQuestion + 1}/${questions.length}`;
        questionText.textContent = question.question;
        currentScoreElement.textContent = score;
        
        // Clear and rebuild the options
        quizOptions.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            
            const input = document.createElement('input');
            input.type = 'radio';
            input.id = `option-${index}`;
            input.name = 'quiz-option';
            input.checked = selectedOption === index;
            input.addEventListener('change', () => selectOption(index));
            
            const label = document.createElement('label');
            label.htmlFor = `option-${index}`;
            label.textContent = option;
            
            optionElement.appendChild(input);
            optionElement.appendChild(label);
            quizOptions.appendChild(optionElement);
        });
        
        // Update button states
        prevQuestionBtn.disabled = currentQuestion === 0;
        nextQuestionBtn.textContent = currentQuestion === questions.length - 1 ? 'Finish' : 'Next';
    }
    
    function selectOption(index) {
        selectedOption = index;
    }
    
    function goToPreviousQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            selectedOption = null;
            updateQuestion();
        }
    }
    
    function goToNextQuestion() {
        const question = questions[currentQuestion];
        if (selectedOption === null) {
            alert('Please select an answer before proceeding.');
            return;
        }
        
        // Check if the answer is correct
        if (selectedOption === question.correctAnswer) {
            score++;
        }
        
        // Move to the next question or complete the quiz
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            selectedOption = null;
            updateQuestion();
        } else {
            completeQuiz();
        }
    }
    
    function completeQuiz() {
        quizCompleted = true;
        
        questionsScreen.classList.remove('active');
        resultsScreen.classList.add('active');
        
        finalScoreElement.textContent = `${score}/${questions.length}`;
        scoreMessageElement.textContent = getScoreMessage(score);
    }
    
    function getScoreMessage(score) {
        if (score === 5) {
            return "Perfect score! You're a TB awareness champion!";
        } else if (score >= 3) {
            return "Great job! You're well-informed about TB.";
        } else {
            return "Good effort! Keep learning about TB to improve your knowledge.";
        }
    }
    
    function restartQuiz() {
        quizStarted = false;
        quizCompleted = false;
        
        resultsScreen.classList.remove('active');
        startScreen.classList.add('active');
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for header height
                behavior: 'smooth'
            });
        }
    });
});