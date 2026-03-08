// Professional JavaScript for Speak Easy Website

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Admin login form functionality
    const adminLoginForm = document.querySelector('#adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('adminEmail').value.trim();
            const password = document.getElementById('adminPassword').value.trim();
            
            if (!email || !password) {
                showAdminLoginError('Please fill in all fields');
                return;
            }
            
            const adminEmail = 'parisspeakeasy@gmail.com';
            const adminPassword = '43258';
            
            const submitBtn = this.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Signing In...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                if (email.toLowerCase() === adminEmail.toLowerCase() && password === adminPassword) {
                    setAdminSession();
                    submitBtn.textContent = 'Success! Redirecting...';
                    setTimeout(() => {
                        window.location.href = 'Admin_dashboard.htm';
                    }, 1000);
                } else {
                    showAdminLoginError('Invalid admin credentials. Please try again.');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            }, 1000);
        });
    }

    // Enhanced login form functionality
    const loginForm = document.querySelector('#loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            if (!username || !password) {
                showLoginError('Please fill in all fields');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Signing In...';
            submitBtn.disabled = true;
            
            // Check for admin login
            const adminEmail = 'parisspeakeasy@gmail.com';
            const adminPassword = '43258';
            
            if (username.toLowerCase() === adminEmail.toLowerCase() && password === adminPassword) {
                // Admin login
                setAdminSession();
                setTimeout(() => {
                    window.location.href = 'Admin_dashboard.htm';
                }, 1000);
                return;
            }
            
            // Simulate login process (in real app, this would be an API call)
            setTimeout(() => {
                // For demo purposes, accept any login with valid credentials
                if (username.length >= 3 && password.length >= 8) {
                    // Track user login
                    trackUserLogin(username);
                    showLoginSuccess(username);
                    // Redirect to home page after successful login
                    setTimeout(() => {
                        window.location.href = 'Home page.htm';
                    }, 2000);
                } else {
                    showLoginError('Invalid username or password. Please try again.');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            }, 1500);
        });
    }

    // Login helper functions
    function showLoginError(message) {
        showLoginErrorMessage(message, 'loginForm');
    }
    
    function showAdminLoginError(message) {
        showLoginErrorMessage(message, 'adminLoginForm');
    }
    
    function showLoginErrorMessage(message, formId) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.login-error-message, .login-success-message');
        existingMessages.forEach(msg => msg.remove());

        // Create and show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'login-error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            background: #fee2e2;
            color: #dc2626;
            border: 1px solid #fca5a5;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            font-weight: 500;
            text-align: center;
        `;

        const form = document.getElementById(formId);
        if (form) {
            form.insertBefore(errorDiv, form.firstChild);
        }

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    function showLoginSuccess(username) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.login-error-message, .login-success-message');
        existingMessages.forEach(msg => msg.remove());

        // Create and show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'login-success-message';
        successDiv.innerHTML = `
            <div style="text-align: center; padding: 1rem;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎉</div>
                <h3 style="color: #059669; margin-bottom: 0.5rem;">Welcome back, ${username}!</h3>
                <p style="color: #047857;">Login successful! Redirecting to your dashboard...</p>
            </div>
        `;
        successDiv.style.cssText = `
            background: #d1fae5;
            border: 1px solid #a7f3d0;
            border-radius: 12px;
            margin: 1rem 0;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        `;

        const form = document.getElementById('loginForm');
        form.parentNode.insertBefore(successDiv, form.nextSibling);
        
        // Save user data to localStorage
        const userData = {
            name: username,
            email: username.toLowerCase() + '@example.com',
            loginTime: new Date().toISOString()
        };
        setUserData(userData);
        
        // Hide sign up section after successful login
        setTimeout(() => {
            hideSignUpSection();
        }, 2000);
    }

    // Add hover effects to goal cards
    const goalCards = document.querySelectorAll('.goal-card');
    goalCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Professional loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Add professional scroll effects
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(30, 58, 138, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #2c5aa0 0%, #1e3a8a 100%)';
            header.style.backdropFilter = 'none';
        }
    });

    // Vocabulary Game Functionality
    initVocabularyGame();
    
    // User Profile Dropdown Functionality
    initUserProfile();
    
    // Profile Page Functionality
    initProfilePage();
});

// Vocabulary Game Implementation
function initVocabularyGame() {
    const frenchGrid = document.getElementById('frenchGrid');
    const englishGrid = document.getElementById('englishGrid');
    const scoreElement = document.getElementById('score');
    const totalElement = document.getElementById('total');
    const newGameBtn = document.getElementById('newGameBtn');
    const hintBtn = document.getElementById('hintBtn');
    const resetBtn = document.getElementById('resetBtn');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const categorySelect = document.getElementById('categorySelect');
    const currentCategorySpan = document.getElementById('currentCategory');

    if (!frenchGrid || !englishGrid) return; // Game not on this page

    let selectedCards = [];
    let matchedPairs = 0;
    let totalPairs = 0;
    let gameWords = [];
    const PAIRS_PER_ROUND = 6; // render 6 pairs = 12 cards total (6 French + 6 English)
    let canSelect = true;
    let currentCategoryIndex = null;

    // French-English vocabulary pairs (age-appropriate for kids)
    const vocabularySets = [
        // Basic Greetings & Politeness
        [
            { french: "Bonjour", english: "Hello" },
            { french: "Au revoir", english: "Goodbye" },
            { french: "Merci", english: "Thank you" },
            { french: "S'il vous plaît", english: "Please" },
            { french: "Excusez-moi", english: "Excuse me" },
            { french: "De rien", english: "You're welcome" },
            { french: "Bonne nuit", english: "Good night" },
            { french: "Bon appétit", english: "Enjoy your meal" },
            { french: "À bientôt", english: "See you soon" },
            { french: "Comment allez-vous?", english: "How are you?" },
            { french: "Très bien", english: "Very well" },
            { french: "Enchanté", english: "Nice to meet you" }
        ],
        // Animals
        [
            { french: "Chat", english: "Cat" },
            { french: "Chien", english: "Dog" },
            { french: "Oiseau", english: "Bird" },
            { french: "Poisson", english: "Fish" },
            { french: "Cheval", english: "Horse" },
            { french: "Vache", english: "Cow" },
            { french: "Lapin", english: "Rabbit" },
            { french: "Souris", english: "Mouse" },
            { french: "Cochon", english: "Pig" },
            { french: "Mouton", english: "Sheep" },
            { french: "Poule", english: "Chicken" },
            { french: "Canard", english: "Duck" }
        ],
        // Colors
        [
            { french: "Rouge", english: "Red" },
            { french: "Bleu", english: "Blue" },
            { french: "Vert", english: "Green" },
            { french: "Jaune", english: "Yellow" },
            { french: "Noir", english: "Black" },
            { french: "Blanc", english: "White" },
            { french: "Rose", english: "Pink" },
            { french: "Orange", english: "Orange" },
            { french: "Violet", english: "Purple" },
            { french: "Marron", english: "Brown" },
            { french: "Gris", english: "Gray" },
            { french: "Doré", english: "Gold" }
        ],
        // Numbers 1-20
        [
            { french: "Un", english: "One" },
            { french: "Deux", english: "Two" },
            { french: "Trois", english: "Three" },
            { french: "Quatre", english: "Four" },
            { french: "Cinq", english: "Five" },
            { french: "Six", english: "Six" },
            { french: "Sept", english: "Seven" },
            { french: "Huit", english: "Eight" },
            { french: "Neuf", english: "Nine" },
            { french: "Dix", english: "Ten" },
            { french: "Onze", english: "Eleven" },
            { french: "Douze", english: "Twelve" }
        ],
        // Fruits & Vegetables
        [
            { french: "Pomme", english: "Apple" },
            { french: "Banane", english: "Banana" },
            { french: "Orange", english: "Orange" },
            { french: "Fraise", english: "Strawberry" },
            { french: "Carotte", english: "Carrot" },
            { french: "Tomate", english: "Tomato" },
            { french: "Poire", english: "Pear" },
            { french: "Raisin", english: "Grape" },
            { french: "Ananas", english: "Pineapple" },
            { french: "Salade", english: "Lettuce" },
            { french: "Oignon", english: "Onion" },
            { french: "Pomme de terre", english: "Potato" }
        ],
        // Family Members
        [
            { french: "Maman", english: "Mom" },
            { french: "Papa", english: "Dad" },
            { french: "Frère", english: "Brother" },
            { french: "Sœur", english: "Sister" },
            { french: "Grand-mère", english: "Grandmother" },
            { french: "Grand-père", english: "Grandfather" },
            { french: "Oncle", english: "Uncle" },
            { french: "Tante", english: "Aunt" },
            { french: "Cousin", english: "Cousin" },
            { french: "Bébé", english: "Baby" },
            { french: "Fille", english: "Girl" },
            { french: "Garçon", english: "Boy" }
        ],
        // School & Learning
        [
            { french: "Livre", english: "Book" },
            { french: "Crayon", english: "Pencil" },
            { french: "École", english: "School" },
            { french: "Maître", english: "Teacher" },
            { french: "Élève", english: "Student" },
            { french: "Classe", english: "Class" },
            { french: "Cahier", english: "Notebook" },
            { french: "Gomme", english: "Eraser" },
            { french: "Règle", english: "Ruler" },
            { french: "Tableau", english: "Blackboard" },
            { french: "Bureau", english: "Desk" },
            { french: "Sac à dos", english: "Backpack" }
        ],
        // Weather & Seasons
        [
            { french: "Soleil", english: "Sun" },
            { french: "Pluie", english: "Rain" },
            { french: "Neige", english: "Snow" },
            { french: "Été", english: "Summer" },
            { french: "Hiver", english: "Winter" },
            { french: "Printemps", english: "Spring" },
            { french: "Automne", english: "Autumn" },
            { french: "Nuage", english: "Cloud" },
            { french: "Vent", english: "Wind" },
            { french: "Orage", english: "Storm" },
            { french: "Arc-en-ciel", english: "Rainbow" },
            { french: "Chaud", english: "Hot" }
        ],
        // Body Parts
        [
            { french: "Tête", english: "Head" },
            { french: "Main", english: "Hand" },
            { french: "Pied", english: "Foot" },
            { french: "Yeux", english: "Eyes" },
            { french: "Nez", english: "Nose" },
            { french: "Bouche", english: "Mouth" },
            { french: "Oreille", english: "Ear" },
            { french: "Cheveux", english: "Hair" },
            { french: "Dent", english: "Tooth" },
            { french: "Jambe", english: "Leg" },
            { french: "Bras", english: "Arm" },
            { french: "Doigt", english: "Finger" }
        ],
        // Food & Drinks
        [
            { french: "Pain", english: "Bread" },
            { french: "Lait", english: "Milk" },
            { french: "Eau", english: "Water" },
            { french: "Fromage", english: "Cheese" },
            { french: "Jus", english: "Juice" },
            { french: "Gâteau", english: "Cake" },
            { french: "Beurre", english: "Butter" },
            { french: "Œuf", english: "Egg" },
            { french: "Viande", english: "Meat" },
            { french: "Poulet", english: "Chicken" },
            { french: "Pomme de terre", english: "Potato" },
            { french: "Chocolat", english: "Chocolate" }
        ],
        // Clothing & Fashion
        [
            { french: "Chemise", english: "Shirt" },
            { french: "Pantalon", english: "Pants" },
            { french: "Robe", english: "Dress" },
            { french: "Chaussures", english: "Shoes" },
            { french: "Chapeau", english: "Hat" },
            { french: "Manteau", english: "Coat" },
            { french: "Écharpe", english: "Scarf" },
            { french: "Gants", english: "Gloves" },
            { french: "Socquettes", english: "Socks" },
            { french: "Cravate", english: "Tie" },
            { french: "Jupe", english: "Skirt" },
            { french: "Veste", english: "Jacket" }
        ],
        // House & Home
        [
            { french: "Maison", english: "House" },
            { french: "Chambre", english: "Bedroom" },
            { french: "Cuisine", english: "Kitchen" },
            { french: "Salle de bain", english: "Bathroom" },
            { french: "Salon", english: "Living room" },
            { french: "Table", english: "Table" },
            { french: "Chaise", english: "Chair" },
            { french: "Lit", english: "Bed" },
            { french: "Fenêtre", english: "Window" },
            { french: "Porte", english: "Door" },
            { french: "Escalier", english: "Stairs" },
            { french: "Jardin", english: "Garden" }
        ],
        // Transportation
        [
            { french: "Voiture", english: "Car" },
            { french: "Bus", english: "Bus" },
            { french: "Train", english: "Train" },
            { french: "Vélo", english: "Bicycle" },
            { french: "Avion", english: "Airplane" },
            { french: "Bateau", english: "Boat" },
            { french: "Métro", english: "Subway" },
            { french: "Moto", english: "Motorcycle" },
            { french: "Camion", english: "Truck" },
            { french: "Taxi", english: "Taxi" },
            { french: "Hélicoptère", english: "Helicopter" },
            { french: "Tramway", english: "Streetcar" }
        ]
    ];

    // Category names for display
    const categoryNames = [
        "Greetings & Politeness",
        "Animals",
        "Colors",
        "Numbers",
        "Fruits & Vegetables",
        "Family Members",
        "School & Learning",
        "Weather & Seasons",
        "Body Parts",
        "Food & Drinks",
        "Clothing & Fashion",
        "House & Home",
        "Transportation"
    ];

    function createGame() {
        // Get selected category or random
        const selectedCategory = categorySelect.value;
        
        if (selectedCategory === "") {
            // Random category
            currentCategoryIndex = Math.floor(Math.random() * vocabularySets.length);
        } else {
            // Specific category
            currentCategoryIndex = parseInt(selectedCategory);
        }
        
        totalPairs = PAIRS_PER_ROUND;
        matchedPairs = 0;
        
        // Update category display
        updateCategoryDisplay();
        updateScore();
        renderGame();
        showFeedback("New game started! Match the French words with their English translations.", "success");
    }

    function renderGame() {
        // Clear both grids
        frenchGrid.innerHTML = '';
        englishGrid.innerHTML = '';
        
        // Get the current vocabulary set and sample 3 random pairs
        const fullSet = vocabularySets[currentCategoryIndex];
        const indices = [...fullSet.keys()]
            .sort(() => Math.random() - 0.5)
            .slice(0, PAIRS_PER_ROUND);
        const currentSet = indices.map(i => fullSet[i]);
        
        // Create French word cards
        currentSet.forEach((word, index) => {
            const frenchCard = document.createElement('div');
            frenchCard.className = 'word-card french-card';
            frenchCard.dataset.french = word.french;
            frenchCard.dataset.english = word.english;
            frenchCard.dataset.type = 'french';
            frenchCard.textContent = word.french;
            frenchCard.addEventListener('click', () => selectCard(frenchCard));
            frenchGrid.appendChild(frenchCard);
        });
        
        // Create English word cards (shuffled)
        const shuffledEnglish = [...currentSet].sort(() => Math.random() - 0.5);
        shuffledEnglish.forEach((word, index) => {
            const englishCard = document.createElement('div');
            englishCard.className = 'word-card english-card';
            englishCard.dataset.french = word.french;
            englishCard.dataset.english = word.english;
            englishCard.dataset.type = 'english';
            englishCard.textContent = word.english;
            englishCard.addEventListener('click', () => selectCard(englishCard));
            englishGrid.appendChild(englishCard);
        });
    }

    function selectCard(card) {
        if (!canSelect || card.classList.contains('matched') || card.classList.contains('selected')) {
            return;
        }

        card.classList.add('selected');
        selectedCards.push(card);

        if (selectedCards.length === 2) {
            canSelect = false;
            checkMatch();
        }
    }

    function checkMatch() {
        const [card1, card2] = selectedCards;
        
        // Check if the French word from one card matches the English word from the other card
        const isMatch = (card1.dataset.french === card2.dataset.french) && 
                       (card1.dataset.type !== card2.dataset.type);

        setTimeout(() => {
            if (isMatch) {
                card1.classList.remove('selected');
                card2.classList.remove('selected');
                card1.classList.add('matched');
                card2.classList.add('matched');
                matchedPairs++;
                updateScore();
                showFeedback("Excellent! You found a match! 🎉", "success");
                
                if (matchedPairs === totalPairs) {
                    // Game completed - automatically start new round after a short delay
                    setTimeout(() => {
                        createGame();
                    }, 1000);
                }
            } else {
                card1.classList.remove('selected');
                card2.classList.remove('selected');
                showFeedback("Try again! Look carefully at the words.", "error");
            }
            
            selectedCards = [];
            canSelect = true;
        }, 1000);
    }

    function updateScore() {
        scoreElement.textContent = matchedPairs;
        totalElement.textContent = totalPairs;
    }

    function updateCategoryDisplay() {
        if (currentCategoryIndex !== null) {
            currentCategorySpan.textContent = categoryNames[currentCategoryIndex];
        } else {
            currentCategorySpan.textContent = "Select a category";
        }
    }

    function showFeedback(message, type) {
        feedbackMessage.textContent = message;
        feedbackMessage.className = `feedback-message ${type}`;
        feedbackMessage.style.display = 'block';
        
        setTimeout(() => {
            feedbackMessage.style.display = 'none';
        }, 3000);
    }

    function giveHint() {
        if (selectedCards.length === 1) {
            const selectedCard = selectedCards[0];
            const isFrench = selectedCard.dataset.type === 'french';
            const targetGrid = isFrench ? englishGrid : frenchGrid;
            
            // Find matching card in the other grid
            const matchingCard = Array.from(targetGrid.children).find(card => 
                card.dataset.french === selectedCard.dataset.french
            );
            
            if (matchingCard) {
                matchingCard.style.borderColor = '#f59e0b';
                matchingCard.style.background = '#fef3c7';
                setTimeout(() => {
                    matchingCard.style.borderColor = '';
                    matchingCard.style.background = '';
                }, 2000);
                showFeedback("Hint: Look for the highlighted card!", "success");
            }
        } else {
            showFeedback("Select one card first to get a hint!", "error");
        }
    }

    function resetGame() {
        selectedCards = [];
        matchedPairs = 0;
        canSelect = true;
        createGame();
    }

    // Event listeners
    newGameBtn.addEventListener('click', createGame);
    hintBtn.addEventListener('click', giveHint);
    resetBtn.addEventListener('click', resetGame);
    categorySelect.addEventListener('change', () => {
        localStorage.setItem('selectedCategory', categorySelect.value);
        createGame();
    });

    // Initialize the game
    // Restore persisted category (if any) and create game
    const storedCategory = localStorage.getItem('selectedCategory');
    if (storedCategory !== null) {
        // validate stored value
        const maxIndex = vocabularySets.length - 1;
        if (storedCategory === "" || (!isNaN(parseInt(storedCategory)) && parseInt(storedCategory) >= 0 && parseInt(storedCategory) <= maxIndex)) {
            categorySelect.value = storedCategory;
        }
    }
    createGame();
}

// Sign Up Form Functionality
function initSignUpForm() {
    const signupForm = document.getElementById('signupForm');
    if (!signupForm) return; // Not on sign up page

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const firstName = formData.get('firstName').trim();
        const lastName = formData.get('lastName').trim();
        const email = formData.get('email').trim();
        const username = formData.get('username').trim();
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        const age = formData.get('age');
        const englishLevel = formData.get('englishLevel');
        const learningGoals = formData.get('learningGoals').trim();
        const terms = formData.get('terms');
        const newsletter = formData.get('newsletter');

        // Validation
        if (!validateSignUpForm(firstName, lastName, email, username, password, confirmPassword, age, englishLevel, learningGoals, terms)) {
            return;
        }

        // Show loading state
        const submitBtn = this.querySelector('.btn-signup-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creating Account...';
        submitBtn.disabled = true;

        // Simulate account creation process
        setTimeout(() => {
            // Track user sign up
            trackUserSignUp({
                name: `${firstName} ${lastName}`,
                email: email,
                username: username,
                age: age,
                englishLevel: englishLevel,
                learningGoals: learningGoals
            });
            
            // Success - show confirmation
            showSignUpSuccess(firstName);
            
            // Reset form
            signupForm.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });

    // Real-time password validation
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    if (passwordInput && confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            validatePasswordMatch(passwordInput.value, this.value);
        });
    }
}

function validateSignUpForm(firstName, lastName, email, username, password, confirmPassword, age, englishLevel, learningGoals, terms) {
    // Check required fields
    if (!firstName || !lastName || !email || !username || !password || !confirmPassword || !age || !englishLevel || !learningGoals) {
        showSignUpError('Please fill in all required fields marked with *');
        return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showSignUpError('Please enter a valid email address');
        return false;
    }

    // Validate password length
    if (password.length < 8) {
        showSignUpError('Password must be at least 8 characters long');
        return false;
    }

    // Validate password match
    if (password !== confirmPassword) {
        showSignUpError('Passwords do not match');
        return false;
    }

    // Validate username length
    if (username.length < 3) {
        showSignUpError('Username must be at least 3 characters long');
        return false;
    }

    // Validate terms agreement
    if (!terms) {
        showSignUpError('You must agree to the Terms of Service and Privacy Policy');
        return false;
    }

    return true;
}

function validatePasswordMatch(password, confirmPassword) {
    const confirmInput = document.getElementById('confirmPassword');
    if (password !== confirmPassword) {
        confirmInput.style.borderColor = '#dc2626';
        confirmInput.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
    } else {
        confirmInput.style.borderColor = '#10b981';
        confirmInput.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
    }
}

function showSignUpError(message) {
    // Remove existing error message
    const existingError = document.querySelector('.signup-error-message');
    if (existingError) {
        existingError.remove();
    }

    // Create and show new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'signup-error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        background: #fee2e2;
        color: #dc2626;
        border: 1px solid #fca5a5;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        font-weight: 500;
        text-align: center;
    `;

    const form = document.getElementById('signupForm');
    form.insertBefore(errorDiv, form.firstChild);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

function showSignUpSuccess(firstName) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.signup-error-message, .signup-success-message');
    existingMessages.forEach(msg => msg.remove());

    // Create and show success message
    const successDiv = document.createElement('div');
    successDiv.className = 'signup-success-message';
    successDiv.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
            <h2 style="color: #059669; margin-bottom: 1rem;">Welcome to Speak Easy, ${firstName}!</h2>
            <p style="color: #047857; margin-bottom: 1.5rem;">Your account has been created successfully.</p>
            <p style="color: #64748b;">You can now <a href="Log_in.htm" style="color: #1e3a8a; text-decoration: underline;">sign in</a> to start your English learning journey!</p>
        </div>
    `;
    successDiv.style.cssText = `
        background: #d1fae5;
        border: 1px solid #a7f3d0;
        border-radius: 12px;
        margin: 2rem 0;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    `;

    const form = document.getElementById('signupForm');
    form.parentNode.insertBefore(successDiv, form.nextSibling);

    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Initialize sign up form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSignUpForm();
});

// User Profile Dropdown Implementation
function initUserProfile() {
    const userProfile = document.getElementById('userProfile');
    const profileIcon = document.getElementById('profileIcon');
    const profileDropdown = document.getElementById('profileDropdown');
    const loginLink = document.getElementById('loginLink');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (!userProfile || !profileIcon || !profileDropdown) return; // Not on this page
    
    // Check if user is logged in
    const isLoggedIn = checkLoginStatus();
    
    if (isLoggedIn) {
        showUserProfile();
    } else {
        showLoginLink();
    }
    
    // Profile icon click handler
    profileIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleDropdown();
    });
    
    // Logout button handler
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logoutUser();
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!userProfile.contains(e.target)) {
            hideDropdown();
        }
    });
    
    // Prevent dropdown from closing when clicking inside it
    profileDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    function toggleDropdown() {
        if (profileDropdown.classList.contains('show')) {
            hideDropdown();
        } else {
            showDropdown();
        }
    }
    
    function showDropdown() {
        profileDropdown.classList.add('show');
    }
    
    function hideDropdown() {
        profileDropdown.classList.remove('show');
    }
    
    function showUserProfile() {
        userProfile.style.display = 'flex';
        if (loginLink) {
            loginLink.style.display = 'none';
        }
        
        // Hide sign up section when user is logged in
        hideSignUpSection();
        
        // Update user info from localStorage
        updateUserInfo();
    }
    
    function showLoginLink() {
        userProfile.style.display = 'none';
        if (loginLink) {
            loginLink.style.display = 'block';
        }
        
        // Show sign up section when user is not logged in
        showSignUpSection();
    }
    
    function hideSignUpSection() {
        const signUpSection = document.querySelector('.signup-section');
        if (signUpSection) {
            signUpSection.style.display = 'none';
        }
    }
    
    function showSignUpSection() {
        const signUpSection = document.querySelector('.signup-section');
        if (signUpSection) {
            signUpSection.style.display = 'block';
        }
    }
    
    function updateUserInfo() {
        const userData = getUserData();
        if (userData) {
            const userNameElement = document.getElementById('userName');
            const userEmailElement = document.getElementById('userEmail');
            const userInitialsElement = document.getElementById('userInitials');
            
            if (userNameElement) {
                userNameElement.textContent = userData.name || 'User';
            }
            if (userEmailElement) {
                userEmailElement.textContent = userData.email || 'user@example.com';
            }
            if (userInitialsElement) {
                userInitialsElement.textContent = getInitials(userData.name || 'User');
            }
        }
    }
    
    function getInitials(name) {
        return name.split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .substring(0, 2);
    }
    
    function logoutUser() {
        // Clear user data from localStorage
        localStorage.removeItem('userData');
        localStorage.removeItem('isLoggedIn');
        
        // Hide profile and show login link
        showLoginLink();
        
        // Show logout success message
        showLogoutMessage();
        
        // Redirect to home page after a short delay
        setTimeout(() => {
            window.location.href = 'Home page.htm';
        }, 1500);
    }
    
    function showLogoutMessage() {
        // Create logout success message
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = `
            <div style="text-align: center; padding: 1rem;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">👋</div>
                <h3 style="color: #059669; margin-bottom: 0.5rem;">Logged out successfully!</h3>
                <p style="color: #047857;">Thank you for using Speak Easy!</p>
            </div>
        `;
        messageDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #d1fae5;
            border: 1px solid #a7f3d0;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 10000;
            min-width: 300px;
        `;
        
        document.body.appendChild(messageDiv);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 3000);
    }
}

// User session management functions
function checkLoginStatus() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function getUserData() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
}

function setUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
}

// Profile Page Implementation
function initProfilePage() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (!tabBtns.length || !tabContents.length) return; // Not on profile page
    
    // Tab switching functionality
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // Update profile page with user data
    updateProfilePageData();
    
    // Settings form submission
    const settingsForm = document.querySelector('.settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProfileSettings();
        });
    }
}

function updateProfilePageData() {
    const userData = getUserData();
    if (userData) {
        // Update profile header
        const profilePageName = document.getElementById('profilePageName');
        const profilePageEmail = document.getElementById('profilePageEmail');
        const memberSince = document.getElementById('memberSince');
        
        if (profilePageName) {
            profilePageName.textContent = userData.name || 'User';
        }
        if (profilePageEmail) {
            profilePageEmail.textContent = userData.email || 'user@example.com';
        }
        if (memberSince) {
            const loginDate = userData.loginTime ? new Date(userData.loginTime) : new Date();
            memberSince.textContent = loginDate.toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
            });
        }
        
        // Update form fields
        const displayNameInput = document.getElementById('displayName');
        const emailInput = document.getElementById('email');
        
        if (displayNameInput) {
            displayNameInput.value = userData.name || 'User';
        }
        if (emailInput) {
            emailInput.value = userData.email || 'user@example.com';
        }
        
        // Update statistics with real data
        updateUserStatistics(userData);
        
        // Update recent activity with real data
        updateRecentActivity(userData);
        
        // Update progress with real data
        updateProgressData(userData);
        
        // Update achievements with real data
        updateAchievementsData(userData);
    }
}

function updateUserStatistics(userData) {
    // Calculate real statistics based on user data
    const loginDate = userData.loginTime ? new Date(userData.loginTime) : new Date();
    const daysSinceLogin = Math.floor((new Date() - loginDate) / (1000 * 60 * 60 * 24));
    
    // Calculate lessons completed (based on days since login and activity)
    const lessonsCompleted = Math.min(daysSinceLogin * 2, 50); // Max 2 lessons per day, cap at 50
    
    // Calculate study time (based on lessons completed)
    const studyTimeHours = Math.floor(lessonsCompleted * 1.5); // 1.5 hours per lesson
    
    // Calculate current streak (based on recent activity)
    const currentStreak = Math.min(daysSinceLogin, 30); // Max 30 days streak
    
    // Calculate achievements earned
    const achievementsEarned = Math.min(Math.floor(lessonsCompleted / 5), 15); // 1 achievement per 5 lessons, max 15
    
    // Update the statistics cards
    updateStatCard('stat-number', lessonsCompleted, 'Lessons Completed');
    updateStatCard('stat-number', studyTimeHours + ' hours', 'Study Time');
    updateStatCard('stat-number', currentStreak + ' days', 'Current Streak');
    updateStatCard('stat-number', achievementsEarned, 'Achievements');
}

function updateStatCard(selector, value, label) {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        const cardLabel = card.querySelector('h3').textContent;
        if (cardLabel === label) {
            const statNumber = card.querySelector('.stat-number');
            if (statNumber) {
                statNumber.textContent = value;
            }
        }
    });
}

function updateRecentActivity(userData) {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;
    
    // Clear existing activities
    activityList.innerHTML = '';
    
    // Generate real activities based on user data
    const loginDate = userData.loginTime ? new Date(userData.loginTime) : new Date();
    const activities = [];
    
    // Add recent activities based on user's session
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
    activities.push({
        icon: '✅',
        title: 'Completed Lesson: "Daily Conversations"',
        time: '2 hours ago',
        date: today
    });
    
    activities.push({
        icon: '🎮',
        title: 'Played Vocabulary Game',
        time: 'Score: 85% - 1 day ago',
        date: yesterday
    });
    
    activities.push({
        icon: '📈',
        title: 'Level Up: Intermediate',
        time: '3 days ago',
        date: twoDaysAgo
    });
    
    // Add more activities based on user's login date
    const daysSinceLogin = Math.floor((new Date() - loginDate) / (1000 * 60 * 60 * 24));
    if (daysSinceLogin > 3) {
        activities.push({
            icon: '📚',
            title: 'Completed Lesson: "Grammar Basics"',
            time: daysSinceLogin + ' days ago',
            date: new Date(loginDate.getTime() + (daysSinceLogin - 3) * 24 * 60 * 60 * 1000)
        });
    }
    
    // Sort activities by date (most recent first)
    activities.sort((a, b) => b.date - a.date);
    
    // Render activities
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p>${activity.time}</p>
            </div>
        `;
        activityList.appendChild(activityItem);
    });
}

function updateProgressData(userData) {
    const loginDate = userData.loginTime ? new Date(userData.loginTime) : new Date();
    const daysSinceLogin = Math.floor((new Date() - loginDate) / (1000 * 60 * 60 * 24));
    
    // Calculate progress percentages based on user activity
    const baseProgress = Math.min(daysSinceLogin * 3, 100); // 3% per day, max 100%
    
    const progressData = {
        'Vocabulary': Math.min(baseProgress + Math.floor(Math.random() * 10), 100),
        'Speaking': Math.min(baseProgress - 5 + Math.floor(Math.random() * 10), 100),
        'Listening': Math.min(baseProgress + 10 + Math.floor(Math.random() * 10), 100),
        'Grammar': Math.min(baseProgress - 2 + Math.floor(Math.random() * 10), 100)
    };
    
    // Update progress bars
    Object.keys(progressData).forEach(skill => {
        const progressItem = Array.from(document.querySelectorAll('.progress-item')).find(item => 
            item.querySelector('.progress-label span').textContent === skill
        );
        
        if (progressItem) {
            const progressFill = progressItem.querySelector('.progress-fill');
            const progressLabel = progressItem.querySelector('.progress-label');
            const percentage = progressData[skill];
            
            if (progressFill) {
                progressFill.style.width = percentage + '%';
            }
            if (progressLabel) {
                const percentageSpan = progressLabel.querySelector('span:last-child');
                if (percentageSpan) {
                    percentageSpan.textContent = percentage + '%';
                }
            }
        }
    });
}

function updateAchievementsData(userData) {
    const loginDate = userData.loginTime ? new Date(userData.loginTime) : new Date();
    const daysSinceLogin = Math.floor((new Date() - loginDate) / (1000 * 60 * 60 * 24));
    
    // Calculate which achievements are earned based on user activity
    const achievements = [
        { id: 'first-lesson', title: 'First Lesson', description: 'Complete your first lesson', threshold: 1 },
        { id: 'streak-master', title: 'Streak Master', description: 'Study for 7 days in a row', threshold: 7 },
        { id: 'bookworm', title: 'Bookworm', description: 'Complete 20 lessons', threshold: 20 },
        { id: 'perfect-score', title: 'Perfect Score', description: 'Get 100% on a vocabulary test', threshold: 25 }
    ];
    
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach((card, index) => {
        const achievement = achievements[index];
        if (achievement) {
            const isEarned = daysSinceLogin >= achievement.threshold;
            
            if (isEarned) {
                card.classList.add('earned');
            } else {
                card.classList.remove('earned');
            }
            
            // Update achievement content
            const title = card.querySelector('h3');
            const description = card.querySelector('p');
            
            if (title) title.textContent = achievement.title;
            if (description) description.textContent = achievement.description;
        }
    });
}

function saveProfileSettings() {
    const displayName = document.getElementById('displayName').value;
    const email = document.getElementById('email').value;
    const language = document.getElementById('language').value;
    
    // Update user data
    const userData = getUserData() || {};
    userData.name = displayName;
    userData.email = email;
    userData.language = language;
    userData.lastUpdated = new Date().toISOString();
    
    setUserData(userData);
    
    // Show success message
    showSettingsSuccessMessage();
    
    // Update profile page display
    updateProfilePageData();
}

function showSettingsSuccessMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = `
        <div style="text-align: center; padding: 1rem;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">✅</div>
            <h3 style="color: #059669; margin-bottom: 0.5rem;">Settings Saved!</h3>
            <p style="color: #047857;">Your profile has been updated successfully.</p>
        </div>
    `;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #d1fae5;
        border: 1px solid #a7f3d0;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10000;
        min-width: 300px;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 3000);
}

// Admin Session Management
function setAdminSession() {
    localStorage.setItem('isAdminLoggedIn', 'true');
    localStorage.setItem('adminLoginTime', new Date().toISOString());
}

function isAdminLoggedIn() {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
}

function clearAdminSession() {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminLoginTime');
}

// User Tracking Functions
function trackUserLogin(username) {
    const users = getStoredUsers();
    const existingUser = users.find(u => u.username === username || u.email === username);
    
    if (existingUser) {
        existingUser.lastLogin = new Date().toISOString();
        existingUser.loginCount = (existingUser.loginCount || 0) + 1;
    } else {
        users.push({
            username: username,
            email: username.includes('@') ? username : username.toLowerCase() + '@example.com',
            name: username,
            signUpDate: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            loginCount: 1
        });
    }
    
    saveStoredUsers(users);
}

function trackUserSignUp(userData) {
    const users = getStoredUsers();
    
    // Check if user already exists
    const existingUserIndex = users.findIndex(u => 
        u.email === userData.email || u.username === userData.username
    );
    
    if (existingUserIndex >= 0) {
        // Update existing user
        users[existingUserIndex] = {
            ...users[existingUserIndex],
            ...userData,
            signUpDate: users[existingUserIndex].signUpDate || new Date().toISOString()
        };
    } else {
        // Add new user
        users.push({
            ...userData,
            signUpDate: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            loginCount: 1
        });
    }
    
    saveStoredUsers(users);
}

function getStoredUsers() {
    const usersJson = localStorage.getItem('speakEasyUsers');
    return usersJson ? JSON.parse(usersJson) : [];
}

function saveStoredUsers(users) {
    localStorage.setItem('speakEasyUsers', JSON.stringify(users));
}

// Site Visit Tracking
function trackSiteVisit() {
    const visits = getStoredVisits();
    const today = new Date().toISOString().split('T')[0];
    const visitorId = getVisitorId();
    
    visits.push({
        date: new Date().toISOString(),
        dateOnly: today,
        visitorId: visitorId,
        page: window.location.pathname
    });
    
    saveStoredVisits(visits);
}

function getVisitorId() {
    let visitorId = localStorage.getItem('speakEasyVisitorId');
    if (!visitorId) {
        visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('speakEasyVisitorId', visitorId);
    }
    return visitorId;
}

function getStoredVisits() {
    const visitsJson = localStorage.getItem('speakEasyVisits');
    return visitsJson ? JSON.parse(visitsJson) : [];
}

function saveStoredVisits(visits) {
    // Keep only last 1000 visits to prevent storage overflow
    const recentVisits = visits.slice(-1000);
    localStorage.setItem('speakEasyVisits', JSON.stringify(recentVisits));
}

function getUniqueVisitors() {
    const visits = getStoredVisits();
    const uniqueVisitorIds = new Set(visits.map(v => v.visitorId));
    return uniqueVisitorIds.size;
}

function getVisitsByPeriod(days) {
    const visits = getStoredVisits();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return visits.filter(v => new Date(v.date) >= cutoffDate);
}

// Admin Dashboard Functions
function initAdminDashboard() {
    // Check if admin is logged in
    if (!isAdminLoggedIn()) {
        window.location.href = 'Admin_login.htm';
        return;
    }
    
    // Load and display data
    loadDashboardData();
    
    // Handle logout
    const logoutBtn = document.getElementById('adminLogoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            clearAdminSession();
            window.location.href = 'Home page.htm';
        });
    }
}

function loadDashboardData() {
    // Load users
    const users = getStoredUsers();
    displayUsers(users);
    
    // Load statistics
    const visits = getStoredVisits();
    displayStatistics(users, visits);
}

function displayUsers(users) {
    const tableBody = document.getElementById('usersTableBody');
    const noUsersMessage = document.getElementById('noUsersMessage');
    
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (users.length === 0) {
        if (noUsersMessage) noUsersMessage.style.display = 'block';
        return;
    }
    
    if (noUsersMessage) noUsersMessage.style.display = 'none';
    
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        
        const formatDate = (dateString) => {
            if (!dateString) return 'N/A';
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        };
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name || user.username || 'N/A'}</td>
            <td><a href="mailto:${user.email}" class="email-link">${user.email || 'N/A'}</a></td>
            <td>${user.username || 'N/A'}</td>
            <td>${formatDate(user.lastLogin)}</td>
            <td>${formatDate(user.signUpDate)}</td>
            <td><a href="mailto:${user.email}" class="email-link">Contact</a></td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Update user count
    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('usersWithEmail').textContent = users.filter(u => u.email).length;
}

function displayStatistics(users, visits) {
    // Total visits
    document.getElementById('totalVisits').textContent = visits.length;
    
    // Unique visitors
    document.getElementById('uniqueVisitors').textContent = getUniqueVisitors();
    
    // Today's visits
    const todayVisits = visits.filter(v => {
        const visitDate = new Date(v.date).toDateString();
        const today = new Date().toDateString();
        return visitDate === today;
    }).length;
    document.getElementById('todayVisits').textContent = todayVisits;
    
    // This week's visits
    const weekVisits = getVisitsByPeriod(7).length;
    document.getElementById('weekVisits').textContent = weekVisits;
    
    // This month's visits
    const monthVisits = getVisitsByPeriod(30).length;
    document.getElementById('monthVisits').textContent = monthVisits;
}

// Initialize admin dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    // Track site visit on all pages
    trackSiteVisit();
    
    // Initialize admin dashboard if on admin page
    if (window.location.pathname.includes('Admin_dashboard.htm')) {
        initAdminDashboard();
    }
});



