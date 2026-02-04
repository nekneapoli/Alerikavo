document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav__toggle");
  const navList = document.querySelector(".nav__list");
  const scrollTopButton = document.querySelector(".scroll-top");

  if (navToggle && navList) {
    navToggle.addEventListener("click", function () {
      navList.classList.toggle("nav__list--open");
    });

    navList.addEventListener("click", function (event) {
      const target = event.target;
      if (target instanceof HTMLElement && target.matches("a[href^='#']")) {
        navList.classList.remove("nav__list--open");
      }
    });
  }

  const links = document.querySelectorAll("a[href^='#']");

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const href = link.getAttribute("href");
      if (!href) {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  if (scrollTopButton) {
    scrollTopButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function handleScroll() {
    const offsetToShow = window.innerHeight * 0.6;

    if (scrollTopButton) {
      if (window.scrollY > offsetToShow) {
        scrollTopButton.classList.add("scroll-top--visible");
      } else {
        scrollTopButton.classList.remove("scroll-top--visible");
      }
    }
  }

  window.addEventListener("scroll", handleScroll);

  function setTextById(id, value) {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }

    if (typeof value === "string") {
      element.textContent = value;
    }
  }

  if (typeof siteContent === "object" && siteContent !== null) {
    const c = siteContent;

    // Навигация и общий UI
    setTextById("nav-logo", c.ui.logo);
    setTextById("nav-services", c.ui.navServices);
    setTextById("nav-about", c.ui.navAbout);
    setTextById("nav-contacts", c.ui.navContacts);
    setTextById("scroll-top-button", c.ui.scrollTop);

    // Hero
    setTextById("hero-overline", c.hero.overline);
    setTextById("hero-title", c.hero.title);
    setTextById("hero-subtitle", c.hero.subtitle);
    setTextById("hero-primary-cta", c.hero.primaryCta);
    setTextById("hero-secondary-cta", c.hero.secondaryCta);
    setTextById("hero-photo-placeholder", c.hero.photoPlaceholder);

    // Services
    setTextById("services-title", c.services.title);
    setTextById("services-subtitle", c.services.subtitle);

    setTextById("service-individual-title", c.services.individual.title);
    setTextById("service-individual-text", c.services.individual.text);
    setTextById("service-individual-price", c.services.individual.price);

    setTextById("service-groups-title", c.services.groups.title);
    setTextById("service-groups-text", c.services.groups.text);

    const groupsList = document.getElementById("service-groups-list");
    if (groupsList && Array.isArray(c.services.groups.prices)) {
      groupsList.innerHTML = "";
      c.services.groups.prices.forEach(function (item) {
        const li = document.createElement("li");
        li.textContent = item;
        groupsList.appendChild(li);
      });
    }

    setTextById("service-wedding-title", c.services.wedding.title);
    setTextById("service-wedding-text", c.services.wedding.text);
    setTextById("service-wedding-price", c.services.wedding.price);
    setTextById("service-wedding-note", c.services.wedding.note);

    setTextById("service-graduation-title", c.services.graduation.title);
    setTextById("service-graduation-text", c.services.graduation.text);
    setTextById("service-graduation-price", c.services.graduation.price);
    setTextById("service-graduation-note", c.services.graduation.note);

    // About
    setTextById("about-title", c.about.title);
    setTextById("about-p1", c.about.paragraphs[0]);
    setTextById("about-p2", c.about.paragraphs[1]);
    setTextById("about-p3", c.about.paragraphs[2]);

    // Contacts
    setTextById("contacts-title", c.contacts.title);
    setTextById("contacts-intro", c.contacts.intro);
    setTextById("contacts-messengers-title", c.contacts.messengersTitle);
    setTextById("contacts-social-title", c.contacts.socialTitle);
    setTextById("contacts-whatsapp", c.contacts.whatsapp);
    setTextById("contacts-telegram", c.contacts.telegram);
    setTextById("contacts-instagram", c.contacts.instagram);
    setTextById("contacts-vk", c.contacts.vk);
    setTextById("contacts-instagram-note", c.contacts.instagramNote);

    const ctaList = document.getElementById("contacts-cta-list");
    setTextById("contacts-cta-title", c.contacts.ctaTitle);

    if (ctaList && Array.isArray(c.contacts.ctaItems)) {
      ctaList.innerHTML = "";
      c.contacts.ctaItems.forEach(function (text) {
        const li = document.createElement("li");
        li.textContent = text;
        ctaList.appendChild(li);
      });
    }

    // Footer
    setTextById("footer-left", c.footer.left);
    setTextById("footer-center", c.footer.center);
    setTextById("footer-right", c.footer.right);

    // Service CTA buttons
    if (c.ui.serviceCtaLabel) {
      setTextById("service-individual-cta", c.ui.serviceCtaLabel);
      setTextById("service-groups-cta", c.ui.serviceCtaLabel);
      setTextById("service-wedding-cta", c.ui.serviceCtaLabel);
      setTextById("service-graduation-cta", c.ui.serviceCtaLabel);
    }
  }

  if (typeof siteLinks === "object" && siteLinks !== null) {
    const headerLinks = siteLinks.header;

    const navTg = document.getElementById("nav-tg");
    const navVk = document.getElementById("nav-vk");

    if (navTg && headerLinks.telegram) {
      navTg.setAttribute("href", headerLinks.telegram);
    }

    if (navVk && headerLinks.vk) {
      navVk.setAttribute("href", headerLinks.vk);
    }
  }

  const serviceButtons = document.querySelectorAll(".service-card__cta");

  serviceButtons.forEach(function (button) {
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    button.addEventListener("click", function () {
      const serviceKey = button.dataset.service;
      if (!serviceKey || typeof siteLinks !== "object" || siteLinks === null) {
        return;
      }

      const baseTelegramUrl = siteLinks.header?.telegramBase || "https://t.me/alerikavooo";
      let message = "";

      if (
        typeof siteContent === "object" &&
        siteContent !== null &&
        siteContent.ctaMessages &&
        Object.prototype.hasOwnProperty.call(siteContent.ctaMessages, serviceKey)
      ) {
        message = siteContent.ctaMessages[serviceKey];
      } else {
        message = "Здравствуйте! Хочу записаться на занятие.";
      }

      const url = baseTelegramUrl + "?text=" + encodeURIComponent(message);
      window.open(url, "_blank");
    });
  });
});

