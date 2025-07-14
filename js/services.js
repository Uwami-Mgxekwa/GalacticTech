// Re-using functions from index.js for consistent behavior

// Create animated stars
function createStars() {
    const starsContainer = document.getElementById('stars');
    const numberOfStars = 100;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Random animation delay
        star.style.animationDelay = Math.random() * 2 + 's';
        
        starsContainer.appendChild(star);
    }
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('.nav-links a');
    const menuToggle = document.getElementById('menu-toggle'); // Get the menu toggle checkbox
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Check if the link is an internal anchor link on the *current* page
            // This condition ensures that only internal links trigger smooth scrolling and prevent default
            if (href.startsWith('#') || (href.includes('#') && href.split('#')[0] === window.location.pathname.split('/').pop())) {
                e.preventDefault(); // Prevent default only for internal anchor links
                const targetId = href.substring(href.indexOf('#') + 1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    // Close the hamburger menu after clicking a link
                    if (menuToggle && menuToggle.checked) {
                        menuToggle.checked = false;
                    }
                }
            } 
            // For external links (like to pages/careers.html or index.html), let default behavior happen
            // No 'else' needed here, as default behavior is not prevented for non-hash links
        });
    });
}

// Button click effects
function setupButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Mouse movement parallax effect
function setupParallaxEffect() {
    document.addEventListener('mousemove', (e) => {
        const floatingElements = document.querySelectorAll('.floating-element');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.02;
            const xPos = (x - 0.5) * speed * 100;
            const yPos = (y - 0.5) * speed * 100;
            
            element.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    });
}

// Video error handling (kept for consistency, though hero uses CSS background)
function setupVideoFallback() {
    const video = document.querySelector('.hero-video');
    
    // Only apply fallback if a video element actually exists and has an error
    if (video) {
        video.addEventListener('error', () => {
            const hero = document.querySelector('.hero');
            hero.style.background = `
                radial-gradient(ellipse at top, #1e3c72 0%, #2a5298 100%),
                radial-gradient(ellipse at bottom, #0f0f23 0%, #2a0845 100%)
            `;
            video.style.display = 'none';
        });
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    handleNavbarScroll();
    setupSmoothScrolling();
    setupButtonEffects();
    setupParallaxEffect();
    setupVideoFallback();
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
