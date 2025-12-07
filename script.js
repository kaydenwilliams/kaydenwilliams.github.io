document.addEventListener("DOMContentLoaded", () => {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById("darkmode-toggle");
    const themeStylesheet = document.getElementById("themeStylesheet");

    // Load saved theme or default to light
    const savedTheme = localStorage.getItem("theme") || "light.css";
    themeStylesheet.href = savedTheme;
    
    // Set checkbox state based on current theme
    if (savedTheme === "dark.css") {
        themeToggle.checked = true;
    }

    // Theme toggle event listener
    themeToggle.addEventListener("change", () => {
        const newTheme = themeToggle.checked ? "dark.css" : "light.css";
        themeStylesheet.href = newTheme;
        localStorage.setItem("theme", newTheme);
        
        // Add smooth transition effect
        document.body.style.transition = "background-color 0.3s ease";
    });

    // Hamburger Menu Functionality
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("nav");
    const navLinks = document.querySelectorAll(".nav-links");

    if (hamburger && nav) {
        // Toggle menu on hamburger click
        hamburger.addEventListener("click", () => {
            nav.classList.toggle("show");
            hamburger.classList.toggle("active");
        });

        // Close menu when clicking on a nav link
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("show");
                hamburger.classList.remove("active");
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove("show");
                hamburger.classList.remove("active");
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector("header");
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
        } else {
            header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        ".experience-card, .project-card, .toolbox-category, .contact-item"
    );

    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });

    // Add stagger effect to experience cards
    const experienceCards = document.querySelectorAll(".experience-card");
    experienceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add stagger effect to project cards
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Typing effect for greeting (optional enhancement)
    const greetingElement = document.querySelector(".greeting");
    if (greetingElement) {
        const originalText = greetingElement.textContent;
        greetingElement.textContent = "";
        let charIndex = 0;

        function typeText() {
            if (charIndex < originalText.length) {
                greetingElement.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 100);
            }
        }

        // Start typing effect after a short delay
        setTimeout(typeText, 500);
    }

    // Add hover effect to toolbox items
    const toolboxItems = document.querySelectorAll(".toolbox-item");
    toolboxItems.forEach(item => {
        item.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-4px) scale(1.05)";
        });
        
        item.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0) scale(1)";
        });
    });

    // Form validation (if you add a contact form later)
    const contactForm = document.querySelector("#contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            // Add your form submission logic here
            console.log("Form submitted");
        });
    }

    // Preload theme stylesheet to prevent flash
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "style";
    link.href = savedTheme === "dark.css" ? "light.css" : "dark.css";
    document.head.appendChild(link);

    // Log message for developers
    console.log("%c👋 Welcome to Kayden's Portfolio!", "color: #667eea; font-size: 20px; font-weight: bold;");
    console.log("%cInterested in the code? Check it out on GitHub!", "color: #764ba2; font-size: 14px;");
});