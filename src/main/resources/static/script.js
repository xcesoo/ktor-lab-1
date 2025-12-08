// Функція 1: Отримання JSON (стара)
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

// Функція 2: Відправка імені (НОВА)
async function sendName() {
    // Беремо текст, який ввів користувач
    const name = document.getElementById('nameInput').value;

    if (!name) {
        alert("Будь ласка, введіть ім'я!");
        return;
    }

    try {
        // Робимо запит на сервер, додаючи ім'я прямо в адресу
        const res = await fetch('/api/greet/' + name);
        const text = await res.text();

        // Показуємо відповідь
        document.getElementById('textResponse').innerText = text;
    } catch (e) {
        console.error(e);
    }
}