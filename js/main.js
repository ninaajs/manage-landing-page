const hamburger = document.getElementById('hamburger');
const menuHamburger = document.getElementById('menuHamburger');
hamburger.addEventListener('click', function(){
    menuHamburger.classList.toggle('nav__list--active')
});