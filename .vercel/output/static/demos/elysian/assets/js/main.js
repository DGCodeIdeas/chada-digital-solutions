/* ========================================
   ELYSIAN — Main JavaScript
   Built by Chada Digital
   ======================================== */

(function() {
  'use strict';

  /* ---------- Room Data ---------- */
  const rooms = [
    { id: 1, name: 'Deluxe Garden Suite', price: 285, guests: 2, size: '45 m²', desc: 'Overlooking our private gardens, this suite features a king bed, rainfall shower, and a private terrace perfect for morning coffee.', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=450&fit=crop&q=80', images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1590490360182-c33d3d21d2c8?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=450&fit=crop&q=80'], amenities: ['King Bed', 'Rainfall Shower', 'Private Terrace', 'Garden View', 'Smart TV', 'Mini Bar', 'WiFi', 'Room Service'] },
    { id: 2, name: 'Ocean View Pavilion', price: 420, guests: 2, size: '55 m²', desc: 'Perched at the edge of the property, wake up to panoramic ocean views. Features a plunge pool and outdoor living area.', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=450&fit=crop&q=80', images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1590490360182-c33d3d21d2c8?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=450&fit=crop&q=80'], amenities: ['King Bed', 'Plunge Pool', 'Ocean View', 'Outdoor Living', 'Smart TV', 'Mini Bar', 'WiFi', 'Butler Service'] },
    { id: 3, name: 'Garden Villa', price: 380, guests: 4, size: '85 m²', desc: 'A two-bedroom villa nestled in lush gardens. Perfect for families or friends seeking space and serenity together.', image: 'https://images.unsplash.com/photo-1590490360182-c33d3d21d2c8?w=600&h=450&fit=crop&q=80', images: ['https://images.unsplash.com/photo-1590490360182-c33d3d21d2c8?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=450&fit=crop&q=80'], amenities: ['2 Bedrooms', 'Kitchenette', 'Garden Access', 'Private Patio', 'Smart TV', 'Mini Bar', 'WiFi', 'Room Service'] },
    { id: 4, name: 'The Penthouse', price: 750, guests: 2, size: '120 m²', desc: 'Our most exclusive offering. A private rooftop terrace, infinity jacuzzi, and 360-degree views of the ocean and gardens.', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=450&fit=crop&q=80', images: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1590490360182-c33d3d21d2c8?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=450&fit=crop&q=80'], amenities: ['King Bed', 'Rooftop Terrace', 'Infinity Jacuzzi', '360° Views', 'Smart TV', 'Private Chef', 'WiFi', 'Butler Service'] },
    { id: 5, name: 'Zen Spa Suite', price: 320, guests: 2, size: '50 m²', desc: 'Designed for wellness. Includes private spa access, meditation corner, and organic amenities throughout.', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=450&fit=crop&q=80', images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1590490360182-c33d3d21d2c8?w=600&h=450&fit=crop&q=80'], amenities: ['King Bed', 'Private Spa Access', 'Meditation Corner', 'Garden View', 'Smart TV', 'Organic Amenities', 'WiFi', 'Yoga Mat'] },
    { id: 6, name: 'Family Loft', price: 340, guests: 5, size: '75 m²', desc: 'A spacious loft with mezzanine bedroom, kids corner, and a kitchenette for family meals. Garden views included.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=450&fit=crop&q=80', images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=450&fit=crop&q=80', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=450&fit=crop&q=80'], amenities: ['Mezzanine Bed', 'Kids Corner', 'Kitchenette', 'Garden View', 'Smart TV', 'Board Games', 'WiFi', 'Baby Cot'] }
  ];

  /* ---------- Render Room Cards ---------- */
  function renderRoomCard(room) {
    return `
      <div class="room-card" data-id="${room.id}">
        <div class="room-image">
          <img src="${room.image}" alt="${room.name}" loading="lazy" />
          <div class="room-price-tag">From <span>$${room.price}</span> / night</div>
        </div>
        <div class="room-info">
          <h3 class="room-name">${room.name}</h3>
          <p class="room-desc">${room.desc.substring(0, 80)}...</p>
          <div class="room-features">
            <span class="room-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> ${room.guests} Guests</span>
            <span class="room-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/></svg> ${room.size}</span>
          </div>
          <a href="./room/?id=${room.id}" class="room-btn">View Details</a>
        </div>
      </div>
    `;
  }

  const roomsGrid = document.getElementById('rooms-grid');
  if (roomsGrid) {
    roomsGrid.innerHTML = rooms.slice(0, 3).map(renderRoomCard).join('');
  }

  const allRoomsGrid = document.getElementById('all-rooms-grid');
  if (allRoomsGrid) {
    allRoomsGrid.innerHTML = rooms.map(renderRoomCard).join('');
  }

  /* ---------- Room Detail Page ---------- */
  const roomDetail = document.getElementById('room-detail');
  if (roomDetail) {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id')) || 1;
    const room = rooms.find(r => r.id === id) || rooms[0];

    document.getElementById('rd-name').textContent = room.name;
    document.getElementById('rd-price').textContent = `$${room.price}`;
    document.getElementById('rd-desc').textContent = room.desc;
    document.getElementById('rd-guests').textContent = room.guests + ' Guests';
    document.getElementById('rd-size').textContent = room.size;

    const gallery = document.getElementById('rd-gallery');
    gallery.innerHTML = room.images.map((img, i) =>
      `<img src="${img}" alt="${room.name}" class="room-gallery-img ${i === 0 ? '' : ''}" />`
    ).join('');

    const amenityList = document.getElementById('rd-amenities');
    amenityList.innerHTML = room.amenities.map(a =>
      `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> ${a}</li>`
    ).join('');

    // Booking widget
    const checkin = document.getElementById('rd-checkin');
    const checkout = document.getElementById('rd-checkout');
    const guests = document.getElementById('rd-guests');
    const totalEl = document.getElementById('rd-total');
    const bookBtn = document.getElementById('rd-book');

    // Set min dates
    const today = new Date().toISOString().split('T')[0];
    if (checkin) { checkin.min = today; checkin.value = today; }
    if (checkout) { checkout.min = today; }

    function calcTotal() {
      if (!checkin.value || !checkout.value) return;
      const start = new Date(checkin.value);
      const end = new Date(checkout.value);
      const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
      const total = nights * room.price;
      totalEl.textContent = '$' + total;
      return total;
    }

    [checkin, checkout].forEach(el => el && el.addEventListener('change', calcTotal));
    if (checkin && checkout) calcTotal();

    if (bookBtn) {
      bookBtn.addEventListener('click', () => {
        if (!checkin.value || !checkout.value) { showToast('Please select check-in and check-out dates'); return; }
        const total = calcTotal();
        showToast(`Booking request sent for ${room.name}. Total: $${total}`);
        setTimeout(() => { window.location.href = '../booking/?id=' + room.id; }, 1200);
      });
    }
  }

  /* ---------- Calendar Widget ---------- */
  const calendarEl = document.getElementById('calendar');
  if (calendarEl) {
    let currentMonth = new Date();
    let selectedStart = null;
    let selectedEnd = null;

    function renderCalendar() {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const prevDaysInMonth = new Date(year, month, 0).getDate();

      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      document.getElementById('cal-month').textContent = monthNames[month] + ' ' + year;

      let html = '<div class="calendar-day-label">Su</div><div class="calendar-day-label">Mo</div><div class="calendar-day-label">Tu</div><div class="calendar-day-label">We</div><div class="calendar-day-label">Th</div><div class="calendar-day-label">Fr</div><div class="calendar-day-label">Sa</div>';

      // Previous month
      for (let i = firstDay - 1; i >= 0; i--) {
        html += `<div class="calendar-day other-month">${prevDaysInMonth - i}</div>`;
      }

      // Current month
      const today = new Date();
      for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, month, d);
        const isToday = date.toDateString() === today.toDateString();
        const isPast = date < new Date(today.setHours(0,0,0,0));
        const isSelected = selectedStart && date.toDateString() === selectedStart.toDateString();
        const isEnd = selectedEnd && date.toDateString() === selectedEnd.toDateString();
        const inRange = selectedStart && selectedEnd && date > selectedStart && date < selectedEnd;

        let classes = 'calendar-day';
        if (isPast) classes += ' disabled';
        if (isSelected || isEnd) classes += ' selected';
        if (inRange) classes += ' range';
        if (isToday && !isSelected) classes += ' today';

        html += `<div class="${classes}" data-day="${d}" data-month="${month}" data-year="${year}">${d}</div>`;
      }

      // Next month
      const totalCells = firstDay + daysInMonth;
      const remaining = 42 - totalCells;
      for (let d = 1; d <= remaining; d++) {
        html += `<div class="calendar-day other-month">${d}</div>`;
      }

      calendarEl.innerHTML = html;

      // Add click handlers
      calendarEl.querySelectorAll('.calendar-day:not(.disabled):not(.other-month)').forEach(day => {
        day.addEventListener('click', () => {
          const d = parseInt(day.dataset.day);
          const m = parseInt(day.dataset.month);
          const y = parseInt(day.dataset.year);
          const clicked = new Date(y, m, d);

          if (!selectedStart || (selectedStart && selectedEnd)) {
            selectedStart = clicked;
            selectedEnd = null;
          } else if (selectedStart && !selectedEnd) {
            if (clicked < selectedStart) {
              selectedEnd = selectedStart;
              selectedStart = clicked;
            } else {
              selectedEnd = clicked;
            }
          }
          renderCalendar();
          updateBookingSummary();
        });
      });
    }

    function updateBookingSummary() {
      const nightsEl = document.getElementById('summary-nights');
      const totalEl = document.getElementById('summary-total');
      const datesEl = document.getElementById('summary-dates');
      const priceEl = document.getElementById('summary-price');
      const room = rooms.find(r => r.id === parseInt(new URLSearchParams(window.location.search).get('id'))) || rooms[0];

      if (selectedStart && selectedEnd) {
        const nights = Math.ceil((selectedEnd - selectedStart) / (1000 * 60 * 60 * 24));
        const total = nights * room.price;
        if (nightsEl) nightsEl.textContent = nights;
        if (totalEl) totalEl.textContent = '$' + total;
        if (datesEl) datesEl.textContent = selectedStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' – ' + selectedEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        if (priceEl) priceEl.textContent = '$' + room.price;
      } else if (selectedStart) {
        if (datesEl) datesEl.textContent = selectedStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
    }

    document.getElementById('cal-prev')?.addEventListener('click', () => { currentMonth.setMonth(currentMonth.getMonth() - 1); renderCalendar(); });
    document.getElementById('cal-next')?.addEventListener('click', () => { currentMonth.setMonth(currentMonth.getMonth() + 1); renderCalendar(); });

    renderCalendar();
  }

  /* ---------- Booking Form ---------- */
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = bookingForm.querySelector('button[type="submit"]');
      btn.textContent = 'Confirming...';
      btn.disabled = true;
      setTimeout(() => {
        showToast('Your reservation is confirmed! A confirmation email has been sent.');
        btn.textContent = 'Confirm Booking';
        btn.disabled = false;
      }, 2000);
    });
  }

  /* ---------- Home Booking Widget ---------- */
  const homeBooking = document.getElementById('home-booking');
  if (homeBooking) {
    const checkin = document.getElementById('checkin');
    const checkout = document.getElementById('checkout');
    const today = new Date().toISOString().split('T')[0];
    checkin.min = today;
    checkout.min = today;
    checkin.value = today;

    homeBooking.addEventListener('submit', (e) => {
      e.preventDefault();
      const roomType = document.getElementById('roomtype').value;
      const url = roomType ? './room/?id=1' : './rooms/';
      window.location.href = url;
    });
  }

  /* ---------- Contact Form ---------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for your message. We will respond within 24 hours.');
      contactForm.reset();
    });
  }

  /* ---------- Navigation ---------- */
  const navHeader = document.getElementById('nav-header');
  if (navHeader) {
    window.addEventListener('scroll', () => {
      navHeader.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '64px';
      navMenu.style.left = '0';
      navMenu.style.right = '0';
      navMenu.style.background = 'rgba(10,10,10,0.95)';
      navMenu.style.padding = '20px';
      navMenu.style.gap = '0';
    });
  }

  /* ---------- Toast ---------- */
  window.showToast = function(message) {
    let t = document.querySelector('.toast');
    if (t) t.remove();
    t = document.createElement('div');
    t.className = 'toast';
    t.textContent = message;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  };

  /* ---------- Scroll Animations ---------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.room-card, .amenity-item, .testimonial-card, .gallery-item, .section-header').forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });

  console.log('ELYSIAN loaded — Built by Chada Digital');
})();
