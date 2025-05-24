const swiper = new Swiper('.swiper', {
  loop: true,
  effect: 'fade',
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 5000,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const sendMenu = document.querySelector('.sub');

const toggleSend = () => {
  const sendButton = document.querySelector('.delivery__item-button');
  const sendMenu = document.querySelector('.sub');
  const closeMenu = document.querySelector('.sub__close');
  sendButton.addEventListener('click', () => {    
    sendMenu.classList.toggle('active');
    document.body.style.overflow = 'hidden';
  })
  closeMenu.addEventListener('click', () => {
    sendMenu.classList.remove('active');
  document.body.style.overflow = 'auto';
  })
}


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const modal = document.getElementById('successModal');
  const closeBtn = document.querySelectorAll('.closeModal')

  form.addEventListener('submit', (e) => {
    e.preventDefault();     
    modal.classList.add('active');
    document.querySelector('.sub').classList.remove('active');
    form.reset();
  });

  closeBtn.forEach(btn => { btn.addEventListener('click', () => {
    modal.classList.remove('active');
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const headerTop    = document.querySelector('.header__top');
  const headerBottom = document.querySelector('.header__bottom');
  const mainContent  = document.querySelector('main');    

  const topH = headerTop.getBoundingClientRect().height;
  window.addEventListener('scroll', () => {
    if (window.pageYOffset >= topH) {
      if (!headerBottom.classList.contains('fixed')) {
        headerBottom.classList.add('fixed');
        document.body.classList.add('has-fixed');
      }
    } else {
      headerBottom.classList.remove('fixed');
      document.body.classList.remove('has-fixed');
    }
  });
});

const burgerMenu = () => {
  const burger = document.querySelector('.header__burger');
  const menu = document.querySelector('.header__menu');
  const close = document.querySelector('.menu__close');
  const menuLinks = document.querySelectorAll('.header__menu-link');
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('lock');
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      menu.classList.remove('active');
      document.body.classList.remove('lock');
    });
  });

  close.addEventListener('click', () => {
    menu.classList.remove('active');
    document.body.classList.remove('lock');
  }) 

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !burger.contains(e.target)) {
      burger.classList.remove('active');
      menu.classList.remove('active');
      document.body.classList.remove('lock');
    }
  });
}

toggleSend()
burgerMenu();