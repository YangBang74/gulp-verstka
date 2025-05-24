const swiper = new Swiper('.swiper', {
  loop: true,
  effect: 'fade',
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const sendMenu = document.querySelector('.sub');

const toggleSend = () => {
  sendMenu.classList.toggle('active');
  document.body.style.overflow = 'hidden';
}
const closeSendMenu = () => {
  sendMenu.classList.remove('active');
  document.body.style.overflow = 'auto';
}  

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const modal = document.getElementById('successModal');
  const closeBtn = document.querySelectorAll('.closeModal')

  form.addEventListener('submit', (e) => {
    e.preventDefault();       // отменяем реальную отправку

    // Здесь можешь вызвать fetch()/XHR для реальной отправки
    // fetch('/api/send', { method: 'POST', body: new FormData(form) })
    //   .then(() => { ... });

    // Показать модалку
    modal.classList.add('active');

    // Очистить форму (если нужно)
    form.reset();
  });

  // Закрыть по кнопке
  closeBtn.forEach(btn => { btn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  });
  // Закрыть кликом вне контента
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});
