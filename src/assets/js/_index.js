import '../css/style.css';

const continueHtml = document.querySelector('.continueHtml');
const startHtml = document.querySelector('.startHtml')


continueHtml.addEventListener('click', (e) => {
    e.preventDefault();
    let itsContinueGame = true;
    localStorage.setItem('continueGame', JSON.stringify(itsContinueGame));
    window.location.href = './assets/pages/_jeu.html';
})

startHtml.addEventListener('click', (e) => {
    e.preventDefault();
    let itsContinueGame = false;
    localStorage.setItem('continueGame', JSON.stringify(itsContinueGame));
    window.location.href = './assets/pages/_jeu.html';
})
