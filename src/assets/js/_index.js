import '../css/style.css';
/**
 * @type {HTMLElement}
 */
const continueHtml = document.querySelector('.continueHtml');
/**
 * @type {HTMLElement}
 */
const startHtml = document.querySelector('.startHtml')

/**
 * @param {Event}
 */
continueHtml.addEventListener('click', (e) => {
    e.preventDefault();
    let itsContinueGame = true;
    localStorage.setItem('continueGame', JSON.stringify(itsContinueGame));
    window.location.href = './assets/pages/_jeu.html';
})

/**
 * @param {Event}
 */
startHtml.addEventListener('click', (e) => {
    e.preventDefault();
    let itsContinueGame = false;
    localStorage.setItem('continueGame', JSON.stringify(itsContinueGame));
    window.location.href = './assets/pages/_jeu.html';
});