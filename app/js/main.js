'use strict'

let burger = document.querySelector('.header__burger');
let menu = document.querySelector('.header__mobile');
let menuLinks = menu.querySelectorAll('.header__link')

burger.addEventListener('click', function() {
  burger.classList.toggle('header__burger--active');

  menu.classList.toggle('header__mobile--active');

  document.body.classList.toggle('stop-scroll');
});

menuLinks.forEach(function(el) {
  el.addEventListener('click', function() {

    burger.classList.remove('header__burger--active');

    menu.classList.remove('header__mobile--active');

    document.body.classList.remove('stop-scroll');
  })
});

//slider

const swiper = new Swiper('.swiper', {

  slidesPerView: 1,
  spaceBetween: 40,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    480: {
      slidesPerView: 2,
    },
  }

});

// validator

const contacts = new JustValidate('.contacts__form', {
  errorFieldCssClass: ['contacts__invalid'],
  errorLabelCssClass: ['contacts__label-invalid'],
  errorLabelStyle: {
    color: '#FF3030',
  },
  errorsContainer: document.querySelectorAll('.errors-container'),
  focusInvalidField: true,
});

contacts
.addField('.contacts__input-name', [
  {
    rule: 'required',
    errorMessage: 'Обязательно к заполнению'
  },
  {
    rule: 'minLength',
    value: 2,
    errorMessage: 'Недопустимый формат'
  },
  {
    rule: 'maxLength',
    value: 15,
    errorMessage: 'Недопустимый формат'
  },
  {
    rule: 'customRegexp',
    value: /[a-zA-zа-яА-я]/gi,
    errorMessage: 'Недопустимый формат'
  }
])
.addField('.contacts__input-email', [
  {
    rule: 'email',
    errorMessage: 'Недопустимый формат',
  },
])
.addField('.contacts__textarea', [
  {
    rule: 'required',
    errorMessage: 'Обязательно к заполнению'
  },
]);

let formBtn = document.querySelector('.contacts__btn');
let request = {name: '', email: '', message: ''}

formBtn.addEventListener('click', () => {

  if (!contacts.isValid) {
    return
  }

  document.querySelectorAll('.form__input').forEach((input) => {
    request[input.name] = input.value;
  })

  console.log(request)
})




