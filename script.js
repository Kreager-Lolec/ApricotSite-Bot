document.addEventListener('DOMContentLoaded', function() {
// Логіка маски телефону
  const phoneInput = document.getElementById('phone');
  function phoneMask(input) {
    let val = input.value;
    val = val.replace(/[^\d+]/g, '');
    if (val.length > 0 && val[0] !== '+') {
      val = '+' + val.replace(/\+/g, '');
    }
    if (!val.startsWith('+380')) {
      val = '+380';
    }
    if (val.length > 13) {
      val = val.slice(0, 13);
    }
    input.value = val;
  }
  if (phoneInput) {
    phoneInput.addEventListener('input', function() {
      phoneMask(phoneInput);
    });
  }
  // Логіка розрахунку кількості саджанців
  const quantityInput = document.getElementById('quantity');
    const blackPrinceInput   = document.getElementById('blackPrinceQuantity');
  const totalPriceEl = document.getElementById('totalPrice');
  function calculatePrice() {
    // 2.1) Кількість основних саджанців
    let q = parseInt(quantityInput.value, 10) || 2;
    if (q < 2) {
      q = 2;
      quantityInput.value = 2;
    }

    // Логіка, як у action.php:
    //   if (q===2) => 360
    //   if (q===3) => 513
    //   else => (2*180)+(q-2)*153
    let mainPrice = 0;
    if (q === 2) {
      mainPrice = 360;
    } else if (q === 3) {
      mainPrice = 513;
    } else {
      mainPrice = (2 * 180) + ((q - 2) * 153);
    }

    // 2.2) Кількість «Чорного Принца» (зі знижкою 66% => 153 грн)
    let bpQ = 0;
    if (blackPrinceInput) {
      bpQ = parseInt(blackPrinceInput.value, 10) || 0;
      if (bpQ < 0) {
        bpQ = 0;
        blackPrinceInput.value = 0;
      }
    }
    const blackPrincePrice = 153;
    let bpTotal = bpQ * blackPrincePrice;

    // 2.3) Підсумок
    let total = mainPrice + bpTotal;
    // Відображаємо
    if (totalPriceEl) {
      totalPriceEl.textContent = total + ' грн';
    }
  }

  // Прив’язуємо обробники
  if (quantityInput) {
    quantityInput.addEventListener('input', calculatePrice);
    quantityInput.addEventListener('change', calculatePrice);
  }
  if (blackPrinceInput) {
    blackPrinceInput.addEventListener('input', calculatePrice);
    blackPrinceInput.addEventListener('change', calculatePrice);
  }
  // Викликаємо розрахунок при завантаженні
  calculatePrice();

  // Логіка гамбургер-меню
  const menuIcon = document.getElementById('menu-icon');
  const navMenu = document.getElementById('nav-menu');
  if (menuIcon && navMenu) {
    menuIcon.addEventListener('click', function() {
      navMenu.classList.toggle('open');
      menuIcon.classList.toggle('open');
    });
  }

  // Логіка каруселі відгуків (плавний fade-перехід)
  const carouselContainer = document.querySelector('.carousel-container');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentIndex = 0;
  const totalSlides = slides.length;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
        carouselContainer.style.height = slide.scrollHeight + 'px';
      } else {
        slide.classList.remove('active');
      }
    });
  }
  
  // Ініціалізація першого слайду
  showSlide(currentIndex);

  // Обробники кнопок переключення
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  });
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
  });

  // Автоматичне переключення кожні 15 секунд (15000 мс)
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }, 15000);

  // Оновлення висоти контейнера після завантаження зображень
  slides.forEach(slide => {
    const img = slide.querySelector('img');
    if (img) {
      img.addEventListener('load', () => {
        if (slide.classList.contains('active')) {
          carouselContainer.style.height = slide.scrollHeight + 'px';
        }
      });
    }
  });
});
