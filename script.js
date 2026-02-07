// About Section - Expand/Collapse Interaction
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.about-card');

    // Handle expand button clicks
    cards.forEach(card => {
        const expandBtn = card.querySelector('.card-expand-btn');
        const collapseBtn = card.querySelector('.card-collapse-btn');

        if (expandBtn) {
            expandBtn.addEventListener('click', () => {
                expandCard(card);
            });
        }

        if (collapseBtn) {
            collapseBtn.addEventListener('click', () => {
                collapseAllCards();
            });
        }
    });

    function expandCard(selectedCard) {
        // First, collapse any currently expanded card
        cards.forEach(card => {
            if (card === selectedCard) {
                // Expand the selected card
                card.classList.add('is-expanded');
                card.classList.remove('is-hidden');
            } else {
                // Hide other cards
                card.classList.remove('is-expanded');
                card.classList.add('is-hidden');
            }
        });
    }

    function collapseAllCards() {
        cards.forEach(card => {
            card.classList.remove('is-expanded');
            card.classList.remove('is-hidden');
        });
    }

    // =============================================
    // NAVIGATION SYSTEM
    // =============================================
    const mainSections = document.querySelectorAll('.hero, .about, .nav-gate');
    const caseStudiesView = document.getElementById('case-studies-view');
    const projectsView = document.getElementById('projects-view');
    const projectSmartMeetDetailView = document.getElementById('project-full-view-smartmeet');
    const smartmeetPreview = document.getElementById('smartmeet-preview');
    const navGateLinks = document.querySelectorAll('.nav-gate-link');
    const backBtn = document.getElementById('cs-back-btn');
    const projectsBackBtn = document.getElementById('projects-back-btn');
    const projectSmartMeetBackBtn = document.getElementById('project-smartmeet-back-btn');
    const previewBackBtn = document.getElementById('preview-back-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const smartmeetViewFullCaseStudyBtn = document.getElementById('smartmeet-view-case-study');

    // Navigation Gate Click Handlers
    navGateLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const navigateTo = link.dataset.navigate;

            if (navigateTo === 'case-studies') {
                showCaseStudies();
            } else if (navigateTo === 'projects') {
                showProjects();
            }
        });
    });

    // Back Button Handler (Case Studies → Main)
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            showMainView();
        });
    }

    // Projects Back Button Handler
    if (projectsBackBtn) {
        projectsBackBtn.addEventListener('click', () => {
            showMainViewFromProjects();
        });
    }

    // SmartMeet Project Detail Back Button Handler
    if (projectSmartMeetBackBtn) {
        projectSmartMeetBackBtn.addEventListener('click', () => {
            showProjectsFromDetail();
        });
    }

    // Project Item Click Handlers
    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.dataset.projectId;
            if (projectId === 'smartmeet-ui') {
                showProjectDetail('smartmeet');
            }
        });
    });

    // View Full Case Study from Project Detail
    if (smartmeetViewFullCaseStudyBtn) {
        smartmeetViewFullCaseStudyBtn.addEventListener('click', () => {
            showFullCaseStudyFromProject('smartmeet');
        });
    }

    function showProjects() {
        // Fade out
        document.body.style.opacity = '0';

        setTimeout(() => {
            // Hide main sections
            mainSections.forEach(section => {
                section.style.display = 'none';
            });

            // Show projects
            projectsView.style.display = 'block';

            // Reset scroll
            window.scrollTo(0, 0);

            // Fade in
            setTimeout(() => {
                document.body.style.opacity = '1';
                animateProjects();
            }, 50);
        }, 350);
    }

    function showMainViewFromProjects() {
        // Fade out
        document.body.style.opacity = '0';

        setTimeout(() => {
            // Hide projects
            projectsView.style.display = 'none';
            // Reset project animation state
            document.querySelectorAll('.project-item').forEach(item => {
                item.classList.remove('is-animated');
            });

            // Show main sections
            mainSections.forEach(section => {
                section.style.display = '';
            });

            // Reset scroll
            window.scrollTo(0, 0);

            // Fade in
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 50);
        }, 350);
    }

    function animateProjects() {
        const items = document.querySelectorAll('.project-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('is-animated');
            }, 100 * index);
        });
    }

    function showProjectDetail(projectId) {
        if (projectId === 'smartmeet') {
            // Fade out
            document.body.style.opacity = '0';

            setTimeout(() => {
                // Hide projects view
                projectsView.style.display = 'none';

                // Show detail view
                projectSmartMeetDetailView.style.display = 'block';

                // Reset scroll
                window.scrollTo(0, 0);

                // Fade in
                setTimeout(() => {
                    document.body.style.opacity = '1';
                    initScrollAnimations();
                }, 50);
            }, 350);
        }
    }

    function showProjectsFromDetail() {
        // Fade out
        document.body.style.opacity = '0';

        setTimeout(() => {
            // Hide detail view
            projectSmartMeetDetailView.style.display = 'none';

            // Show projects view
            projectsView.style.display = 'block';

            // Reset scroll
            window.scrollTo(0, 0);

            // Fade in
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 50);
        }, 350);
    }

    function showFullCaseStudyFromProject(projectId) {
        if (projectId === 'smartmeet') {
            // Fade out
            document.body.style.opacity = '0';

            setTimeout(() => {
                // Hide project detail
                projectSmartMeetDetailView.style.display = 'none';

                // Full Case Study display logic
                // Ensure the main sections are hidden first
                mainSections.forEach(section => section.style.display = 'none');
                projectsView.style.display = 'none';

                // Show Case Study (reuse existing logic from showFullCaseStudy if possible)
                // For simplicity here, we'll direct-toggle
                const caseStudyFull = document.getElementById('full-case-study-smartmeet');
                if (caseStudyFull) {
                    caseStudyFull.style.display = 'block';
                }

                window.scrollTo(0, 0);

                setTimeout(() => {
                    document.body.style.opacity = '1';
                }, 50);
            }, 350);
        }
    }

    function initScrollAnimations() {
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Once visible, we can stop observing
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
    }

    // Back Button Handler (Preview → Case Studies)
    if (previewBackBtn) {
        previewBackBtn.addEventListener('click', () => {
            showCaseStudiesFromPreview();
        });
    }

    const uberPreviewBackBtn = document.getElementById('uber-preview-back-btn');
    if (uberPreviewBackBtn) {
        uberPreviewBackBtn.addEventListener('click', () => {
            showCaseStudiesFromPreview();
        });
    }

    function showCaseStudies() {
        // Fade out main sections
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1)';

        setTimeout(() => {
            // Hide main sections
            mainSections.forEach(section => {
                section.style.display = 'none';
            });

            // Show case studies
            caseStudiesView.style.display = 'block';

            // Reset scroll
            window.scrollTo(0, 0);

            // Fade in
            setTimeout(() => {
                caseStudiesView.classList.add('is-visible');
                document.body.style.opacity = '1';
            }, 50);
        }, 350);
    }

    function showMainView() {
        // Fade out
        document.body.style.opacity = '0';

        setTimeout(() => {
            // Hide case studies
            caseStudiesView.classList.remove('is-visible');
            caseStudiesView.style.display = 'none';

            // Show main sections
            mainSections.forEach(section => {
                section.style.display = '';
            });

            // Reset scroll
            window.scrollTo(0, 0);

            // Fade in
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 50);
        }, 350);
    }

    function showPreviewScreen(previewId) {
        const previewScreen = document.getElementById(previewId);
        if (!previewScreen) return;

        // Fade out
        document.body.style.opacity = '0';

        setTimeout(() => {
            // Hide case studies
            caseStudiesView.classList.remove('is-visible');
            caseStudiesView.style.display = 'none';

            // Show preview screen
            previewScreen.style.display = 'block';

            // Reset scroll
            window.scrollTo(0, 0);

            // Fade in
            setTimeout(() => {
                previewScreen.classList.add('is-visible');
                document.body.style.opacity = '1';
            }, 50);
        }, 350);
    }

    function showCaseStudiesFromPreview() {
        // Fade out
        document.body.style.opacity = '0';

        setTimeout(() => {
            // Hide all preview screens
            const allPreviews = document.querySelectorAll('.preview-screen');
            allPreviews.forEach(preview => {
                preview.classList.remove('is-visible');
                preview.style.display = 'none';
            });

            // Show case studies
            caseStudiesView.style.display = 'block';

            // Reset scroll
            window.scrollTo(0, 0);

            // Fade in
            setTimeout(() => {
                caseStudiesView.classList.add('is-visible');
                document.body.style.opacity = '1';
            }, 50);
        }, 350);
    }

    // =============================================
    // FULL CASE STUDY VIEW HANDLERS
    // =============================================
    const fullCaseStudyView = document.getElementById('full-case-study-smartmeet');
    const csFullBackBtn = document.getElementById('cs-full-back-btn');
    const previewCtaBtns = document.querySelectorAll('.preview-cta-btn');
    const progressLinks = document.querySelectorAll('.cs-progress-link');

    // Preview Screen CTA Handlers
    previewCtaBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            const caseStudy = btn.dataset.case;

            if (action === 'view-full' && caseStudy === 'smartmeet') {
                showFullCaseStudy();
            } else {
                console.log('Full view for this case study logic pending');
            }
        });
    });

    // List View Handlers
    const csButtons = document.querySelectorAll('.cs-btn');

    csButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            const caseStudy = btn.dataset.case;

            if (action === 'preview') {
                if (caseStudy === 'smartmeet') {
                    showPreviewScreen('smartmeet-preview');
                } else if (caseStudy === 'uber') {
                    showPreviewScreen('uber-preview');
                }
            } else if (action === 'view-full') {
                if (caseStudy === 'smartmeet') {
                    showFullCaseStudy();
                } else {
                    console.log(`View Full Case Study: ${caseStudy} - implementation pending`);
                }
            }
        });
    });

    // Full View Back Button
    if (csFullBackBtn) {
        csFullBackBtn.addEventListener('click', () => {
            showPreviewScreen('smartmeet-preview');
        });
    }

    // Next Case Study Button (Forward only navigation)
    const nextCaseBtn = document.getElementById('next-case-study-btn');
    if (nextCaseBtn) {
        nextCaseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Hide full view
            if (fullCaseStudyView) {
                fullCaseStudyView.classList.remove('is-visible');
                fullCaseStudyView.style.display = 'none';
            }
            // Navigate to Uber Preview
            showPreviewScreen('uber-preview');
        });
    }

    // Scroll Spy & Smooth Scroll
    if (fullCaseStudyView) {
        // Smooth Scroll
        progressLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    const headerOffset = 180;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + fullCaseStudyView.scrollTop - headerOffset;

                    fullCaseStudyView.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            });
        });

        // Scroll Spy
        fullCaseStudyView.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('.cs-intro-block, .cs-text-section, #cs-process, #cs-design, #cs-validation, #cs-outcome');

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (fullCaseStudyView.scrollTop >= (sectionTop - 300)) {
                    current = section.getAttribute('id');
                }
            });

            progressLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }

    function showFullCaseStudy() {
        document.body.style.opacity = '0';

        setTimeout(() => {
            mainSections.forEach(s => s.style.display = 'none');
            caseStudiesView.style.display = 'none';
            document.querySelectorAll('.preview-screen').forEach(p => p.style.display = 'none');

            if (fullCaseStudyView) {
                fullCaseStudyView.style.display = 'block';
                fullCaseStudyView.scrollTop = 0;

                setTimeout(() => {
                    fullCaseStudyView.classList.add('is-visible');
                    document.body.style.opacity = '1';

                    // Trigger Stats Animation when full view opens
                    initStatsAnimation();
                }, 50);
            }
        }, 350);
    }

    // =============================================
    // EXISTING APPROACHES - STATS LOGIC
    // =============================================
    const approachData = {
        data: [
            { label: 'Physical visits', value: 50, color: '#FFC44D' },
            { label: 'Whatsapp / Email', value: 20, color: '#0066FF' },
            { label: 'Phone Call', value: 20, color: '#4ADE80' },
            { label: 'Calendar slots', value: 10, color: '#FF8A3D' }
        ],
        successRate: 60
    };

    function initStatsAnimation() {
        renderBars();
        renderLegend();

        // Slight delay to ensure DOM is ready and transition triggers
        setTimeout(() => {
            animateBars();
            animateCircle();
        }, 300);
    }

    function renderBars() {
        const container = document.getElementById('cs-bars-container');
        if (!container) return;

        container.innerHTML = '';

        approachData.data.forEach(item => {
            const row = document.createElement('div');
            row.className = 'cs-bar-row';

            row.innerHTML = `
                <span class="cs-bar-label">${item.label}</span>
                <div class="cs-bar-wrapper">
                    <div class="cs-bar-track">
                        <div class="cs-bar-fill" style="background-color: ${item.color}; width: 0%;" data-target="${item.value}"></div>
                    </div>
                    <span class="cs-bar-value">${item.value}%</span>
                </div>
            `;
            container.appendChild(row);
        });
    }

    function renderLegend() {
        const container = document.getElementById('cs-legend-container');
        if (!container) return;

        container.innerHTML = '';

        approachData.data.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cs-legend-item';

            itemDiv.innerHTML = `
                <div class="cs-legend-dot" style="background-color: ${item.color}"></div>
                <span class="cs-legend-text">${item.label}</span>
                <span class="cs-legend-val">${item.value}%</span>
            `;
            container.appendChild(itemDiv);
        });
    }

    function animateBars() {
        const bars = document.querySelectorAll('.cs-bar-fill');
        bars.forEach(bar => {
            const target = bar.getAttribute('data-target');
            bar.style.width = `${target}%`;
        });
    }

    function animateCircle() {
        const circle = document.querySelector('.cs-circle-progress');
        const percentageText = document.querySelector('.cs-circle-percentage');

        if (!circle || !percentageText) return;

        const radius = 90;
        const circumference = 2 * Math.PI * radius;
        const targetPercent = approachData.successRate;
        const offset = circumference - (targetPercent / 100) * circumference;

        // Reset first
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;

        // Animate stroke
        // Use timeout to allow transition to take effect from reset
        requestAnimationFrame(() => {
            circle.style.strokeDashoffset = offset;

            // Color the stroke based on the gradient desire or just a mix? 
            // Visual shows multi-color segment but user said "Colors must match" and "Circle animates".
            // For a simple single progress ring as per prompt "Circular Progress Indicator ... Center Value 60%", 
            // usually implies one color or a gradient. 
            // User prompt: "Progress animates from 0 -> 60%".
            // Legend implies segments but request says "Circular Progress Indicator" (singular).
            // However, "Color Segments (Legend-driven)" suggests a donut chart style.
            // Given constraint "Stroke animation", implementing a true multi-segment chart with simple stroke-dashoffset is complex.
            // I will implement a single stroke color (gradient-like or dominant) for now as a "Success Rate" indicator,
            // OR, if I must support segments, I'd need multiple circles. 
            // Re-reading: "Color Segments (Legend-driven)... Legend values (dynamic)... Colors must match the horizontal bars".
            // This implies the circle should be a Donut Chart representing the breakdown?
            // BUT, center text is "60% Meets were Successful".
            // And standard donut charts show distribution (sum = 100%). 
            // The values 50+20+20+10 = 100%. 
            // So the chart should logically be the distribution of methods?
            // But the center says "60% Successful". This is conflicting data visualization logic if the ring is the methods.
            // Wait, "Right Column... Chances of a Successful Meet... Center Value 60%... Color Segments... Legend values 50, 20, 20, 10".
            // It's likely the ring segments represent the distribution of methods (totalling 100%), and the HOLE contains the aggregation "60% success".
            // I will try to support the multi-colored ring if possible, but 
            // stroke-dasharray animation for MULTIPLE segments is tricky with just one circle.
            // I will generate MULTIPLE circles for the donut chart effect to be accurate to "Color Segments".
        });

        // Counter animation
        let start = 0;
        const duration = 1200;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out quart
            const ease = 1 - Math.pow(1 - progress, 4);

            const currentVal = Math.floor(start + (targetPercent - start) * ease);
            percentageText.textContent = `${currentVal}%`;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);

        // Re-implement Circle for Segments if possible
        renderDonutSegments(circumference);
    }

    function renderDonutSegments(circumference) {
        const svg = document.querySelector('.cs-circle-svg');
        // Remove existing progress circle if we are doing segments, OR repurpose it.
        // Actually, let's keep the one circle for the "Success Rate" if that was the intent, 
        // OR build the segments.
        // Ambiguity: "Circular Progress Indicator ... Center Value 60% ... Color Segments (Legend-driven)".
        // If I build segments 50/20/20/10, they sum to 100.
        // If I build one circle for 60%, it's just one circle.
        // The Prompt says: "Progress animates from 0 -> 60%... Legend values (dynamic): Physical Visits - 50%...".
        // It is highly likely the user wants a DONUT chart of the breakdown (50/20/20/10)
        // AND the center text just statically (or animatedly) says "60% Successful" (which might be a separate metric).
        // I will implement the SEGMENTED donut chart.

        // clear dynamic circles but keep bg
        const existingSegments = svg.querySelectorAll('.cs-segment');
        existingSegments.forEach(el => el.remove());

        let cumulativePercent = 0;

        // We need to render them stacked. 
        // Only way to animate 'drawing' them is tricky.
        // Simplified approach: Render them fixed, but animate the CONTAINER rotation or opacity?
        // User asked for "Stroke animation using stroke-dasharray".
        // To do this for segments: calculate dashes.

        approachData.data.forEach(item => {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("class", "cs-segment");
            circle.setAttribute("cx", "100");
            circle.setAttribute("cy", "100");
            circle.setAttribute("r", "90");
            circle.setAttribute("fill", "none");
            circle.setAttribute("stroke", item.color);
            circle.setAttribute("stroke-width", "12");
            circle.setAttribute("stroke-linecap", "round"); // Rounded ends might look weird on full donut but requested "Rounded ends" was for bars.

            // Length of this segment
            const segLength = (item.value / 100) * circumference;
            // Gap is remaining
            const gapLength = circumference - segLength;

            circle.style.strokeDasharray = `${segLength} ${gapLength}`;

            // Offset to rotate it to position. 
            // SVG circles start at 3 o'clock. We rotated SVG -90deg so starts 12 o'clock.
            // Dashoffset moves the start.
            // We want to accumulate.
            // CSS rotation is easier for placement.

            // Initial offset for animation (hidden)
            // It's hard to animate segments growing sequentially without complex timing.
            // Fallback: Animate a mask OR just animate opacity?
            // "Progress animates from 0 -> 60%"... this specific line implies the Circle represents the 60%.
            // I will stick to the SINGLE circle representing 60% for "Success Rate" colored with a gradient or specific color,
            // because "Legend values" matching "Bar Colors" matching "Color Segments" implies the breakdown.

            // HYBRID: I will make the ring be the MULTI-COLORED segment ring (100% total)
            // But animate the whole thing revealing?
            // Let's look at the "Right Column" request again.
            // "Center Value 60%... Legend values: Physical 50, Whatsapp 20... Rules: Colors must match bars... If values change... both Bars, Circle, Legend update".
            // Okay, the circle DEFINITELY represents the Distribution (50/20/20/10). 
            // The "0 -> 60%" animation instruction might be a misunderstanding of the text by the prompt author OR 
            // they want the "60%" text to count up.
            // I will generate the SEGMENTS for the breakdown.

            // To animate segments: 
            // We can set stroke-dasharray to "0 circumference" initially.
            // Then transition to "segLength gapLength".
            // BUT we need to rotate them to their correct start positions.

            const startAngle = (cumulativePercent / 100) * 360;
            circle.style.transform = `rotate(${startAngle}deg)`;
            circle.style.transformOrigin = "center";
            circle.style.transition = "stroke-dasharray 1.2s ease-out";

            // Initial state
            circle.style.strokeDasharray = `0 ${circumference}`;

            svg.insertBefore(circle, svg.querySelector('.cs-circle-content')); // insert before text? No context is outside svg.
            svg.appendChild(circle);

            // Trigger animation
            setTimeout(() => {
                circle.style.strokeDasharray = `${segLength} ${circumference}`;
            }, 100);

            cumulativePercent += item.value;
        });

        // Hide the single progress circle I added in HTML
        const single = document.querySelector('.cs-circle-progress');
        if (single) single.style.display = 'none';

    }
});

// =============================================
// DESIGN EXECUTION SCROLL ANIMATIONS
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate Mockups
    const mockups = document.querySelectorAll('.cs-exec-mockup');
    mockups.forEach((mockup, index) => {
        mockup.style.opacity = '0';
        mockup.style.transform = 'translateY(40px)';
        mockup.style.transitionDelay = `${index * 200}ms`; // Stagger effect
        observer.observe(mockup);
    });

    // Animate Text Blocks
    const steps = document.querySelectorAll('.cs-step-block');
    steps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        step.style.transitionDelay = `${index * 200 + 100}ms`;
        observer.observe(step);
    });
});
