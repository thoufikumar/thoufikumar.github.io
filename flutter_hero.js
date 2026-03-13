// Flutter Portfolio Hero - Navigation Handler

document.addEventListener('DOMContentLoaded', () => {
    console.log('Flutter Portfolio Hero loaded');

    // Back button handler
    const backBtn = document.getElementById('flutter-back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            // Fade out before navigation
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease-in-out';

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);
        });
    }

    // =============================================
    // TERMINAL INTERACTION - Scoped Keyboard Events
    // =============================================
    const terminal = document.getElementById('terminal');
    const menuView = document.getElementById('menu-view');
    const menuItems = document.querySelectorAll('.menu-item');
    const contentViews = document.querySelectorAll('.terminal-content-view');
    const menuHint = document.querySelector('.menu-hint');
    const contentHint = document.querySelector('.content-hint');

    let currentSelection = 0;
    let isTerminalActive = false;
    let isInContentView = false;

    // Focus management
    if (terminal) {
        terminal.addEventListener('click', () => {
            terminal.focus();
            isTerminalActive = true;
        });

        terminal.addEventListener('blur', () => {
            isTerminalActive = false;
        });

        // Keyboard event handler (scoped to terminal)
        terminal.addEventListener('keydown', (e) => {
            if (!isTerminalActive) return;

            switch (e.key) {
                case 'ArrowUp':
                    if (!isInContentView) {
                        e.preventDefault();
                        moveSelectionUp();
                    }
                    break;
                case 'ArrowDown':
                    if (!isInContentView) {
                        e.preventDefault();
                        moveSelectionDown();
                    }
                    break;
                case 'Enter':
                    if (!isInContentView) {
                        e.preventDefault();
                        openSelectedContent();
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    if (isInContentView) {
                        returnToMenu();
                    }
                    break;
            }
        });
    }

    // Click outside handler
    document.addEventListener('click', (e) => {
        if (terminal && !terminal.contains(e.target)) {
            terminal.blur();
            isTerminalActive = false;
        }
    });

    // Navigation functions
    function moveSelectionUp() {
        if (currentSelection > 0) {
            currentSelection--;
            updateSelection();
        }
    }

    function moveSelectionDown() {
        if (currentSelection < menuItems.length - 1) {
            currentSelection++;
            updateSelection();
        }
    }

    function updateSelection() {
        menuItems.forEach((item, index) => {
            if (index === currentSelection) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    function openSelectedContent() {
        // Hide menu view
        menuView.style.display = 'none';

        // Show corresponding content view
        const contentView = document.getElementById(`content-${currentSelection}`);
        if (contentView) {
            contentView.style.display = 'block';
            isInContentView = true;

            // Apply typewriter effect to content list
            const contentList = contentView.querySelector('.content-list');
            if (contentList) {
                // Reset list items for typewriter effect
                const items = contentList.querySelectorAll('li');
                items.forEach((item, index) => {
                    const originalText = item.getAttribute('data-text') || item.textContent;
                    if (!item.getAttribute('data-text')) {
                        item.setAttribute('data-text', originalText);
                    }
                    item.textContent = '';

                    let charIndex = 0;
                    const delay = index * 200; // Stagger each item

                    setTimeout(() => {
                        const typeInterval = setInterval(() => {
                            if (charIndex < originalText.length) {
                                item.textContent += originalText.charAt(charIndex);
                                charIndex++;
                            } else {
                                clearInterval(typeInterval);
                            }
                        }, 30); // 30ms per character
                    }, delay);
                });
            }
        }

        // Toggle hints
        if (menuHint) menuHint.style.display = 'none';
        if (contentHint) contentHint.style.display = 'block';
    }

    function returnToMenu() {
        // Hide all content views
        contentViews.forEach(view => {
            view.style.display = 'none';
        });

        // Show menu view
        menuView.style.display = 'block';
        isInContentView = false;

        // Toggle hints
        if (menuHint) menuHint.style.display = 'block';
        if (contentHint) contentHint.style.display = 'none';
    }

    // =============================================
    // PROJECT DETAIL NAVIGATION & CAROUSEL
    // =============================================
    const projectData = {
        selfspace: {
            title: "SelfSpace",
            description: "A mental health wellness mobile application designed to support users through mood-based CBT assessments, guided exercises, journaling, and calming audio experiences.",
            keyFocus: ["Emotionally Safe UX", "Crisis Support & Clarity", "Privacy & User Trust"],
            techStack: ["Flutter with Dart", "Firebase Authentication", "SharedPreferences"],
            assetFolder: "selfspace_assets",
            mockupCount: 6
        },
        teshart: {
            title: "Teshart",
            description: "A custom art order management mobile application designed to help creators manage orders, customers, payments, and delivery status through a smooth end-to-end workflow.",
            keyFocus: ["Order Workflow", "Admin Control", "Operational Accuracy"],
            techStack: ["Flutter with Dart", "Firebase Firestore", "OAuth Authentication"],
            assetFolder: "teshart_assets",
            mockupCount: 5 // Reduced from 6 as requested
        },
        smartmeet: {
            title: "Smartmeet",
            description: "A meeting scheduler mobile application designed to help students and faculty manage appointments, availability, and confirmations, enabling a smooth and reliable scheduling workflow across academic environments.",
            keyFocus: ["Easy Booking", "Clear Scheduling", "Reduced Coordination"],
            techStack: ["Flutter with Dart", "Firebase Authentication", "Firebase CM"],
            assetFolder: "smartmeet_assets",
            mockupCount: 6
        },
        walley: {
            title: "Walley",
            description: "A personal finance mobile application designed to help users track expenses, manage budgets, and understand spending patterns through clear, behavior-aware financial insights.",
            keyFocus: ["Expense Tracking", "Budget Awareness", "Financial Insights"],
            techStack: ["Flutter with Dart", "Provider (State Management)", "OpenAI LLM Integration"],
            assetFolder: "walley_assets",
            mockupCount: 6
        }
    };

    const solutionsGrid = document.querySelector('.solutions-grid');
    const projectDetailScreen = document.getElementById('projectDetailScreen');
    const transitionOverlay = document.getElementById('transitionOverlay');
    const backButton = document.getElementById('backButton');
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselDots = document.getElementById('carouselDots');
    const prevSlide = document.getElementById('prevSlide');
    const nextSlide = document.getElementById('nextSlide');

    // Home sections to hide/show
    const homeSections = [
        document.querySelector('.flutter-hero'),
        document.querySelector('.passion-section'),
        document.querySelector('.terminal-section'),
        document.querySelector('.solutions-section'),
        document.querySelector('.footer-section')
    ].filter(Boolean); // Only keep elements that exist

    let currentProject = null;
    let currentSlide = 0;
    let isNavigating = false; // Guard to prevent overlapping transitions

    /**
     * Unified Navigation Handler
     * Handles the fade overlay, DOM swapping, and scrolling
     */
    function performNavigation(projectId, isBack = false) {
        if (isNavigating) return;
        isNavigating = true;

        if (!transitionOverlay || !projectDetailScreen) {
            isNavigating = false;
            return;
        }

        // 1. Fade to Black
        transitionOverlay.classList.add('active');

        setTimeout(() => {
            // 2. Perform DOM Swap and Scroll while screen is black
            if (projectId) {
                // Moving to Detail View
                populateProjectDetail(projectId);
                window.scrollTo(0, 0);

                homeSections.forEach(section => section.style.display = 'none');
                projectDetailScreen.style.display = 'block';

                setTimeout(() => {
                    projectDetailScreen.classList.add('active');
                }, 50);
            } else {
                // Moving back to Home
                projectDetailScreen.style.display = 'none';
                projectDetailScreen.classList.remove('active');

                homeSections.forEach(section => section.style.display = '');

                // Robust scroll to solutions
                const solutionsSection = document.querySelector('.solutions-section');
                if (solutionsSection) {
                    solutionsSection.scrollIntoView({ behavior: 'auto' });
                }
            }

            // 3. Fade back in
            setTimeout(() => {
                transitionOverlay.classList.remove('active');
                isNavigating = false;
            }, 100);
        }, 500);
    }

    function populateProjectDetail(projectId) {
        const data = projectData[projectId];
        if (!data || !carouselTrack || !carouselDots) return;

        currentProject = projectId;
        const detailTitle = document.getElementById('detailTitle');
        const detailDescription = document.getElementById('detailDescription');

        if (detailTitle) detailTitle.textContent = data.title;
        if (detailDescription) detailDescription.textContent = data.description;

        const keyFocusList = document.getElementById('detailKeyFocus');
        if (keyFocusList) {
            keyFocusList.innerHTML = data.keyFocus.map((item, index) => `<li>${index + 1}. ${item}</li>`).join('');
        }

        const techStackList = document.getElementById('detailTechStack');
        if (techStackList) {
            techStackList.innerHTML = data.techStack.map((item, index) => `<li>${index + 1}. ${item}</li>`).join('');
        }

        // Populate Carousel
        carouselTrack.innerHTML = '';
        carouselDots.innerHTML = '';
        for (let i = 1; i <= data.mockupCount; i++) {
            const img = document.createElement('img');
            img.src = `assets/flutter_assets/${data.assetFolder}/${i}.png`;
            img.alt = `${data.title} Mockup ${i}`;
            img.className = 'carousel-mockup';
            carouselTrack.appendChild(img);

            const dot = document.createElement('div');
            dot.className = `carousel-dot ${i === 1 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(i - 1));
            carouselDots.appendChild(dot);
        }
        currentSlide = 0;
        updateCarousel();
    }

    function updateCarousel() {
        if (!carouselTrack) return;
        const offset = -currentSlide * 100;
        carouselTrack.style.transform = `translateX(${offset}%)`;

        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    if (prevSlide) {
        prevSlide.addEventListener('click', () => {
            const count = projectData[currentProject].mockupCount;
            currentSlide = (currentSlide - 1 + count) % count;
            updateCarousel();
        });
    }

    if (nextSlide) {
        nextSlide.addEventListener('click', () => {
            const count = projectData[currentProject].mockupCount;
            currentSlide = (currentSlide + 1) % count;
            updateCarousel();
        });
    }

    function navigateToDetail(projectId) {
        if (isNavigating) return;

        // Push to history first
        history.pushState({ project: projectId }, '', `#${projectId}`);

        // Perform visual navigation
        performNavigation(projectId);
    }

    function navigateBack() {
        if (isNavigating) return;

        // Let the popstate listener or direct history jump handle it
        if (history.state && history.state.project) {
            history.back();
        } else {
            // If no history, just go home
            history.pushState(null, '', ' ');
            performNavigation(null, true);
        }
    }

    // Direct Click Listeners for Solution Cards
    const cards = document.querySelectorAll('.solution-card');
    cards.forEach(card => {
        card.addEventListener('click', function () {
            const projectId = this.getAttribute('data-project');
            if (projectId) navigateToDetail(projectId);
        });
    });

    if (backButton) {
        backButton.addEventListener('click', (e) => {
            e.preventDefault();
            navigateBack();
        });
    }

    // Robust History Handling (Browser Back/Forward)
    window.addEventListener('popstate', (e) => {
        const projectId = (e.state && e.state.project) ? e.state.project : null;
        performNavigation(projectId, !projectId);
    });

    // Deep Linking Support on Load
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && projectData[initialHash]) {
        // Instant load for initial deep link
        populateProjectDetail(initialHash);
        homeSections.forEach(section => section.style.display = 'none');
        projectDetailScreen.style.display = 'block';
        projectDetailScreen.classList.add('active');
        history.replaceState({ project: initialHash }, '', `#${initialHash}`);
    }

    // =============================================
    // CONTACT FORM SUBMISSION
    // =============================================
    // Initialize EmailJS
    emailjs.init('P4IRU_tKhRafcIuCE');

    const contactForm = document.getElementById('contactForm');
    const customNotification = document.getElementById('customNotification');

    // Function to show custom notification
    function showNotification() {
        customNotification.classList.add('show');

        // Auto-hide after 4 seconds
        setTimeout(() => {
            customNotification.classList.remove('show');
        }, 4000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validate message is not empty
            if (!message) {
                alert('Please enter a message');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Validate name
            if (!name) {
                alert('Please enter your name');
                return;
            }

            // Send email using EmailJS
            const templateParams = {
                from_name: name,
                from_email: email,
                message: message,
                to_email: 'thoufikumar1011@gmail.com'
            };

            emailjs.send('service_yx2486q', 'template_affirbh', templateParams)
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);

                    // Clear form
                    contactForm.reset();

                    // Show custom notification
                    showNotification();
                }, function (error) {
                    console.log('FAILED...', error);
                    alert('Failed to send message. Please try again.');
                });
        });
    }
});
