document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // Initialize UI components
    initializeUI();

    // Setup event listeners
    setupEventListeners();

    /**
     * Initialize UI components and effects
     * Called once on DOMContentLoaded
     */
    function initializeUI() {
        checkExistingFormValues(); // Used only here
        if (document.querySelector('.password-strength-meter')) {
            initializePasswordStrengthMeter(); // Used only here
        }
        setupAlerts(); // Used only here
        applyFloatingLabels(); // Used only here
    }

    /**
     * Setup all event listeners
     * Called once on DOMContentLoaded
     */
    function setupEventListeners() {
        setupFormFieldEffects(); // Used only here
        setupPasswordToggles(); // Used only here
        setupDemoAccounts(); // Used only here
        setupFormValidation(); // Used only here
    }

    /**
     * Apply floating label effect to any fields with values
     * Called by: initializeUI()
     */
    function applyFloatingLabels() {
        const formFields = document.querySelectorAll('.form-control');
        formFields.forEach(input => {
            if (input.value.trim() !== '') {
                const label = input.nextElementSibling;
                if (label && label.classList.contains('form-label')) {
                    label.classList.add('active');
                }
            }
        });
    }

    /**
     * Setup alert functionality
     * Called by: initializeUI()
     */
    function setupAlerts() {
        const alerts = document.querySelectorAll('.error-alert, .success-alert');
        alerts.forEach(alert => {
            // Add a close button to each alert
            const closeButton = document.createElement('button');
            closeButton.setAttribute('type', 'button');
            closeButton.setAttribute('aria-label', 'Close');
            closeButton.classList.add('alert-close-btn');
            closeButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" 
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            `;
            alert.appendChild(closeButton);

            // Close alert on button click or alert click
            closeButton.addEventListener('click', () => hideAlert(alert)); // Used only here
            alert.addEventListener('click', () => hideAlert(alert)); // Used only here
        });

        hideAllAlerts(); // Used only here

        // Add styles for close button
        const style = document.createElement('style');
        style.textContent = `
            .alert-close-btn {
                position: absolute;
                top: 0.75rem;
                right: 0.75rem;
                background: none;
                border: none;
                cursor: pointer;
                color: currentColor;
                opacity: 0.6;
                padding: 0.25rem;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: opacity 0.2s ease;
            }
            .alert-close-btn:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Show an error alert with a message
     * Called by: showError(), validateLoginForm(), validateRegisterForm(), forgotPasswordForm submit
     */
    function showErrorAlert(message) {
        const errorAlert = document.getElementById('errorAlert');
        const errorMessage = document.getElementById('errorMessage');
        if (errorAlert && errorMessage) {
            errorMessage.textContent = message;
            errorAlert.classList.add('show');
            errorAlert.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    /**
     * Show a success alert with a message
     * Called by: loginForm submit, registerForm submit, forgotPasswordForm submit
     */
    function showSuccessAlert(message) {
        const successAlert = document.getElementById('successAlert');
        const successMessage = document.getElementById('successMessage');
        const successActions = document.getElementById('successActions');
        if (successAlert && successMessage) {
            successMessage.textContent = message;
            successAlert.classList.add('show');
            if (successActions) {
                successActions.classList.add('show');
            }
            successAlert.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    /**
     * Hide a specific alert
     * Called by: setupAlerts() (close button and alert click), hideAllAlerts()
     */
    function hideAlert(alert) {
        if (alert) {
            alert.classList.remove('show');
        }
    }

    /**
     * Hide all alerts
     * Called by: setupAlerts(), loginForm/forgotPasswordForm/registerForm submit
     */
    function hideAllAlerts() {
        const alerts = document.querySelectorAll('.error-alert, .success-alert');
        alerts.forEach(alert => hideAlert(alert));
        const successActions = document.getElementById('successActions');
        if (successActions) {
            successActions.classList.remove('show');
        }
    }

    /**
     * Check for existing form values and adjust UI accordingly
     * Called by: initializeUI()
     */
    function checkExistingFormValues() {
        const formFields = document.querySelectorAll('.form-control');
        formFields.forEach(input => {
            if (input.value.trim()) {
                input.closest('.form-group')?.classList.add('focused');
            }
        });
    }

    /**
     * Setup form field effects for focus and input
     * Called by: setupEventListeners()
     */
    function setupFormFieldEffects() {
        const formFields = document.querySelectorAll('.form-control');
        formFields.forEach(input => {
            input.addEventListener('focus', () => {
                input.classList.add('active');
                input.closest('.form-group')?.classList.add('focused');
            });
            input.addEventListener('blur', () => {
                input.classList.remove('active');
                if (!input.value.trim()) {
                    input.closest('.form-group')?.classList.remove('focused');
                }
            });
            input.addEventListener('input', () => {
                validateField(input); // Used only here
            });
        });
    }

    /**
     * Initialize password strength meter
     * Called by: initializeUI()
     */
    function initializePasswordStrengthMeter() {
        const passwordInput = document.getElementById('password');
        const strengthMeter = document.querySelector('.password-strength-meter');
        if (passwordInput && strengthMeter) {
            passwordInput.addEventListener('input', () => {
                updatePasswordStrength(passwordInput.value); // Used only here
                updatePasswordRequirements(passwordInput.value); // Used only here
            });
        }
    }

    /**
     * Update password requirements visual indicators
     * Called by: initializePasswordStrengthMeter(), setFieldValue() (demo accounts)
     */
    function updatePasswordRequirements(password) {
        const reqLength = document.getElementById('req-length');
        const reqLowercase = document.getElementById('req-lowercase');
        const reqUppercase = document.getElementById('req-uppercase');
        const reqNumber = document.getElementById('req-number');
        const reqSpecial = document.getElementById('req-special');
        if (!reqLength || !reqLowercase || !reqUppercase || !reqNumber || !reqSpecial) return;

        const hasLength = password.length >= 8;
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasDigit = /[0-9]/.test(password);
        const hasSpecial = /[^a-zA-Z0-9]/.test(password);

        updateRequirement(reqLength, hasLength); // Used only here
        updateRequirement(reqLowercase, hasLower); // Used only here
        updateRequirement(reqUppercase, hasUpper); // Used only here
        updateRequirement(reqNumber, hasDigit); // Used only here
        updateRequirement(reqSpecial, hasSpecial); // Used only here
    }

    /**
     * Update password strength meter
     * Called by: initializePasswordStrengthMeter(), setFieldValue() (demo accounts)
     */
    function updatePasswordStrength(password) {
        const strengthMeter = document.querySelector('.password-strength-meter-bar');
        const strengthText = document.querySelector('.password-strength-text');
        const strengthContainer = document.querySelector('.password-strength-container');
        if (!strengthMeter || !strengthText) return;

        const strength = calculatePasswordStrength(password); // Used only here
        let width = 0;
        let backgroundColor = '';
        let activeStrength = '';

        strengthText.style.visibility = password ? 'visible' : 'hidden';
        if (strengthContainer) {
            strengthContainer.classList.remove('weak', 'fair', 'good', 'strong');
        }
        const strengthIndicators = strengthText.querySelectorAll('span');
        strengthIndicators.forEach(span => span.classList.remove('active'));

        if (strength >= 80) {
            width = '100%';
            backgroundColor = '#059669';
            activeStrength = 'strong';
            if (strengthContainer) strengthContainer.classList.add('strong');
        } else if (strength >= 60) {
            width = '75%';
            backgroundColor = '#10b981';
            activeStrength = 'good';
            if (strengthContainer) strengthContainer.classList.add('good');
        } else if (strength >= 30) {
            width = '50%';
            backgroundColor = '#f59e0b';
            activeStrength = 'fair';
            if (strengthContainer) strengthContainer.classList.add('fair');
        } else if (strength > 0) {
            width = '25%';
            backgroundColor = '#ef4444';
            activeStrength = 'weak';
            if (strengthContainer) strengthContainer.classList.add('weak');
        }

        strengthMeter.style.width = width;
        strengthMeter.style.backgroundColor = backgroundColor;

        if (activeStrength) {
            const activeIndicator = strengthText.querySelector(`.${activeStrength}`);
            if (activeIndicator) {
                activeIndicator.classList.add('active');
            }
        }
    }

    /**
     * Update requirement visual indicator
     * Called by: updatePasswordRequirements()
     */
    function updateRequirement(element, isMet) {
        if (element) {
            if (isMet) {
                element.classList.add('met');
                const svg = element.querySelector('svg');
                if (svg) {
                    svg.innerHTML = `
                        <path stroke-linecap="round" stroke-linejoin="round" 
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    `;
                }
            } else {
                element.classList.remove('met');
                const svg = element.querySelector('svg');
                if (svg) {
                    svg.innerHTML = `
                        <circle cx="12" cy="12" r="10"></circle>
                    `;
                }
            }
        }
    }

    /**
     * Setup password visibility toggles
     * Called by: setupEventListeners()
     */
    function setupPasswordToggles() {
        const passwordToggles = document.querySelectorAll('.password-toggle');
        passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const passwordInput = toggle.closest('.password-field').querySelector('input');
                const currentType = passwordInput.type;
                if (currentType === 'password') {
                    passwordInput.type = 'text';
                    toggle.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                    `;
                    toggle.setAttribute('aria-label', 'Hide password');
                } else {
                    passwordInput.type = 'password';
                    toggle.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    `;
                    toggle.setAttribute('aria-label', 'Show password');
                }
                passwordInput.focus();
            });
        });
    }

    /**
     * Setup demo account auto-fill functionality
     * Called by: setupEventListeners()
     */
    function setupDemoAccounts() {
        const demoAccountButtons = document.querySelectorAll('.fill-credentials');
        demoAccountButtons.forEach(button => {
            button.addEventListener('click', () => {
                const email = button.getAttribute('data-email');
                const password = button.getAttribute('data-password');
                const emailInput = document.getElementById('email');
                const passwordInput = document.getElementById('password');
                const originalText = button.innerHTML;

                button.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2" class="spin">
                        <path stroke-linecap="round" stroke-linejoin="round" 
                            d="M16 3h5m0 0v5m0-5l-6 6M8 21H3m0 0v-5m0 5l6-6" />
                    </svg>
                    Filling...
                `;
                button.disabled = true;
                button.classList.add('filling');

                if (email && emailInput) {
                    setFieldValue(emailInput, email, () => {
                        emailInput.closest('.form-group')?.classList.add('focused');
                        validateField(emailInput);

                        if (password && passwordInput) {
                            setFieldValue(passwordInput, password, () => {
                                passwordInput.closest('.form-group')?.classList.add('focused');
                                validateField(passwordInput);

                                if (document.querySelector('.password-strength-meter')) {
                                    updatePasswordStrength(password);
                                    updatePasswordRequirements(password);
                                }

                                setTimeout(() => {
                                    button.innerHTML = `
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M5 13l4 4L19 7" />
                                        </svg>
                                        Filled
                                    `;
                                    setTimeout(() => {
                                        button.innerHTML = originalText;
                                        button.disabled = false;
                                        button.classList.remove('filling');
                                    }, 1500);
                                }, 500);
                            });
                        }
                    });
                }
            });
        });
    }

    /**
     * Set field value with a typing effect
     * Called by: setupDemoAccounts()
     */
    function setFieldValue(element, text, callback) {
        element.value = '';
        let i = 0;
        const typingSpeed = 50;
        function typeCharacter() {
            if (i < text.length) {
                element.value += text.charAt(i);
                element.dispatchEvent(new Event('input', { bubbles: true }));
                setTimeout(typeCharacter, typingSpeed);
                i++;
            } else {
                element.dispatchEvent(new Event('change', { bubbles: true }));
                if (callback) callback();
                const formGroup = element.closest('.form-group');
                if (formGroup) {
                    formGroup.classList.add('focused');
                }
            }
        }
        typeCharacter();
    }

    /**
     * Setup form validation
     * Called by: setupEventListeners()
     */
    function setupFormValidation() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const forgotPasswordForm = document.getElementById('forgotPasswordForm');

        if (loginForm) {
            loginForm.addEventListener('submit', function (e) {
                e.preventDefault();
                hideAllAlerts();
                if (validateLoginForm()) {
                    showSuccessAlert('Login successful! Redirecting you...');
                    // Determine redirect based on demo account email
                    const emailInput = document.getElementById('email');
                    let redirectUrl = '../admin/dashboard.html'; // default
                    if (emailInput) {
                        const email = emailInput.value.trim().toLowerCase();
                        if (email === 'admin@fcds.edu') {
                            // redirectUrl = 'Admin/admin-dashboard.html';
                            redirectUrl = 'comingsoonhome.html';
                        } else if (email === 'user@fcds.edu') {
                            redirectUrl = 'Student/student-db.html';
                        } else if (email === 'doctor@fcds.edu') {
                            // redirectUrl = 'Doctor/doctor-dashboard.html';
                            redirectUrl = 'comingsoonhome.html';
                        } else if (email === 'doctor-assistant@fcds.edu') {
                            // redirectUrl = 'Doctor-assistant/assistant-dashboard.html';
                            redirectUrl = 'comingsoonhome.html';
                        } else if (email === 'staff@fcds.edu') {
                            // redirectUrl = 'Staff/staff-dashboard.html';
                            redirectUrl = 'comingsoonhome.html';
                        }
                    }
                    setTimeout(() => {
                        window.location.href = redirectUrl;
                    }, 2000);
                }
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', function (e) {
                e.preventDefault();
                hideAllAlerts();
                if (validateRegisterForm()) {
                    registerForm.style.display = 'none';
                    showSuccessAlert('Your account has been created successfully!');
                    const successActions = document.getElementById('successActions');
                    if (successActions) {
                        successActions.classList.add('show');
                    }
                }
            });
        }

        if (forgotPasswordForm) {
            forgotPasswordForm.addEventListener('submit', function (e) {
                e.preventDefault();
                hideAllAlerts();
                const email = document.getElementById('email');
                if (email && isValidEmail(email.value)) {
                    showSuccessAlert('Password reset instructions have been sent to your email!');
                    email.value = '';
                    email.closest('.form-group')?.classList.remove('focused');
                } else {
                    showErrorAlert('Please enter a valid email address.');
                    if (email) {
                        showError(email, 'Please enter a valid email address');
                    }
                }
            });
        }
    }

    /**
     * Validate login form
     * Called by: loginForm submit event
     */
    function validateLoginForm() {
        let isValid = true;
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        clearError(email);
        clearError(password);

        if (!email.value.trim() || !isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        if (!password.value.trim()) {
            showError(password, 'Please enter your password');
            isValid = false;
        }
        if (!isValid) {
            showErrorAlert('Please correct the errors in the form.');
        }
        return isValid;
    }

    /**
     * Validate register form
     * Called by: registerForm submit event
     */
    function validateRegisterForm() {
        let isValid = true;
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const terms = document.getElementById('terms');
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return false;
        }
        clearError(firstName);
        clearError(lastName);
        clearError(email);
        clearError(password);
        clearError(confirmPassword);
        if (terms) clearError(terms);

        if (!firstName.value.trim()) {
            showError(firstName, 'Please enter your first name');
            isValid = false;
        }
        if (!lastName.value.trim()) {
            showError(lastName, 'Please enter your last name');
            isValid = false;
        }
        if (!email.value.trim() || !isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        if (!password.value.trim() || password.value.length < 8) {
            showError(password, 'Password must be at least 8 characters long');
            isValid = false;
        }
        const passwordStrength = calculatePasswordStrength(password.value);
        if (passwordStrength < 30) {
            showError(password, 'Password is too weak');
            isValid = false;
        }
        if (confirmPassword.value !== password.value) {
            showError(confirmPassword, 'Passwords do not match');
            isValid = false;
        }
        if (terms && !terms.checked) {
            showError(terms, 'You must agree to the terms');
            isValid = false;
        }
        if (!isValid) {
            showErrorAlert('Please correct the errors in the form.');
        }
        return isValid;
    }

    /**
     * Validate a single form field
     * Called by: setupFormFieldEffects() (input event)
     */
    function validateField(input) {
        if (!input) return;
        clearError(input);
        const id = input.id;
        switch (id) {
            case 'email':
                if (input.value.trim() && !isValidEmail(input.value)) {
                    showError(input, 'Please enter a valid email address');
                }
                break;
            case 'password':
                if (input.value.trim() && input.value.length < 8) {
                    showError(input, 'Password must be at least 8 characters long');
                }
                break;
            case 'confirmPassword':
                const passwordInput = document.getElementById('password');
                if (passwordInput && input.value !== passwordInput.value) {
                    showError(input, 'Passwords do not match');
                }
                break;
            case 'firstName':
            case 'lastName':
                if (input.required && !input.value.trim()) {
                    showError(input, `Please enter your ${id === 'firstName' ? 'first' : 'last'} name`);
                }
                break;
            case 'terms':
                if (input.required && !input.checked) {
                    showError(input, 'You must agree to the terms');
                }
                break;
        }
    }

    /**
     * Show error for a form field
     * Called by: validateField(), validateLoginForm(), validateRegisterForm(), forgotPasswordForm submit
     */
    function showError(input, message) {
        if (!input) return;
        if (input.type === 'checkbox') {
            const formCheck = input.closest('.form-check');
            if (formCheck) {
                formCheck.classList.add('with-error');
                const errorElement = formCheck.querySelector('.form-error-message');
                if (errorElement && message) {
                    errorElement.textContent = message;
                }
                setTimeout(() => input.focus(), 100);
            }
            return;
        }
        if (input.type === 'password') {
            const passwordField = input.closest('.password-field');
            if (passwordField) {
                passwordField.classList.add('with-error');
                const errorElement = passwordField.querySelector('.form-error-message');
                if (errorElement && message) {
                    errorElement.textContent = message;
                }
                setTimeout(() => input.focus(), 100);
            }
            return;
        }
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;
        formGroup.classList.add('with-error');
        const errorElement = formGroup.querySelector('.form-error-message');
        if (errorElement && message) {
            errorElement.textContent = message;
        }
        setTimeout(() => input.focus(), 100);
    }

    /**
     * Clear error for a form field
     * Called by: validateField(), validateLoginForm(), validateRegisterForm()
     */
    function clearError(input) {
        if (!input) return;
        if (input.type === 'checkbox') {
            const formCheck = input.closest('.form-check');
            if (formCheck) {
                formCheck.classList.remove('with-error');
            }
            return;
        }
        if (input.type === 'password') {
            const passwordField = input.closest('.password-field');
            if (passwordField) {
                passwordField.classList.remove('with-error');
            }
            return;
        }
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;
        formGroup.classList.remove('with-error');
    }

    /**
     * Validate email format
     * Called by: isValidEmail(), validateLoginForm(), validateRegisterForm(), forgotPasswordForm submit, validateField()
     */
    function isValidEmail(email) {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email.toLowerCase());
    }

    /**
     * Calculate password strength score (0-100)
     * Called by: updatePasswordStrength(), validateRegisterForm()
     */
    function calculatePasswordStrength(password) {
        if (!password) return 0;
        let score = 0;
        score += Math.min(30, password.length * 3);
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasDigit = /[0-9]/.test(password);
        const hasSpecial = /[^a-zA-Z0-9]/.test(password);
        const charVariety = (hasLower ? 1 : 0) +
            (hasUpper ? 1 : 0) +
            (hasDigit ? 1 : 0) +
            (hasSpecial ? 1 : 0);
        score += charVariety * 17.5;
        return Math.min(100, score);
    }
});
