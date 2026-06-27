/*!
 * Chada Digital — main.js
 * Alpine.js interactivity for the static build.
 * Handles: mobile nav menus, contact form validation/submission,
 * toast notifications, and the auto-updating footer year.
 */

import Alpine from 'alpinejs';

window.Alpine = Alpine;

/* ----------------------------------------------------------------
 * Toast notifications (Alpine.js replacement for sonner)
 * ------------------------------------------------------------- */

function toast(message, type) {
  const root = document.getElementById("toast-root");
  if (!root) return;

  const el = document.createElement("div");
  el.setAttribute("role", "status");
  el.textContent = message;

  const isError = type === "error";
  el.style.pointerEvents = "auto";
  el.style.minWidth = "260px";
  el.style.maxWidth = "360px";
  el.style.padding = "0.85rem 1.1rem";
  el.style.borderRadius = "0.75rem";
  el.style.fontSize = "0.85rem";
  el.style.fontWeight = "500";
  el.style.lineHeight = "1.4";
  el.style.boxShadow = "0 10px 30px -10px rgba(0,0,0,0.45)";
  el.style.background = isError ? "#3a1212" : "#10241c";
  el.style.color = isError ? "#fecaca" : "#bbf7d0";
  el.style.border = "1px solid " + (isError ? "#7f1d1d" : "#14532d");
  el.style.opacity = "0";
  el.style.transition = "opacity 200ms ease, transform 200ms ease";
  el.style.transform = "translateY(-8px)";

  root.appendChild(el);
  requestAnimationFrame(() => {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateY(-8px)";
    setTimeout(() => {
      el.remove();
    }, 200);
  }, 3800);
}

Alpine.data('toast', () => ({
  messages: [],
  
  show(message, type = 'success') {
    this.messages.push({ id: Date.now(), message, type });
    
    const root = document.getElementById("toast-root");
    if (!root) return;
    
    const el = document.createElement("div");
    el.setAttribute("role", "status");
    el.textContent = message;
    
    const isError = type === "error";
    el.style.pointerEvents = "auto";
    el.style.minWidth = "260px";
    el.style.maxWidth = "360px";
    el.style.padding = "0.85rem 1.1rem";
    el.style.borderRadius = "0.75rem";
    el.style.fontSize = "0.85rem";
    el.style.fontWeight = "500";
    el.style.lineHeight = "1.4";
    el.style.boxShadow = "0 10px 30px -10px rgba(0,0,0,0.45)";
    el.style.background = isError ? "#3a1212" : "#10241c";
    el.style.color = isError ? "#fecaca" : "#bbf7d0";
    el.style.border = "1px solid " + (isError ? "#7f1d1d" : "#14532d");
    el.style.opacity = "0";
    el.style.transition = "opacity 200ms ease, transform 200ms ease";
    el.style.transform = "translateY(-8px)";
    
    root.appendChild(el);
    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
    
    setTimeout(() => {
      el.style.opacity = "0";
      el.style.transform = "translateY(-8px)";
      setTimeout(() => {
        el.remove();
        this.messages = this.messages.filter(m => m.id !== Date.now());
      }, 200);
    }, 3800);
  }
}));

/* ----------------------------------------------------------------
 * Mobile navigation menus
 * ------------------------------------------------------------- */

Alpine.data('mobileNav', (toggleId, panelId) => ({
  open: false,
  
  init() {
    this.$watch('open', (value) => {
      const panel = document.getElementById(panelId);
      const toggle = document.getElementById(toggleId);
      if (panel) {
        panel.classList.toggle("hidden", !value);
      }
      if (toggle) {
        toggle.setAttribute("aria-expanded", value ? "true" : "false");
      }
    });
    
    this.$nextTick(() => {
      const toggle = document.getElementById(toggleId);
      if (toggle) {
        toggle.addEventListener('click', () => {
          this.open = !this.open;
        });
        
        const panel = document.getElementById(panelId);
        if (panel) {
          panel.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
              this.open = false;
            });
          });
        }
      }
    });
  }
}));

/* ----------------------------------------------------------------
 * Sterling & Vale menu icon swap (hamburger <-> close)
 * ------------------------------------------------------------- */

Alpine.data('sterlingIconSwap', () => ({
  open: false,
  
  init() {
    this.$watch('open', (value) => {
      const icon = document.getElementById("sv-nav-icon");
      if (icon) {
        const MENU_PATHS = '<path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path>';
        const X_PATHS = '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>';
        icon.innerHTML = value ? X_PATHS : MENU_PATHS;
        icon.classList.toggle("lucide-menu", !value);
        icon.classList.toggle("lucide-x", value);
      }
    });
    
    this.$nextTick(() => {
      const toggle = document.getElementById("sv-nav-toggle");
      if (toggle) {
        toggle.addEventListener('click', () => {
          this.open = !this.open;
        });
      }
    });
  }
}));

/* ----------------------------------------------------------------
 * Chada Digital contact form (#contact)
 * ------------------------------------------------------------- */

Alpine.data('chadaContactForm', () => ({
  name: '',
  email: '',
  message: '',
  isSubmitting: false,
  
  get isValid() {
    return this.name && this.email && this.message;
  },
  
  async submit() {
    if (!this.isValid) {
      toast("Please fill in your name, email, and a quick message.", "error");
      return;
    }
    
    this.isSubmitting = true;
    
    const submitBtn = this.$el.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    
    try {
      await new Promise(resolve => setTimeout(resolve, 700));
      toast("Thanks! We'll be in touch within 24 hours.", "success");
      this.name = '';
      this.email = '';
      this.message = '';
    } finally {
      this.isSubmitting = false;
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }
}));

/* ----------------------------------------------------------------
 * Sterling & Vale contact form
 * ------------------------------------------------------------- */

Alpine.data('sterlingContactForm', () => ({
  name: '',
  email: '',
  phone: '',
  message: '',
  isSubmitting: false,
  
  get isValid() {
    return this.name && this.email && this.message;
  },
  
  async submit() {
    if (!this.isValid) {
      toast("Please fill in all required fields.", "error");
      return;
    }
    
    this.isSubmitting = true;
    
    const submitBtn = this.$el.querySelector('button');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    
    try {
      await new Promise(resolve => setTimeout(resolve, 700));
      toast("Thank you — we'll be in touch within one business day.", "success");
      this.name = '';
      this.email = '';
      this.phone = '';
      this.message = '';
    } finally {
      this.isSubmitting = false;
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }
}));

/* ----------------------------------------------------------------
 * Footer year
 * ------------------------------------------------------------- */

Alpine.data('footerYear', () => ({
  year: new Date().getFullYear()
}));

/* ----------------------------------------------------------------
 * Projects Modal (All Projects grid)
 * ------------------------------------------------------------- */

Alpine.data('projectsModal', () => ({
  isOpen: false,
  scrollY: 0,
  scrollbarWidth: 0,
  lastFocused: null,
  
  init() {
    this.scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    this.$watch('isOpen', (value) => {
      const modal = document.getElementById("projects-modal");
      const closeBtn = document.getElementById("projects-modal-close");
      const backdrop = modal?.querySelector(".modal-backdrop");
      const panel = modal?.querySelector(".modal-panel");
      const body = document.body;
      const html = document.documentElement;
      
      if (value) {
        this.lastFocused = document.activeElement;
        this.scrollY = window.scrollY || html.scrollTop;
        html.style.overflow = "hidden";
        body.style.overflow = "hidden";
        body.style.paddingRight = this.scrollbarWidth + "px";
        modal.classList.remove("hidden");
        modal.setAttribute("aria-hidden", "false");
        
        requestAnimationFrame(() => {
          backdrop.style.opacity = "1";
          backdrop.style.backdropFilter = "blur(12px)";
          backdrop.style.webkitBackdropFilter = "blur(12px)";
          panel.style.opacity = "1";
          panel.style.transform = "scale(1) translateY(0)";
        });
        
        const focusableSelectors = "a[href], button, textarea, input[type=text], input[type=radio], input[type=checkbox], select";
        const focusables = Array.from(modal.querySelectorAll(focusableSelectors)).filter(el => el.offsetParent !== null);
        
        if (focusables.length) {
          focusables[0].focus();
        }
        
        document.addEventListener("keydown", this.handleKeyDown);
        modal.addEventListener("click", this.handleBackdropClick);
      } else {
        backdrop.style.opacity = "0";
        backdrop.style.backdropFilter = "blur(0px)";
        backdrop.style.webkitBackdropFilter = "blur(0px)";
        panel.style.opacity = "0";
        panel.style.transform = "scale(0.95) translateY(1rem)";
        
        setTimeout(() => {
          modal.classList.add("hidden");
          modal.setAttribute("aria-hidden", "true");
          html.style.overflow = "";
          body.style.overflow = "";
          body.style.paddingRight = "";
          window.scrollTo(0, this.scrollY);
          document.removeEventListener("keydown", this.handleKeyDown);
          modal.removeEventListener("click", this.handleBackdropClick);
          if (this.lastFocused) this.lastFocused.focus();
        }, 300);
      }
    });
  },
  
  handleKeyDown(e) {
    const modal = document.getElementById("projects-modal");
    const focusableSelectors = "a[href], button, textarea, input[type=text], input[type=radio], input[type=checkbox], select";
    const focusables = Array.from(modal.querySelectorAll(focusableSelectors)).filter(el => el.offsetParent !== null);
    
    if (focusables.length === 0) return;
    
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    
    if (e.key === "Tab" && e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else if (e.key === "Tab") {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    } else if (e.key === "Escape") {
      this.isOpen = false;
    }
  },
  
  handleBackdropClick(e) {
    const modal = document.getElementById("projects-modal");
    const backdrop = modal?.querySelector(".modal-backdrop");
    
    if (e.target === modal || e.target === backdrop) {
      this.isOpen = false;
    }
  },
  
  open() {
    this.isOpen = true;
  },
  
  close() {
    this.isOpen = false;
  }
}));

/* ----------------------------------------------------------------
 * Init
 * ------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  Alpine.start();
});
