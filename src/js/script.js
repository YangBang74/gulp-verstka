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
