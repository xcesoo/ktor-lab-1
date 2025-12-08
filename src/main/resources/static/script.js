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
    const list = document.getElementById('usersList');
    list.innerHTML = "Завантаження...";

    try {
        const res = await fetch('/api/users');
        const users = await res.json();

        list.innerHTML = "";

        users.forEach(user => {
            const li = document.createElement('li');
            li.innerText = `${user.name} (${user.role}) — ${user.email}`;
            list.appendChild(li);
        });
    } catch (e) {
        list.innerText = "Помилка завантаження. Перевір консоль.";
        console.error(e);
    }
}