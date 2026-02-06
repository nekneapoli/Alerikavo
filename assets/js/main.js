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

    setTextById("service-request-title", c.services.request.title);
    setTextById("service-request-text", c.services.request.text);
    setTextById("service-request-price", c.services.request.price);
    setTextById("service-request-note", c.services.request.note);

    // About
    setTextById("about-title", c.about.title);
    setTextById("about-p1", c.about.paragraphs[0]);
    setTextById("about-p2", c.about.paragraphs[1]);
    setTextById("about-p3", c.about.paragraphs[2]);

    // Contacts
    setTextById("contacts-title", c.contacts.title);
    setTextById("contacts-intro", c.contacts.intro);
    setTextById("contacts-messengers-title", c.contacts.messengersTitle);

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
      setTextById("service-request-cta", c.ui.serviceCtaLabel);
    }
  }

  if (typeof siteLinks === "object" && siteLinks !== null) {
    const headerLinks = siteLinks.header;

    const navTg = document.getElementById("nav-tg");
    const navVk = document.getElementById("nav-vk");
    const contactsTg = document.getElementById("contacts-telegram");
    const contactsVk = document.getElementById("contacts-vk");

    if (navTg && headerLinks.telegram) {
      navTg.setAttribute("href", headerLinks.telegram);
    }

    if (navVk && headerLinks.vk) {
      navVk.setAttribute("href", headerLinks.vk);
    }

    if (contactsTg && headerLinks.telegram) {
      contactsTg.innerHTML = "";
      const link = document.createElement("a");
      link.href = headerLinks.telegram;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Написать в Telegram";
      contactsTg.appendChild(link);
    }

    if (contactsVk && headerLinks.vk) {
      contactsVk.innerHTML = "";
      const link = document.createElement("a");
      link.href = headerLinks.vk;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Написать во ВКонтакте";
      contactsVk.appendChild(link);
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

  const servicesCarousel = document.getElementById("services-carousel");
  const servicesPrev = document.getElementById("services-prev");
  const servicesNext = document.getElementById("services-next");
  const carouselCardsSelector = ".card.service-card";

  function getGapPx(container) {
    const style = window.getComputedStyle(container);
    const gap = parseFloat(style.columnGap || style.gap || "0");
    return Number.isFinite(gap) ? gap : 0;
  }

  function initInfiniteCarousel() {
    if (!servicesCarousel) {
      return;
    }

    const cards = Array.from(
      servicesCarousel.querySelectorAll(carouselCardsSelector)
    ).filter(function (el) {
      return el instanceof HTMLElement;
    });

    if (cards.length === 0) {
      return;
    }

    // Prevent double-init
    if (servicesCarousel.dataset.carousel === "true") {
      return;
    }
    servicesCarousel.dataset.carousel = "true";

    let currentIndex = 0;
    let isScrolling = false;

    function scrollToCard(index, behavior) {
      if (index < 0 || index >= cards.length) {
        return;
      }
      const card = cards[index];
      if (!(card instanceof HTMLElement)) {
        return;
      }

      const containerWidth = servicesCarousel.clientWidth;
      const cardWidth = card.offsetWidth;
      const cardLeft = card.offsetLeft;
      
      // Вычисляем позицию для центрирования карточки
      let targetLeft = cardLeft - (containerWidth - cardWidth) / 2;
      
      // Ограничиваем значение в разумных пределах
      const maxScroll = servicesCarousel.scrollWidth - containerWidth;
      targetLeft = Math.max(0, Math.min(targetLeft, maxScroll));

      servicesCarousel.scrollTo({
        left: targetLeft,
        behavior: behavior || "smooth",
      });

      // Обновляем активное состояние
      cards.forEach(function (c, idx) {
        if (c instanceof HTMLElement) {
          c.classList.toggle("is-active", idx === index);
        }
      });
    }

    // Стартуем с первой карточки
    scrollToCard(currentIndex, "auto");

    // Клик по карточке: пролистываем карусель к этой карточке
    cards.forEach(function (card, index) {
      card.addEventListener("click", function (event) {
        const target = event.target;
        // Не перехватываем клик по CTA-кнопке внутри карточки
        if (
          target instanceof HTMLElement &&
          target.closest(".service-card__cta")
        ) {
          return;
        }

        if (index === currentIndex || isScrolling) {
          return;
        }

        currentIndex = index;
        scrollToCard(currentIndex, "smooth");
      });
    });

    // Стрелки: логическое зацикливание по индексам, как у Bootstrap (wrap = true)
    function scrollByOne(direction) {
      if (isScrolling) {
        return;
      }
      
      const total = cards.length;
      if (total < 2) {
        return;
      }

      isScrolling = true;
      currentIndex = (currentIndex + direction + total) % total;
      scrollToCard(currentIndex, "smooth");
      
      // Снимаем блокировку после анимации (обычно 300-500мс)
      setTimeout(function() {
        isScrolling = false;
      }, 300);
    }

    if (servicesPrev) {
      servicesPrev.addEventListener("click", function () {
        scrollByOne(-1);
      });
    }

    if (servicesNext) {
      servicesNext.addEventListener("click", function () {
        scrollByOne(1);
      });
    }

    // Определяем активную карточку при скролле
    function updateActiveCardOnScroll() {
      if (isScrolling) {
        return;
      }

      const containerWidth = servicesCarousel.clientWidth;
      const scrollLeft = servicesCarousel.scrollLeft;
      const containerCenter = scrollLeft + containerWidth / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach(function (card, index) {
        if (!(card instanceof HTMLElement)) {
          return;
        }

        const cardLeft = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        const cardCenter = cardLeft + cardWidth / 2;
        const distance = Math.abs(cardCenter - containerCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== currentIndex) {
        currentIndex = closestIndex;
        // Обновляем активное состояние без анимации скролла
        cards.forEach(function (c, idx) {
          if (c instanceof HTMLElement) {
            c.classList.toggle("is-active", idx === currentIndex);
          }
        });
      }
    }

    // Обработчик скролла с debounce для производительности
    let scrollTimeout;
    servicesCarousel.addEventListener("scroll", function () {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        updateActiveCardOnScroll();
      }, 50);
    });

    // При изменении ширины пересчитываем позицию без анимации
    window.addEventListener("resize", function () {
      scrollToCard(currentIndex, "auto");
    });
  }

  function getCarouselStep() {
    if (!servicesCarousel) {
      return 0;
    }

    const firstCard = servicesCarousel.querySelector(carouselCardsSelector);
    if (firstCard instanceof HTMLElement) {
      return firstCard.offsetWidth + getGapPx(servicesCarousel);
    }

    return Math.floor(window.innerWidth * 0.8);
  }

  function scrollCarouselBy(direction) {
    if (!servicesCarousel) {
      return;
    }

    const step = getCarouselStep();
    servicesCarousel.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  initInfiniteCarousel();
});

