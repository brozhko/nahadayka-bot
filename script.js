const tg = window.Telegram.WebApp;
tg.expand(); // розтягнути на весь екран

const container = document.getElementById("deadlineContainer");
const addBtn = document.getElementById("addBtn");

addBtn.onclick = () => {
  const title = prompt("Введи назву дедлайну:");
  const type = prompt("Тип (ЛАБА / КУРС / СЕСІЯ):");
  const date = prompt("Дата (YYYY-MM-DD):");

  if (title && date) {
    const data = { title, type, date };
    tg.sendData(JSON.stringify(data)); // 🔹 надсилає дані боту
    alert("✅ Дедлайн надіслано боту!");
  }
};
