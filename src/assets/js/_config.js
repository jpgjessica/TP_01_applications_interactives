import '../css/style.css';
const categoryDropdown = document.querySelector('.categoryHtml');
const toggleButton = document.querySelector('.toggleQuestionsHtml');
const numQuestionsDisplay = document.querySelector('.numQuestionsDisplayHtml');
const startConfig = document.querySelector('.startConfigHtml');
const difficulty = document.querySelector('.difficultyHtml');
const type = document.querySelector('.typeHtml')

function fetchCategories() {
    fetch('https://opentdb.com/api_category.php')
        .then(response => response.json())
        .then(data => {
            let categories = data.trivia_categories;
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categoryDropdown.appendChild(option);
            })
        });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
    let numQuestions = 10;

    const updateDisplay = () => {
        numQuestionsDisplay.textContent = numQuestions;
    };

    toggleButton.addEventListener('click', (event) => {
        const clickY = event.offsetY;

        if (clickY < toggleButton.clientHeight / 2) {
            if (numQuestions < 50) {
                numQuestions += 1;
            }
        } else {
            if (numQuestions > 10) {
                numQuestions -= 1;
            }
        }
        updateDisplay();
    });

    updateDisplay();
});


startConfig.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem('NbOfQuestions', JSON.stringify(numQuestionsDisplay.textContent));
    localStorage.setItem('Categories', JSON.stringify(categoryDropdown.options[categoryDropdown.selectedIndex].value));
    localStorage.setItem('Difficulty', JSON.stringify(difficulty.options[difficulty.selectedIndex].value));
    localStorage.setItem('Type', JSON.stringify(type.options[type.selectedIndex].value));
    let itsContinueGame = false;
    localStorage.setItem('continueGame', JSON.stringify(itsContinueGame));
    window.location.href = './_jeu.html';
});