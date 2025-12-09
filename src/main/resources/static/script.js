async function getData() {
    try {
        const res = await fetch('/api/hello');
        const data = await res.json();
        document.getElementById('jsonResponse').innerText =
            "Server says: " + data.message + " (Time: " + data.time + ")";
    } catch (e) {
        console.error(e);
        alert("Помилка з'єднання з сервером");
    }
}


async function sendName() {
    const name = document.getElementById('nameInput').value;

    if (!name) {
        alert("Будь ласка, введіть ім'я!");
        return;
    }

    try {
        const res = await fetch('/api/greet/' + name);
        const text = await res.text();

        document.getElementById('textResponse').innerText = text;
    } catch (e) {
        console.error(e);
    }
}
async function calculate() {
    const a = document.getElementById('numA').value;
    const b = document.getElementById('numB').value;

    if (!a || !b) {
        alert("Введіть обидва числа!");
        return;
    }

    try {
        const res = await fetch(`/api/calc?a=${a}&b=${b}`);
        const text = await res.text();
        document.getElementById('calcResponse').innerText = text;
    } catch (e) {
        console.error(e);
    }
}

async function loadUsers() {
    // Зверни увагу: ми шукаємо usersGrid, а не usersList
    const grid = document.getElementById('usersGrid');

    // Показуємо спіннер або текст завантаження
    grid.innerHTML = '<div style="text-align:center; width:100%;">Завантаження карток...</div>';

    try {
        const res = await fetch('/api/users');
        const users = await res.json();

        grid.innerHTML = ""; // Очищаємо контейнер

        users.forEach(user => {
            // Створюємо елемент картки
            const card = document.createElement('div');
            card.className = 'user-card';

            // Визначаємо стиль для ролі (для краси)
            let roleClass = 'user-role';
            if (user.role.toLowerCase().includes('admin')) roleClass += ' role-admin';
            if (user.role.toLowerCase().includes('driver')) roleClass += ' role-driver';

            // Заповнюємо HTML всередині картки
            card.innerHTML = `
                <div class="user-name">👤 ${user.name}</div>
                <div class="user-email">✉️ ${user.email}</div>
                <span class="${roleClass}">${user.role}</span>
            `;

            grid.appendChild(card);
        });

    } catch (e) {
        grid.innerHTML = '<div style="color:red; text-align:center;">Помилка завантаження!</div>';
        console.error(e);
    }
}