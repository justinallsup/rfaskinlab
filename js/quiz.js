// QUIZ LOGIC AND STATE MANAGEMENT

class SkinQuiz {
    constructor() {
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.container = document.getElementById('quizContainer');
        this.progressBar = document.getElementById('progressBar');
        this.currentQuestionDisplay = document.getElementById('currentQuestion');
        
        this.init();
    }

    init() {
        this.renderQuestion();
        this.updateProgress();
    }

    renderQuestion() {
        const questionData = quizData.questions[this.currentQuestionIndex];
        
        if (!questionData) {
            this.showLeadCapture();
            return;
        }

        const layoutClass = questionData.layout === 'single' ? 'single-column' : '';
        
        const optionsHTML = questionData.options.map(option => {
            const icon = option.icon ? `<div class="option-icon">${option.icon}</div>` : '';
            const subtext = option.subtext ? `<div class="option-subtext">${option.subtext}</div>` : '';
            
            return `
                <div class="quiz-option" data-value="${option.value}">
                    ${icon}
                    <div class="option-text">${option.text}</div>
                    ${subtext}
                </div>
            `;
        }).join('');

        const questionHTML = `
            <div class="quiz-question active">
                <div class="question-number">${questionData.number}</div>
                <h2 class="question-text">${questionData.text}</h2>
                
                <div class="quiz-options ${layoutClass}">
                    ${optionsHTML}
                </div>

                <div class="quiz-nav">
                    <button class="btn-back" id="btnBack" ${this.currentQuestionIndex === 0 ? 'disabled' : ''}>
                        ← Back
                    </button>
                    <button class="btn btn-primary btn-continue" id="btnContinue" disabled>
                        Continue →
                    </button>
                </div>
            </div>
        `;

        this.container.innerHTML = questionHTML;
        this.attachEventListeners();
        this.restoreAnswer();
    }

    attachEventListeners() {
        // Option selection
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                this.selectOption(e.currentTarget);
            });
        });

        // Navigation buttons
        const btnBack = document.getElementById('btnBack');
        const btnContinue = document.getElementById('btnContinue');

        if (btnBack) {
            btnBack.addEventListener('click', () => this.previousQuestion());
        }

        if (btnContinue) {
            btnContinue.addEventListener('click', () => this.nextQuestion());
        }
    }

    selectOption(optionElement) {
        // Remove previous selections
        const allOptions = document.querySelectorAll('.quiz-option');
        allOptions.forEach(opt => opt.classList.remove('selected'));

        // Add selection to clicked option
        optionElement.classList.add('selected');

        // Store answer
        const value = optionElement.dataset.value;
        const questionId = quizData.questions[this.currentQuestionIndex].id;
        this.answers[questionId] = value;

        // Enable continue button
        const btnContinue = document.getElementById('btnContinue');
        btnContinue.disabled = false;
    }

    restoreAnswer() {
        const questionId = quizData.questions[this.currentQuestionIndex].id;
        const savedAnswer = this.answers[questionId];

        if (savedAnswer) {
            const option = document.querySelector(`[data-value="${savedAnswer}"]`);
            if (option) {
                option.classList.add('selected');
                const btnContinue = document.getElementById('btnContinue');
                btnContinue.disabled = false;
            }
        }
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.updateProgress();
        
        if (this.currentQuestionIndex < quizData.questions.length) {
            this.renderQuestion();
        } else {
            this.showLeadCapture();
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.updateProgress();
            this.renderQuestion();
        }
    }

    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / quizData.questions.length) * 100;
        this.progressBar.style.width = `${progress}%`;
        this.currentQuestionDisplay.textContent = this.currentQuestionIndex + 1;
    }

    showLeadCapture() {
        const leadCaptureHTML = `
            <div class="lead-capture active">
                <h2>Receive Your Personalized Clinical Routine</h2>

                <div id="errorMessage" class="quiz-error"></div>

                <form id="leadForm">
                    <div class="form-group">
                        <label class="form-label" for="email">Email address</label>
                        <input 
                            type="email" 
                            id="email" 
                            class="form-input" 
                            placeholder="your.email@example.com"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="phone">
                            Phone number
                            <span class="form-optional">(optional, for SMS updates)</span>
                        </label>
                        <input 
                            type="tel" 
                            id="phone" 
                            class="form-input" 
                            placeholder="+1 (555) 000-0000"
                        >
                    </div>

                    <p class="privacy-notice">
                        We respect your privacy. No spam, ever.
                    </p>

                    <button type="submit" class="btn btn-primary btn-submit">
                        View My Results
                    </button>
                </form>

                <div style="margin-top: 30px; text-align: center;">
                    <button class="btn-back" id="btnBackToQuiz">
                        ← Back to questions
                    </button>
                </div>
            </div>
        `;

        this.container.innerHTML = leadCaptureHTML;

        // Update progress to 100%
        this.progressBar.style.width = '100%';
        this.currentQuestionDisplay.textContent = '7';

        // Attach form handler
        const form = document.getElementById('leadForm');
        form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Back button
        const btnBack = document.getElementById('btnBackToQuiz');
        btnBack.addEventListener('click', () => {
            this.currentQuestionIndex = quizData.questions.length - 1;
            this.renderQuestion();
            this.updateProgress();
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        const submissionData = {
            email: email,
            phone: phone,
            answers: this.answers,
            timestamp: new Date().toISOString(),
            source: 'skin-quiz'
        };

        console.log('Quiz submission:', submissionData);

        // Store in localStorage for results page
        const quizData = {
            email: email,
            phone: phone,
            answers: this.answers,
            segment: this.determineSegment(),
            timestamp: new Date().toISOString(),
            source: 'skin-quiz'
        };
        
        localStorage.setItem('quizData', JSON.stringify(quizData));
        localStorage.setItem('userSegment', quizData.segment);

        console.log('Quiz submission:', quizData);

        // In production, this would submit to your backend/CRM
        // For now, simulate submission and redirect
        this.simulateSubmission(quizData);
    }

    determineSegment() {
        // Get actual answer values from quiz
        const fitzpatrick = this.answers[1]; // Q1: skin type
        const primaryConcern = this.answers[2]; // Q2: primary concern  
        const location = this.answers[3]; // Q3: location
        const duration = this.answers[4]; // Q4: duration
        const sensitivity = this.answers[5]; // Q5: sensitivity
        const priorTreatments = this.answers[6]; // Q6: prior treatments
        const activeAcne = this.answers[7]; // Q7: breakouts

        console.log('Quiz answers:', {
            fitzpatrick,
            primaryConcern,
            location,
            duration,
            sensitivity,
            priorTreatments,
            activeAcne
        });

        // Determine segment based on primary concern
        let segment = 'general-wellness';

        if (primaryConcern === 'melasma' || primaryConcern === 'sun-damage' || 
            primaryConcern === 'acne-marks' || primaryConcern === 'uneven-tone') {
            segment = 'hyperpigmentation';
            
            // Refine based on acne presence
            if (activeAcne === 'frequently' || activeAcne === 'occasionally') {
                segment = 'pigmentation-acne';
            }
            
            // Refine based on sensitivity
            if (sensitivity === 'very' || sensitivity === 'somewhat') {
                segment = 'pigmentation-sensitive';
            }
        } else if (activeAcne === 'frequently') {
            segment = 'acne';
        } else if (sensitivity === 'very') {
            segment = 'sensitivity';
        }

        return segment;
    }

    simulateSubmission(data) {
        // Show loading state
        const submitBtn = document.querySelector('.btn-submit');
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Generate results token
            const resultsToken = this.generateToken();
            
            // Redirect to results page
            window.location.href = `results.html?id=${resultsToken}`;
        }, 1500);
    }

    generateToken() {
        return Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15);
    }
}

// Initialize quiz when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SkinQuiz();
});
