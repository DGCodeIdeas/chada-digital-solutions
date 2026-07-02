/* ========================================
   APEXFLOW — Main JavaScript
   Built by Chada Digital
   ======================================== */

(function() {
  'use strict';

  /* ---------- Navigation ---------- */
  const navHeader = document.getElementById('nav-header');
  if (navHeader) {
    window.addEventListener('scroll', () => {
      navHeader.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ---------- Mobile Menu ---------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const spans = mobileToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  /* ---------- AI Chat Widget ---------- */
  const chatWidget = document.getElementById('chat-widget');
  const chatToggle = document.getElementById('chat-toggle');
  const chatPanel = document.getElementById('chat-panel');
  const chatBody = document.getElementById('chat-body');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');

  if (chatToggle && chatPanel) {
    chatToggle.addEventListener('click', () => {
      chatWidget.classList.toggle('open');
      if (chatWidget.classList.contains('open') && chatInput) {
        setTimeout(() => chatInput.focus(), 300);
      }
    });
  }

  const aiResponses = [
    "That's a great question! ApexFlow can handle up to 10,000 conversations per month on our Pro plan.",
    "I can help you set up your first automation workflow. Would you like to schedule a quick walkthrough?",
    "Our AI is trained on your specific data, so it understands your business and speaks your brand's voice.",
    "You can integrate ApexFlow with WhatsApp, email, your website, and 50+ other channels.",
    "The setup takes about 10 minutes. Just connect your channels and upload your FAQ — our AI handles the rest!",
    "We offer a 14-day free trial with full access to all features. No credit card required.",
    "ApexFlow is SOC 2 compliant with end-to-end encryption. Your data is always secure.",
    "Our customers see an average 40% increase in qualified leads within the first month."
  ];

  function addChatMessage(text, isUser = false) {
    if (!chatBody) return;
    const msg = document.createElement('div');
    msg.className = 'chat-msg ' + (isUser ? 'user' : 'bot');
    msg.style.animation = 'msgSlide 0.3s ease forwards';
    msg.innerHTML = isUser
      ? `<div class="chat-bubble">${escapeHtml(text)}</div>`
      : `<div class="chat-avatar">AI</div><div class="chat-bubble">${escapeHtml(text)}</div>`;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function handleChatSend() {
    if (!chatInput) return;
    const text = chatInput.value.trim();
    if (!text) return;
    addChatMessage(text, true);
    chatInput.value = '';

    // Simulate typing delay
    setTimeout(() => {
      const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      addChatMessage(response, false);
    }, 800 + Math.random() * 600);
  }

  if (chatSend) {
    chatSend.addEventListener('click', handleChatSend);
  }
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleChatSend();
    });
  }

  /* ---------- Scroll Animations (Fade In) ---------- */
  const fadeElements = document.querySelectorAll('.feature-card, .step-card, .testimonial-card, .pricing-card, .faq-item');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
  });

  /* ---------- Counter Animation ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const start = performance.now();

        function update(currentTime) {
          const elapsed = currentTime - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(target * eased);
          el.textContent = current.toLocaleString();
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  /* ---------- Waitlist Form ---------- */
  const waitlistForm = document.getElementById('waitlist-form');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = waitlistForm.querySelector('input[type="email"]');
      const btn = waitlistForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      if (!input.value || !input.value.includes('@')) {
        showToast('Please enter a valid email address', 'error');
        return;
      }

      btn.textContent = 'Joining...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        input.value = '';
        showToast('You\'re on the list! We\'ll be in touch soon.', 'success');
      }, 1200);
    });
  }

  /* ---------- Toast Notification System ---------- */
  window.showToast = function(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${type === 'success'
          ? '<polyline points="20 6 9 17 4 12"/>'
          : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'
        }
      </svg>
      <span>${escapeHtml(message)}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = navHeader ? navHeader.offsetHeight : 0;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Parallax Effect for Hero Orbs ---------- */
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const orbs = heroSection.querySelectorAll('.gradient-orb');
      orbs.forEach((orb, i) => {
        const speed = 0.1 + (i * 0.05);
        orb.style.transform = `translateY(${scrollY * speed}px)`;
      });
    }, { passive: true });
  }

  /* ---------- Mock Data Table Row Hover Effect ---------- */
  const dataTable = document.querySelector('.data-table tbody');
  if (dataTable) {
    dataTable.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      if (row) {
        showToast('Lead details would open here in the full app', 'success');
      }
    });
  }

  /* ---------- Button Click Feedback ---------- */
  document.querySelectorAll('.btn').forEach(btn => {
    if (!btn.closest('form') && !btn.id) {
      btn.addEventListener('click', (e) => {
        if (btn.getAttribute('href') === '#') {
          e.preventDefault();
          showToast('This feature is available in the full application', 'success');
        }
      });
    }
  });

  /* ---------- Keyboard Shortcut for Chat (Cmd/Ctrl + K) ---------- */
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (chatWidget) {
        chatWidget.classList.toggle('open');
        if (chatWidget.classList.contains('open') && chatInput) {
          setTimeout(() => chatInput.focus(), 300);
        }
      }
    }
  });

  console.log('🚀 ApexFlow loaded — Built by Chada Digital');
})();
