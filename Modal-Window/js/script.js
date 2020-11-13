'use strict'
const modalWindow = document.querySelector('.modal');
const modalOverlay = document.querySelector('.overlay');
const btnsShowModal = document.querySelectorAll('.show-modal');
const btnCloseModal = document.querySelector('.close-modal');

const showModal = function () {
    modalWindow.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
}

const hideModal = function () {
    modalWindow.classList.add('hidden');
    modalOverlay.classList.add('hidden');
}

for (let i = 0; i < btnsShowModal.length; i++) {
    btnsShowModal[i].addEventListener('click', showModal)
}

btnCloseModal.addEventListener('click', hideModal);
modalOverlay.addEventListener('click', hideModal);
document.addEventListener('keydown', function (e) {
   if (e.key === 'Escape')  {
       hideModal();
   }
});