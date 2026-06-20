document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggles
    const setupMobileMenu = (toggleId, menuId) => {
        const toggle = document.getElementById(toggleId);
        const menu = document.getElementById(menuId);
        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                const isOpen = !menu.classList.contains('hidden');
                if (isOpen) {
                    menu.classList.add('hidden');
                    toggle.setAttribute('aria-expanded', 'false');
                } else {
                    menu.classList.remove('hidden');
                    toggle.setAttribute('aria-expanded', 'true');
                }
            });

            // Close menu when clicking links
            menu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    menu.classList.add('hidden');
                    toggle.setAttribute('aria-expanded', 'false');
                });
            });
        }
    };

    setupMobileMenu('mobile-menu-toggle', 'mobile-menu');
    setupMobileMenu('sterling-mobile-menu-toggle', 'sterling-mobile-menu');

    // Toast System
    const showToast = (message, type = 'success') => {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        const toastIcon = document.getElementById('toast-icon');

        if (!toast || !toastMessage) return;

        toastMessage.textContent = message;

        if (type === 'success') {
            toastIcon.classList.remove('text-destructive', 'bg-destructive/10');
            toastIcon.classList.add('text-primary', 'bg-primary/10');
            toastIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        } else {
            toastIcon.classList.remove('text-primary', 'bg-primary/10');
            toastIcon.classList.add('text-destructive', 'bg-destructive/10');
            toastIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
        }

        toast.classList.remove('translate-y-20');
        toast.classList.add('translate-y-0');

        setTimeout(() => {
            toast.classList.remove('translate-y-0');
            toast.classList.add('translate-y-20');
        }, 3000);
    };

    // Form Submissions
    const setupForm = (formId, successMessage) => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const btn = form.querySelector('button[type="submit"]');
                const btnText = btn.querySelector('.btn-text');
                const originalText = btnText.textContent;

                // Validation
                const formData = new FormData(form);
                let isValid = true;
                for (let [name, value] of formData.entries()) {
                    if (form.elements[name].hasAttribute('required') && !value.trim()) {
                        isValid = false;
                        break;
                    }
                }

                if (!isValid) {
                    showToast('Please fill in all required fields.', 'error');
                    return;
                }

                btn.disabled = true;
                btnText.textContent = 'Sending...';

                // Simulate API Call
                await new Promise(resolve => setTimeout(resolve, 1000));

                btn.disabled = false;
                btnText.textContent = originalText;
                form.reset();
                showToast(successMessage);
            });
        }
    };

    setupForm('contact-form', "Thanks! We'll be in touch within 24 hours.");
    setupForm('sterling-contact-form', "Thank you — we'll be in touch within one business day.");

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Nav Background on Scroll
    const nav = document.getElementById('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                nav.classList.add('bg-background/95', 'shadow-sm');
                nav.classList.remove('bg-background/80');
            } else {
                nav.classList.remove('bg-background/95', 'shadow-sm');
                nav.classList.add('bg-background/80');
            }
        });
    }
});
