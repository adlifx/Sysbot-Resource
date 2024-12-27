document.addEventListener("DOMContentLoaded", function () {
    const servicesCarousel = document.querySelector(".services-carousel");
    const serviceItems = document.querySelectorAll(".service-item");
    const dotsContainer = document.querySelector(".dots");
    const prevButton = document.querySelector(".carousel-prev");
    const nextButton = document.querySelector(".carousel-next");

    let currentSlide = 0;
    let visibleItems = 3; // Default for desktop view
    let startX = 0;
    let currentScrollLeft = 0;
    let isDragging = false;

    // Function to calculate visible items
    const calculateVisibleItems = () => {
        visibleItems = window.innerWidth <= 768 ? 1 : 3; // Adjust items for mobile or desktop
    };

    // Function to calculate total slides and update dots
    const updateDots = () => {
        dotsContainer.innerHTML = ""; // Clear existing dots
        const totalSlides = Math.ceil(serviceItems.length / visibleItems);

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement("span");
            dot.classList.add("dot");
            if (i === currentSlide) {
                dot.classList.add("active");
            }
            dot.setAttribute("data-slide", i);
            dotsContainer.appendChild(dot);
        }

        // Add click event listeners to dots
        const dots = document.querySelectorAll(".dot");
        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => moveToSlide(index));
        });
    };

    // Function to move the carousel to a specific slide
    const moveToSlide = (index) => {
        const slideWidth = servicesCarousel.offsetWidth / visibleItems;
        const scrollLeft = index * slideWidth * visibleItems;

        servicesCarousel.scrollTo({
            left: scrollLeft,
            behavior: "smooth",
        });

        currentSlide = index;
        updateActiveDot();
    };

    // Function to update the active dot
    const updateActiveDot = () => {
        const dots = document.querySelectorAll(".dot");
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSlide);
        });
    };

    // Previous button functionality
    prevButton.addEventListener("click", () => {
        if (currentSlide > 0) {
            moveToSlide(currentSlide - 1);
        }
    });

    // Next button functionality
    nextButton.addEventListener("click", () => {
        const totalSlides = Math.ceil(serviceItems.length / visibleItems);
        if (currentSlide < totalSlides - 1) {
            moveToSlide(currentSlide + 1);
        }
    });

    // Handle touch events for sliding on mobile
    servicesCarousel.addEventListener("touchstart", (e) => {
        isDragging = true;
        startX = e.touches[0].pageX;
        currentScrollLeft = servicesCarousel.scrollLeft;
    });

    servicesCarousel.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const touchX = e.touches[0].pageX;
        const distance = startX - touchX;
        servicesCarousel.scrollLeft = currentScrollLeft + distance;
    });

    servicesCarousel.addEventListener("touchend", () => {
        isDragging = false;
        const slideWidth = servicesCarousel.offsetWidth / visibleItems;
        currentSlide = Math.round(servicesCarousel.scrollLeft / slideWidth);
        moveToSlide(currentSlide);
    });

    // Update visible items and dots on window resize
    const handleResize = () => {
        const previousVisibleItems = visibleItems;
        calculateVisibleItems();

        if (previousVisibleItems !== visibleItems) {
            // Reset to first slide to avoid layout issues
            currentSlide = 0;
            moveToSlide(currentSlide);
            updateDots();
        }
    };

    // Debounce resize events for better performance
    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 200);
    });

    // Initialize carousel on page load
    calculateVisibleItems();
    updateDots();
});

const hamburger = document.querySelector('.hamburger');
const overlayNav = document.querySelector('.overlay-nav');
const closeNav = document.querySelector('.close-nav');
const navLinks = document.querySelectorAll('.overlay-menu a, .contact-links');

// Open overlay navigation
hamburger.addEventListener('click', () => {
    overlayNav.classList.add('active');
    hamburger.classList.add('hidden'); // Hide hamburger when open
});

// Close overlay navigation
closeNav.addEventListener('click', () => {
    overlayNav.classList.remove('active');
    hamburger.classList.remove('hidden'); // Show hamburger when closed
});

// Close overlay when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        overlayNav.classList.remove('active');
        hamburger.classList.remove('hidden');
    });
});

// Select all anchor links
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default anchor click behavior

    const targetId = this.getAttribute('href'); // Get the target section ID
    const targetElement = document.querySelector(targetId);

    // Scroll to the target section with smooth behavior
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: 'smooth',
    });
  });
});

const sections = document.querySelectorAll('section');
const navLink = document.querySelectorAll('.menu a, .overlay-menu a');
// Observe sections to highlight the active link
const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLink.forEach(link => link.classList.remove('active'));
          const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
          if (activeLink) { // Add this check
            activeLink.classList.add('active');
          }
        }
      });
    },
    { threshold: 0.7 } // Trigger when 70% of the section is visible
  );
  

sections.forEach(section => observer.observe(section));

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form navigation

        const formData = new FormData(form);

        try {
            const response = await fetch('send_email.php', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message || 'Form submitted successfully!');
                form.reset(); // Clear the form fields after successful submission
            } else {
                alert('Failed to submit the form. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
