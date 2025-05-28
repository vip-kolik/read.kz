const categories = document.querySelectorAll('.category-btn');
const booksList = document.querySelectorAll('#books-list li');
const answersList = document.querySelectorAll('#answers-list li');
const logo = document.getElementById('logo');
const langBtn = document.getElementById('lang-btn');
const flagIcon = document.getElementById('flag-icon');

let currentLang = 'ru';

const texts = {
  ru: {
    categoriesTitle: 'Категории',
    booksTitle: 'Книги',
    answersTitle: 'Варианты с ответами',
    read: 'Читать',
    buy: 'Купить',
    footer: '© 2025 Read.kz — Все права защищены.',
    history: 'История Казахстана'
  },
  kz: {
    categoriesTitle: 'Категориялар',
    booksTitle: 'Кітаптар',
    answersTitle: 'Жауаптары бар нұсқалар',
    read: 'Оқу',
    buy: 'Сатып алу',
    footer: '© 2025 Read.kz — Барлық құқықтар қорғалған.',
    history: 'Қазақстан тарихы'
  }
};

// Фильтрация по категории
function filterByCategory(category) {
  booksList.forEach(book => {
    if (category === 'all' || book.dataset.category === category) {
      book.style.display = '';
    } else {
      book.style.display = 'none';
    }
  });

  answersList.forEach(answer => {
    if (category === 'all' || answer.dataset.category === category) {
      answer.style.display = '';
    } else {
      answer.style.display = 'none';
    }
  });

  categories.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
}

// Начальная категория
filterByCategory('informatics');

// События на кнопки категорий
categories.forEach(btn => {
  btn.addEventListener('click', () => {
    filterByCategory(btn.dataset.category);
  });
});

// Клик по логотипу — обновить
logo.addEventListener('click', () => {
  location.reload();
});

// Переключение языка
langBtn.addEventListener('click', () => {
  currentLang = currentLang === 'ru' ? 'kz' : 'ru';

  document.getElementById('category-title').textContent = texts[currentLang].categoriesTitle;
  document.querySelector('#books-section h2').textContent = texts[currentLang].booksTitle;
  document.querySelector('#answers-section h2').textContent = texts[currentLang].answersTitle;

  document.querySelectorAll('.read-btn').forEach(btn => {
    btn.textContent = texts[currentLang].read;
  });

  document.querySelectorAll('.btn-buy').forEach(btn => {
    btn.textContent = texts[currentLang].buy;
  });

  document.querySelector('footer').textContent = texts[currentLang].footer;

  if (currentLang === 'ru') {
    flagIcon.src = 'https://flagcdn.com/w80/kz.png';
    flagIcon.alt = 'KZ';
    langBtn.title = 'Қазақша';
  } else {
    flagIcon.src = 'https://flagcdn.com/w80/ru.png';
    flagIcon.alt = 'RU';
    langBtn.title = 'Русский';
  }

  // Обновляем название категории "Қазақстан тарихы"
  categories.forEach(btn => {
    if (btn.dataset.category === 'history') {
      btn.textContent = texts[currentLang].history;
    }
  });
});