document.getElementById('year').textContent = new Date().getFullYear();

//BURGER MENU
const burger = document.querySelector('.burger');
const menu = document.querySelector('.nav-menu');

function toggleMenu() {
  const expanded = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', !expanded);
  burger.classList.toggle('active');
  menu.classList.toggle('active');
}

burger.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleMenu();
});

menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.setAttribute('aria-expanded', false);
    burger.classList.remove('active');
    menu.classList.remove('active');
  });
});

document.addEventListener('click', (e) => {
  if (menu.classList.contains('active') && !menu.contains(e.target) && e.target !== burger) {
    burger.setAttribute('aria-expanded', false);
    burger.classList.remove('active');
    menu.classList.remove('active');
  }
});

// MARQUE
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.marquee-track');
  const group = track?.querySelector('.marquee-group');
  if (track && group) {
    const clone = group.cloneNode(true); // клонируем элементы, а не текст
    track.appendChild(clone);
  }
});

//SLIDERS

const heroSwiper = new Swiper('.hero-slider', {
  loop: true,
  speed: 800,
  centeredSlides: true,

  slidesPerView: 1.3,  // показывает центр + боковые куски
  spaceBetween: 20,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  breakpoints: {
    768: {
      slidesPerView: 1.6,
    },
    1024: {
      slidesPerView: 1.9,
    }
  }
});

const offerSwiper = new Swiper('.offer-slider', {
  loop: true,
  speed: 800,
  centeredSlides: true,

  slidesPerView: 1.3,  // показывает центр + боковые куски
  spaceBetween: 20,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  breakpoints: {
    768: {
      slidesPerView: 1.6,
    },
    1024: {
      slidesPerView: 1.9,
    }
  }
});

const reviewsSwiper = new Swiper('.reviews-swiper', {
  loop: true,
  spaceBetween: 20,
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    }
  }
});

//NAV

const header = document.querySelector("header");
const headerHeight = header.offsetHeight;
const navMenu = document.querySelector(".nav-menu");

// 1. Плавный скролл + правильный отступ под фиксированный хедер
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    e.preventDefault();

    const elementPosition = target.offsetTop;
    const offsetPosition = elementPosition - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  });
});

// 2. Изменение стиля хедера при прокрутке
window.addEventListener("scroll", () => {
  if (window.scrollY > 1) {
    header.classList.add("scrolled");
    navMenu.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
    navMenu.classList.remove("scrolled");
  }
});

//POPUP

// --- Открытие первого попапа ---
const buttons = document.querySelectorAll('.open-popup');
const popup1 = document.getElementById('popup1');
const popup2 = document.getElementById('popup2');
const titleEl = popup1.querySelector('.popup-title');
const serviceInput = document.getElementById('service_title');

const closes = document.querySelectorAll('.close');
const nextBtn = popup1.querySelector('.next');
const backBtn = popup2.querySelector('.back');
const form = document.getElementById('requestForm');
const errorBlock = form.querySelector('.form-error');

// открыть popup1 с нужным заголовком
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const title = btn.dataset.title;
    titleEl.textContent = title;
    serviceInput.value = title;

    popup1.style.display = 'flex';
  });
});

// закрытие по крестику
closes.forEach(c => {
  c.addEventListener('click', () => {
    popup1.style.display = 'none';
    popup2.style.display = 'none';
  });
});

// закрытие по подложке
document.addEventListener('click', e => {
  if (e.target.classList.contains('popup-overlay')) {
    popup1.style.display = 'none';
    popup2.style.display = 'none';
  }
});

// кнопка "Оставить заявку"
nextBtn.addEventListener('click', () => {
  popup1.style.display = 'none';
  popup2.style.display = 'flex';
});

// кнопка "Назад"
backBtn.addEventListener('click', () => {
  popup2.style.display = 'none';
  popup1.style.display = 'flex';
});

// Проверка формы перед отправкой
form.addEventListener('submit', e => {
  const fields = form.querySelectorAll('input, textarea');

  for (let f of fields) {
    if (f.value.trim() === "") {
      e.preventDefault();
      errorBlock.style.display = 'block';
      return;
    }
  }

  errorBlock.style.display = 'none';
});


// --------------------------------------------------------------------
// 📌 МАСКА ТЕЛЕФОНА (Польша) — формат +48 123 456 789
// --------------------------------------------------------------------

const phoneInput = document.querySelector('input[name="phone"]');

phoneInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, ""); // удалить все НЕ цифры

  // автодобавление кода страны
  if (!value.startsWith("48")) {
    value = "48" + value;
  }

  // ограничиваем длину (48 + 9 цифр = 11 цифр)
  value = value.substring(0, 11);

  // форматирование
  let formatted = "+";
  if (value.length >= 2) formatted += value.substring(0, 2);           // 48
  if (value.length >= 3) formatted += " " + value.substring(2, 5);     // 123
  if (value.length >= 6) formatted += " " + value.substring(5, 8);     // 456
  if (value.length >= 9) formatted += " " + value.substring(8, 11);    // 789

  e.target.value = formatted;
});


document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-question').addEventListener('click', () => {
    item.classList.toggle('active');
  });
});