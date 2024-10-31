import '../css/style.css';

/**
 * @type {HTMLElement}
 */
const continueHtml = document.querySelector('.continueHtml');
const startHtml = document.querySelector('.startHtml');

/**
 * Écouteur d'événement pour le bouton de continuation de jeu
 * Enregistre l'état du jeu dans le localStorage et redirige vers la page de jeu
 * 
 * @param {Event} e - Événement de clic
 */
continueHtml.addEventListener('click', (e) => {
    e.preventDefault();
    let itsContinueGame = true;
    localStorage.setItem('continueGame', JSON.stringify(itsContinueGame));
    window.location.href = './assets/pages/_jeu.html';
});

/**
 * Écouteur d'événement pour le bouton de démarrage d'une nouvelle partie
 * Enregistre l'état de nouvelle partie dans le localStorage et redirige vers la page de jeu
 * 
 * @param {Event} e - Événement de clic
 */
startHtml.addEventListener('click', (e) => {
    e.preventDefault();
    let itsContinueGame = false;
    localStorage.setItem('continueGame', JSON.stringify(itsContinueGame));
    window.location.href = './assets/pages/_jeu.html';
});
