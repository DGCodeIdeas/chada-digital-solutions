/*!
 * Chada Digital — main.js
 * Vanilla JS interactivity for the static build.
 * Handles: mobile nav menus, contact form validation/submission,
 * toast notifications, and the auto-updating footer year.
 */
(function () {
  "use strict";

  /* ----------------------------------------------------------------
   * Toast notifications (lightweight replacement for sonner)
   * ------------------------------------------------------------- */
  function ensureToastRoot() {
    var root = document.getElementById("toast-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "toast-root";
      root.setAttribute("aria-live", "polite");
      root.setAttribute("aria-atomic", "false");
      root.style.position = "fixed";
      root.style.top = "1rem";
      root.style.left = "50%";
      root.style.transform = "translateX(-50%)";
      root.style.zIndex = "9999";
      root.style.display = "flex";
      root.style.flexDirection = "column";
      root.style.gap = "0.5rem";
      root.style.pointerEvents = "none";
      document.body.appendChild(root);
    }
    return root;
  }

  function toast(message, type) {
    var root = ensureToastRoot();
    var el = document.createElement("div");
    el.setAttribute("role", "status");
    el.textContent = message;

    var isError = type === "error";
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
    requestAnimationFrame(function () {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });

    setTimeout(function () {
      el.style.opacity = "0";
      el.style.transform = "translateY(-8px)";
      setTimeout(function () {
        el.remove();
      }, 200);
    }, 3800);
  }

  /* ----------------------------------------------------------------
   * Mobile navigation menus
   * ------------------------------------------------------------- */
  function setupMobileNav(toggleId, panelId) {
    var toggle = document.getElementById(toggleId);
    var panel = document.getElementById(panelId);
    if (!toggle || !panel) return;

    function setOpen(open) {
      panel.classList.toggle("hidden", !open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      setOpen(!isOpen);
    });

    // Close the menu after a link is tapped
    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });
  }

  /* Sterling & Vale menu icon swap (hamburger <-> close) */
  function setupSterlingIconSwap() {
    var toggle = document.getElementById("sv-nav-toggle");
    var icon = document.getElementById("sv-nav-icon");
    if (!toggle || !icon) return;

    var MENU_PATHS =
      '<path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path>';
    var X_PATHS = '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>';

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      icon.innerHTML = open ? X_PATHS : MENU_PATHS;
      icon.classList.toggle("lucide-menu", !open);
      icon.classList.toggle("lucide-x", open);
    });
  }

  /* ----------------------------------------------------------------
   * Chada Digital contact form (#contact)
   * ------------------------------------------------------------- */
  function setupChadaContactForm() {
    var form = document.getElementById("chada-contact-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements["name"].value.trim();
      var email = form.elements["email"].value.trim();
      var message = form.elements["message"].value.trim();

      if (!name || !email || !message) {
        toast("Please fill in your name, email, and a quick message.", "error");
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      // Simulate the async submission the original React app performed.
      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        toast("Thanks! We'll be in touch within 24 hours.", "success");
        form.reset();
      }, 700);
    });
  }

  /* ----------------------------------------------------------------
   * Sterling & Vale contact form
   * ------------------------------------------------------------- */
  function setupSterlingContactForm() {
    var form = document.getElementById("sv-contact-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var submitBtn = form.querySelector("button");
      var originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();
        toast("Thank you — we'll be in touch within one business day.", "success");
      }, 700);
    });
  }

  /* ----------------------------------------------------------------
   * Footer year
   * ------------------------------------------------------------- */
  function setupFooterYear() {
    var el = document.getElementById("copyright-year");
    if (el) {
      el.textContent = new Date().getFullYear();
    }
  }

  /* ----------------------------------------------------------------
   * Init
   * ------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    setupMobileNav("nav-toggle", "mobile-menu");
    setupMobileNav("sv-nav-toggle", "sv-mobile-menu");
    setupSterlingIconSwap();
    setupChadaContactForm();
    setupSterlingContactForm();
    setupFooterYear();
  });
})();
