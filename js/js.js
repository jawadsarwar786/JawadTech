// EmailJS Init
  emailjs.init({
    publicKey: "RCgyc5Jv-C5nUieTZ",
    blockHeadless: true
  });

  // Dark/Light Theme Handler
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');

  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);
  updateThemeUI(savedTheme);

  themeToggle.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeUI(newTheme);
  });

  function updateThemeUI(theme) {
      if (theme === 'dark') {
          themeIcon.textContent = '🌙';
          themeText.textContent = 'Dark';
      } else {
          themeIcon.textContent = '☀️';
          themeText.textContent = 'Light';
      }
  }

  // Mobile Menu Layouts
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');

  menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
          navLinks.classList.remove('active');
      });
  });

  // MULTI-INTERSECTION OBSERVER ENGINE (For Animations & Skills)
  const skillCards = document.querySelectorAll('.skill-card');
  const revealSections = document.querySelectorAll('.reveal-section');

  // 1. Scroll-driven Section Reveal
  const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('active');
          }
      });
  }, { threshold: 0.1 });

  revealSections.forEach(section => sectionObserver.observe(section));

  // 2. Skills Load Bar Animation
  const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const card = entry.target;
              const targetPercent = parseInt(card.getAttribute('data-percent'));
              const fillBar = card.querySelector('.progress-bar-fill');
              const percentText = card.querySelector('.skill-percentage');
              
              fillBar.style.width = targetPercent + '%';
              
              let currentCount = 0;
              const duration = 1500; 
              const frameRate = 1000 / 60; 
              const totalFrames = duration / frameRate;
              const increment = targetPercent / totalFrames;
              
              const counterInterval = setInterval(() => {
                  currentCount += increment;
                  if (currentCount >= targetPercent) {
                      percentText.textContent = targetPercent + '%';
                      clearInterval(counterInterval);
                  } else {
                      percentText.textContent = Math.floor(currentCount) + '%';
                  }
              }, frameRate);
              
              observer.unobserve(card);
          }
      });
  }, { threshold: 0.15 });

  skillCards.forEach(card => skillObserver.observe(card));

  // Form Submission
  document.getElementById("contact-form").addEventListener("submit", function(event) {
      event.preventDefault();

      var templateParams = {
          name: this.querySelector('[name="name"]').value,
          email: this.querySelector('[name="email"]').value,
          message: this.querySelector('[name="message"]').value
      };

      emailjs.send("service_ymlfzq5", "template_mfgbxmd", templateParams)
      .then(function() {
          alert("Message sent successfully!");
          document.getElementById("contact-form").reset();
      }, function(error) {
          alert("Failed to send message!");
          console.error("EmailJS Error:", error);
      });
  });