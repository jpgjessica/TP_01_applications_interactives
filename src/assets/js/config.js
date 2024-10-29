import '../css/style.css';

async function fetchCategories() {
    try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();
        const categories = data.trivia_categories;

        const categoryDropdown = document.getElementById('category');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categoryDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();

    const toggleButton = document.getElementById('toggleQuestions');
    const numQuestionsDisplay = document.getElementById('numQuestionsDisplay');
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


