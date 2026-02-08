document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('artCarouselTrack');
    const items = [...document.querySelectorAll('.carousel-item')];
    const prevBtn = document.getElementById('prevArtBtn');
    const nextBtn = document.getElementById('nextArtBtn');

    let currentIndex = 2; // Start with index 2 as center

    function updateCarousel() {
        const itemCount = items.length;

        items.forEach((item, i) => {
            // Calculate relative distance from current index
            let diff = i - currentIndex;

            // Handle wrap-around distance for infinite feel (optional, but keep it simple for now as per rules)
            // The rules say "No infinite loop for now", so we stay bounded.

            const absDiff = Math.abs(diff);

            // Visibility: Show 5 images (Center, 2 left, 2 right)
            if (absDiff > 2) {
                item.style.opacity = '0';
                item.style.pointerEvents = 'none';
                item.style.zIndex = '0';
                item.style.transform = `translateX(${diff * 200}px) scale(0.5)`;
                return;
            }

            item.style.opacity = '1';
            item.style.pointerEvents = absDiff === 0 ? 'auto' : 'none'; // Only center image interactive? Rules didn't specify, but safer for UI.

            // Curve / Arc Effect Logic
            // Center (absDiff 0): scale 1, transY 0, rot 0
            // Sides (absDiff 1): scale 0.85, transY -20, rot +/- 10deg
            // Outer (absDiff 2): scale 0.7, transY -50, rot +/- 20deg

            let scale = 1 - (absDiff * 0.15);
            let translateZ = -absDiff * 150;
            let translateX = diff * 256; // Reduced spread factor to match 20% size reduction (320 * 0.8)
            let translateY = -absDiff * 40; // Curve up factor (side images rise slightly)
            let rotationY = -diff * 15; // Face center inward

            // Center image sits lowest visually as per rule
            // Center is at translateY 0, sides are at -40 and -80

            item.style.zIndex = 10 - absDiff;
            item.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotationY}deg) scale(${scale})`;
        });

        // Button states (since no infinite loop)
        prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';

        nextBtn.style.opacity = currentIndex === itemCount - 1 ? '0.3' : '1';
        nextBtn.style.pointerEvents = currentIndex === itemCount - 1 ? 'none' : 'auto';
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Art Contact Form — WhatsApp Redirection
    const artContactForm = document.getElementById('artContactForm');
    if (artContactForm) {
        artContactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const inquiryType = document.getElementById('inquiryType').value;
            const message = document.getElementById('artMessage').value.trim();

            if (!message) {
                alert('Please type a message before sending.');
                return;
            }

            const phoneNumber = "918270786840";
            const fullMessage = `Hello! I'm reaching out regarding: *${inquiryType}*.\n\n${message}`;
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullMessage)}`;

            // Redirect to WhatsApp
            window.open(whatsappUrl, '_blank');
        });
    }

    // Initialize
    updateCarousel();
});
