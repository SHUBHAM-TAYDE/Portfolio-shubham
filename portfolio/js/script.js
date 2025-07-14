// Image Flipper Logic
const imageFlipper = document.getElementById('image-flipper');
const currentImage = document.getElementById('current-image');
const nextImagePreload = document.getElementById('next-image-preload');

// Images array with paths relative to index.html
const images = [
    "assets/images/shubham_linkedin.jpeg.jpg", // Your LinkedIn profile picture
    "assets/images/blog_post.png", // Image for a blog post
    "assets/images/blog_section111.png", // Another image for a blog section
    "assets/images/projects.png" // Image related to projects
];
let currentIndex = 0;
let isFlipping = false;

function updateImages() {
    // Set the current image
    currentImage.src = images[currentIndex];

    // Preload the next image for a smoother flip
    const nextIndex = (currentIndex + 1) % images.length;
    nextImagePreload.src = images[nextIndex];
}

function flipImage() {
    if (isFlipping) return; // Prevent multiple flips during animation

    isFlipping = true;
    imageFlipper.classList.add('flipped');

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateImages(); // Update images after the flip animation starts
        imageFlipper.classList.remove('flipped');
        isFlipping = false;
    }, 600); // This should be equal to the transition duration
}

// Message Box for form submission feedback (currently not used as contact form is removed)
const messageBox = document.getElementById('message-box');

function showMessage(message, type) {
    messageBox.textContent = message;
    messageBox.className = 'message-box active'; // Reset classes and show
    if (type === 'error') {
        messageBox.classList.add('error');
    } else {
        messageBox.classList.add('success');
    }

    // Automatically hide after 3 seconds
    setTimeout(() => {
        messageBox.classList.remove('active');
        messageBox.textContent = ''; // Clear text
        messageBox.classList.remove('success', 'error'); // Remove type classes
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM content loaded!"); // Confirm DOMContentLoaded fires

    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    // Log elements to confirm they are found
    console.log("themeToggle:", themeToggle);
    console.log("sunIcon:", sunIcon);
    console.log("moonIcon:", moonIcon);

    // Check if elements exist before proceeding
    if (!themeToggle || !sunIcon || !moonIcon) {
        console.error("One or more theme-related elements were not found. Theme toggle functionality disabled.");
        // Optionally, you could hide the theme toggle button if elements aren't found
        if (themeToggle) themeToggle.style.display = 'none';
        return; // Exit the function if elements are missing
    }

    // Set initial theme based on local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.classList.remove('light', 'dark');
        htmlElement.classList.add(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.add('light');
    }

    // Update icon visibility based on current theme
    if (htmlElement.classList.contains('dark')) {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }

    // Add event listener for theme toggle
    themeToggle.addEventListener('click', () => {
        if (htmlElement.classList.contains('light')) {
            htmlElement.classList.remove('light');
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            htmlElement.classList.remove('dark');
            htmlElement.classList.add('light');
            localStorage.setItem('theme', 'light');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    });

    // Multi-page logic
    const sections = document.querySelectorAll('.page-section');

    function showSection(hash) {
        // Hide all sections first
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Determine which section to show
        let targetId = hash.substring(1); // Remove '#'
        if (!targetId || targetId === 'home') {
            document.getElementById('home').classList.add('active');
        } else {
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        }
        // Scroll to top of the page when navigating to a new section
        window.scrollTo(0, 0);
    }

    // Listen for hash changes (e.g., when clicking navigation links)
    window.addEventListener('hashchange', () => {
        showSection(window.location.hash);
    });

    // Initial calls
    updateImages();
    setInterval(flipImage, 3000); // Flip every 3 seconds
    showSection(window.location.hash); // Ensure correct section is shown on load

    // Skill Bar Animation Logic
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the element is visible
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.dataset.level;
                skillBar.style.width = `${level}%`;
                skillBar.classList.add('animate'); // Add class to trigger transition
                observer.unobserve(skillBar); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe each skill bar
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
});
