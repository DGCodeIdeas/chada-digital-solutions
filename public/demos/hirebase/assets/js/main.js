/**
 * HIREBASE — Main JavaScript
 * Job Board / Recruitment Platform
 */

document.addEventListener('DOMContentLoaded', function () {
  initMobileNav();
  initActiveNav();
  initScrollAnimations();
  initStatsCounter();
  initJobSearchFilter();
  initApplyForm();
  initToastSystem();
});

/* =====================================================
   1. Mobile Navigation
   ===================================================== */

function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener('click', function () {
    mobileNav.classList.toggle('open');
    const isOpen = mobileNav.classList.contains('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav when clicking a link
  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* =====================================================
   2. Active Navigation
   ===================================================== */

function initActiveNav() {
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll('.nav-link');

  links.forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href) return;

    // Exact match or path starts with href (for subpages)
    if (currentPath === href || currentPath.startsWith(href.replace(/\/$/, '')) && href !== '/') {
      link.classList.add('active');
    } else if (href === '/demos/hirebase/' && currentPath.includes('/demos/hirebase/job')) {
      // For job detail pages, keep Jobs active if on home
      // But we actually want Jobs active for job pages
      link.classList.remove('active');
    } else if (href === '/demos/hirebase/jobs/' && currentPath.includes('/demos/hirebase/job/')) {
      link.classList.add('active');
    }
  });
}

/* =====================================================
   3. Scroll Animations (IntersectionObserver)
   ===================================================== */

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.scroll-animate');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(function (el) {
    observer.observe(el);
  });
}

/* =====================================================
   4. Stats Counter Animation
   ===================================================== */

function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        animateCount(el, target, prefix, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(function (el) {
    observer.observe(el);
  });
}

function animateCount(el, target, prefix, suffix) {
  const duration = 2000;
  const startTime = performance.now();
  const startValue = 0;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(startValue + (target - startValue) * easeOut);
    el.textContent = prefix + current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* =====================================================
   5. Job Search & Filter (Jobs Page)
   ===================================================== */

function initJobSearchFilter() {
  const jobsContainer = document.querySelector('.jobs-grid');
  if (!jobsContainer) return;

  const searchInput = document.getElementById('job-search');
  const locationSelect = document.getElementById('job-location');
  const jobTypeSelect = document.getElementById('job-type-filter');
  const clearBtn = document.getElementById('clear-filters');
  const noResults = document.querySelector('.no-results');
  const pagination = document.querySelector('.pagination');
  const filterCheckboxes = document.querySelectorAll('.filter-checkbox');

  const jobCards = Array.from(jobsContainer.querySelectorAll('.job-card'));

  function filterJobs() {
    const keyword = (searchInput ? searchInput.value.toLowerCase().trim() : '');
    const location = locationSelect ? locationSelect.value.toLowerCase() : '';
    const jobType = jobTypeSelect ? jobTypeSelect.value.toLowerCase() : '';

    // Collect checked filter values
    const checkedTypes = Array.from(document.querySelectorAll('.filter-type:checked')).map(cb => cb.value.toLowerCase());
    const checkedCategories = Array.from(document.querySelectorAll('.filter-category:checked')).map(cb => cb.value.toLowerCase());
    const checkedExperience = Array.from(document.querySelectorAll('.filter-experience:checked')).map(cb => cb.value.toLowerCase());
    const checkedLocations = Array.from(document.querySelectorAll('.filter-location:checked')).map(cb => cb.value.toLowerCase());

    let visibleCount = 0;

    jobCards.forEach(function (card) {
      const title = (card.getAttribute('data-title') || '').toLowerCase();
      const company = (card.getAttribute('data-company') || '').toLowerCase();
      const cardLocation = (card.getAttribute('data-location') || '').toLowerCase();
      const cardType = (card.getAttribute('data-type') || '').toLowerCase();
      const cardCategory = (card.getAttribute('data-category') || '').toLowerCase();
      const cardExperience = (card.getAttribute('data-experience') || '').toLowerCase();

      // Keyword match
      const matchesKeyword = !keyword || title.includes(keyword) || company.includes(keyword);
      // Location match (search bar)
      const matchesLocation = !location || location === 'all' || cardLocation === location || (location === 'other' && !['lagos', 'abuja', 'remote', 'ibadan', 'port harcourt'].includes(cardLocation));
      // Job type match (search bar)
      const matchesJobType = !jobType || jobType === 'all' || cardType === jobType;
      // Sidebar filters
      const matchesTypeFilter = checkedTypes.length === 0 || checkedTypes.includes(cardType);
      const matchesCategoryFilter = checkedCategories.length === 0 || checkedCategories.includes(cardCategory);
      const matchesExperienceFilter = checkedExperience.length === 0 || checkedExperience.includes(cardExperience);
      const matchesLocationFilter = checkedLocations.length === 0 || checkedLocations.includes(cardLocation);

      const isVisible = matchesKeyword && matchesLocation && matchesJobType && matchesTypeFilter && matchesCategoryFilter && matchesExperienceFilter && matchesLocationFilter;

      if (isVisible) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Show/hide no results
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
    if (pagination) {
      pagination.style.display = visibleCount === 0 ? 'none' : 'flex';
    }
  }

  // Attach event listeners
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      // Debounce
      clearTimeout(searchInput._debounce);
      searchInput._debounce = setTimeout(filterJobs, 150);
    });
  }

  if (locationSelect) {
    locationSelect.addEventListener('change', filterJobs);
  }

  if (jobTypeSelect) {
    jobTypeSelect.addEventListener('change', filterJobs);
  }

  if (filterCheckboxes) {
    filterCheckboxes.forEach(function (cb) {
      cb.addEventListener('change', filterJobs);
    });
  }

  // Clear filters
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      if (searchInput) searchInput.value = '';
      if (locationSelect) locationSelect.value = 'all';
      if (jobTypeSelect) jobTypeSelect.value = 'all';
      document.querySelectorAll('.filter-checkbox').forEach(function (cb) {
        cb.checked = false;
      });
      filterJobs();
    });
  }

  // Clear filters from no-results state
  const clearBtnNoResults = document.getElementById('clear-filters-no-results');
  if (clearBtnNoResults) {
    clearBtnNoResults.addEventListener('click', function () {
      if (searchInput) searchInput.value = '';
      if (locationSelect) locationSelect.value = 'all';
      if (jobTypeSelect) jobTypeSelect.value = 'all';
      document.querySelectorAll('.filter-checkbox').forEach(function (cb) {
        cb.checked = false;
      });
      filterJobs();
    });
  }

  // Mobile filters toggle
  const mobileFilterToggle = document.querySelector('.filters-mobile-toggle');
  const mobileFilterPanel = document.querySelector('.filters-mobile-panel');
  if (mobileFilterToggle && mobileFilterPanel) {
    mobileFilterToggle.addEventListener('click', function () {
      mobileFilterPanel.classList.toggle('open');
      const isOpen = mobileFilterPanel.classList.contains('open');
      mobileFilterToggle.setAttribute('aria-expanded', isOpen);
    });
  }
}

/* =====================================================
   6. Apply Form (Job Detail Page)
   ===================================================== */

function initApplyForm() {
  const form = document.getElementById('apply-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Clear previous errors
    form.querySelectorAll('.form-error').forEach(function (el) {
      el.classList.remove('show');
    });
    form.querySelectorAll('.form-input').forEach(function (el) {
      el.classList.remove('error');
    });

    let isValid = true;

    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(function (field) {
      const value = field.value.trim();
      if (!value) {
        isValid = false;
        field.classList.add('error');
        const errorEl = field.closest('.form-group')?.querySelector('.form-error');
        if (errorEl) {
          errorEl.classList.add('show');
        }
      }
    });

    // Email validation
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailField.value.trim())) {
        isValid = false;
        emailField.classList.add('error');
        const errorEl = emailField.closest('.form-group')?.querySelector('.form-error');
        if (errorEl) {
          errorEl.textContent = 'Please enter a valid email address';
          errorEl.classList.add('show');
        }
      }
    }

    if (isValid) {
      showToast('Application submitted successfully! We\'ll be in touch.', 'success');
      form.reset();

      // Reset file display
      const fileDisplay = document.querySelector('.form-file-display span');
      if (fileDisplay) {
        fileDisplay.textContent = 'Upload your resume (PDF, DOCX)';
      }
    } else {
      showToast('Please fill in all required fields.', 'error');
    }
  });

  // File input display
  const fileInput = document.querySelector('.form-file-wrapper input[type="file"]');
  const fileDisplay = document.querySelector('.form-file-display span');
  if (fileInput && fileDisplay) {
    fileInput.addEventListener('change', function () {
      if (fileInput.files.length > 0) {
        fileDisplay.textContent = fileInput.files[0].name;
      } else {
        fileDisplay.textContent = 'Upload your resume (PDF, DOCX)';
      }
    });
  }

  // Clear error on input
  form.querySelectorAll('.form-input, .form-textarea').forEach(function (field) {
    field.addEventListener('input', function () {
      field.classList.remove('error');
      const errorEl = field.closest('.form-group')?.querySelector('.form-error');
      if (errorEl) {
        errorEl.classList.remove('show');
      }
    });
  });
}

/* =====================================================
   7. Toast System
   ===================================================== */

let toastContainer = null;

function initToastSystem() {
  // Container is created on first toast
}

function getToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

function showToast(message, type) {
  const container = getToastContainer();
  const toast = document.createElement('div');
  toast.className = 'toast ' + (type || 'success');
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');

  const iconSvg = type === 'error'
    ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" x2="9" y1="9" y2="15"/><line x1="9" x2="15" y1="9" y2="15"/></svg>'
    : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';

  toast.innerHTML = iconSvg + '<span>' + message + '</span>';
  container.appendChild(toast);

  // Auto dismiss after 3.8 seconds
  setTimeout(function () {
    toast.classList.add('hiding');
    toast.addEventListener('animationend', function () {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    });
  }, 3800);
}

// Expose globally for inline usage
window.showToast = showToast;
