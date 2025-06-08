// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Hide mobile menu if open
        mobileMenu.classList.add('hidden');
    });
});

// Booking Form Steps
const steps = document.querySelectorAll('.booking-step');
const tabs = document.querySelectorAll('.booking-tab');
let currentStep = 0;

function showStep(stepIndex) {
    // Hide all steps
    steps.forEach(step => {
        step.classList.add('hidden');
    });

    // Show current step
    steps[stepIndex].classList.remove('hidden');

    // Update tabs
    tabs.forEach((tab, index) => {
        tab.classList.remove('active-tab');
        if (index <= stepIndex) {
            tab.classList.add('active-tab');
        }
    });
}

// Next button click
document.querySelectorAll('.next-step').forEach(button => {
    button.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
        }
    });
});

// Previous button click
document.querySelectorAll('.prev-step').forEach(button => {
    button.addEventListener('click', () => {
        currentStep--;
        showStep(currentStep);
    });
});

// Validate form steps
function validateStep(stepIndex) {
    let isValid = true;

    switch (stepIndex) {
        case 0: // Service selection
            if (!document.querySelector('input[name="service"]:checked')) {
                alert('Please select a service');
                isValid = false;
            }
            break;
        case 1: // Barber selection
            if (!document.querySelector('input[name="barber"]:checked')) {
                alert('Please select a barber');
                isValid = false;
            }
            break;
        case 2: // Date & time
            if (!document.querySelector('input[name="date"]').value) {
                alert('Please select a date');
                isValid = false;
            } else if (!document.querySelector('select[name="time"]').value) {
                alert('Please select a time');
                isValid = false;
            }
            break;
        case 3: // Personal info
            const requiredFields = ['name', 'email', 'phone'];
            requiredFields.forEach(field => {
                if (!document.querySelector(`input[name="${field}"]`).value) {
                    alert(`Please fill in your ${field}`);
                    isValid = false;
                }
            });
            break;
    }

    return isValid;
}

// Form submission
document.getElementById('booking-form').addEventListener('submit', function (e) {
    e.preventDefault();

    if (validateStep(currentStep)) {
        // Get form values
        const service = document.querySelector('input[name="service"]:checked').value;
        const barber = document.querySelector('input[name="barber"]:checked').value;
        const date = document.querySelector('input[name="date"]').value;
        const time = document.querySelector('select[name="time"]').value;

        // Format date
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
        });

        // Display confirmation
        document.getElementById('conf-service').textContent = service;
        document.getElementById('conf-barber').textContent = barber;
        document.getElementById('conf-date').textContent = formattedDate;
        document.getElementById('conf-time').textContent = time;

        showStep(4); // Show confirmation step

        // Reset form (but keep values for the confirmation)
        setTimeout(() => {
            currentStep = 0;
            this.reset();
        }, 10000); // Reset after 10 seconds (for demo purposes)
    }
});

// New booking button
document.getElementById('new-booking').addEventListener('click', () => {
    currentStep = 0;
    showStep(currentStep);
    document.getElementById('booking-form').reset();
});

// Initialize first step
showStep(0);

// Style radio buttons when selected
document.querySelectorAll('.service-option, .barber-option').forEach(option => {
    const radio = option.querySelector('input[type="radio"]');
    radio.addEventListener('change', () => {
        if (radio.checked) {
            // Remove selected styles from all options
            document.querySelectorAll('.service-option, .barber-option').forEach(o => {
                o.classList.remove('border-purple-600', 'bg-purple-50');
            });

            // Add selected styles to current option
            option.classList.add('border-purple-600', 'bg-purple-50');
        }
    });
});