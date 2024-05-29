// Регистрация
const registrationForm = document.getElementById('registrationForm');
registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // Получаем существующих пользователей из localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    // Проверяем, существует ли уже пользователь с таким же логином
    const userExists = existingUsers.some(user => user.username === username);
    if (userExists) {
        alert('This username is already taken. Please choose another one.');
    } else {
        const userData = {
            username,
            email,
            password
        };
        // Добавляем нового пользователя в список существующих
        existingUsers.push(userData);
        // Сохраняем обновленный список пользователей в localStorage
        localStorage.setItem('users', JSON.stringify(existingUsers));
        alert('Registration successful!');
    }
});

// Вход
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;
    // Получаем существующих пользователей из localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    // Проверяем, существует ли пользователь с введенными логином и паролем
    const user = existingUsers.find(user => user.email === loginUsername && user.password === loginPassword);
    if (user) {
        // Сохраняем данные текущего пользователя в localStorage под ключом 'currentUser'
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Login successful!');
        // Перенаправляем пользователя на другую страницу или обновляем текущую страницу
        // window.location.href = 'profile.html';
        // Или обновить текущую страницу
        updateProfile();
    } else {
        alert('Invalid email or password');
    }
});



// Проверить наличие данных пользователя в localStorage при загрузке страницы
window.onload = function() {
    updateProfile();
};

if(localStorage.currentUser == undefined){
    console.log("Нет данных")
    function toggleMain1() {
        var main1 = document.getElementById("main1");
        if (main1.style.display === "none") {
            main1.style.display = "block"; // Показываем .main1
        } else {
            main1.style.display = "none"; // Скрываем .main1
        }
    }
}
if(localStorage.currentUser !== undefined){
    function toggleMain1() {
        var main1 = document.getElementById("profil");
        if (main1.style.display === "none") {
            main1.style.display = "inline-block"; // Показываем .main1
        } else {
            main1.style.display = "none"; // Скрываем .main1
        }
    }
    console.log("Данне есть");
}


// Функция для выхода из системы
function logout() {
    localStorage.removeItem('currentUser');
    window.location.reload();
  }
  
  // Обработчик события клика для кнопки "Logout"
  const logoutButton = document.getElementById('logoutButton');
  logoutButton.addEventListener('click', logout);
  
  // Обработчик события для формы входа
const loginForm1 = document.getElementById('loginForm');
loginForm1.addEventListener('submit', function(event) {
  event.preventDefault(); // Предотвращаем стандартное поведение формы

  // Ваш код для обработки формы входа

  window.location.reload(); // Обновляем страницу
});

// Функция для отображения данных пользователя
function displayUserData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
    if (currentUser) {
      const profilDiv = document.getElementById('profil');
      profilDiv.innerHTML = `
        <img src="./imghed/Log.svg" alt="">
        <p>Имя: ${currentUser.username}</p>
        <p>Email: ${currentUser.email}</p>
        <button id="logoutButton">Logout</button>
      `;
  
      // Обработчик события для кнопки "Logout"
      const logoutButton = document.getElementById('logoutButton');
      logoutButton.addEventListener('click', logout);
    }
  }
  
  // Функция для выхода из системы
  function logout() {
    localStorage.removeItem('currentUser');
    window.location.reload();
  }
  
  // Вызываем функцию displayUserData() при загрузке страницы
  window.addEventListener('load', displayUserData);
  