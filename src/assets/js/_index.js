import '../css/style.css';

/**
 * @type {HTMLElement}
 */
const continueHtml = document.querySelector('.continueHtml');

/**
 * @type {HTMLElement}
 */
const startHtml = document.querySelector('.startHtml');

/**
 * @param {MouseEvent} e
 */
continueHtml.addEventListener('click', (e) => {
    e.preventDefault();

    /** 
     * @type {boolean}
     */
    let itsContinueGame = true;

    localStorage.setItem('continueGame', JSON.stringify(itsContinueGame));
    window.location.href = './assets/pages/_jeu.html';
});

/**
 * @param {MouseEvent} e
 */
startHtml.addEventListener('click', (e) => {
    e.preventDefault();

    /** 
     * @type {boolean}
     */
    let itsContinueGame = false;

    localStorage.setItem('continueGame', JSON.stringify(itsContinueGame));
    window.location.href = './assets/pages/_jeu.html';
});
