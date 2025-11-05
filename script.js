const tg = window.Telegram.WebApp;
tg.expand();

let deadlines = JSON.parse(localStorage.getItem("deadlines")) || [];

const list = document.getElementById("list");
const addBtn = document.getElementById("addBtn");
const removeBtn = document.getElementById("removeBtn");
const filterBtn = document.getElementById("filterBtn");

function saveData() {
  localStorage.setItem("deadlines", JSON.stringify(deadlines));
}

function renderDeadlines(items = deadlines) {
  list.innerHTML = "";
  if (items.length === 0) {
    list.innerHTML = "<p>No deadlines found</p>";
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    const tag = document.createElement("div");
    tag.className = "tag";
    tag.textContent = item.type;

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = item.title;

    const date = document.createElement("div");
    date.className = "date";
    date.textContent = `📅 ${item.date}`;

    const diffDays = calcDaysLeft(item.date);
    const days = document.createElement("div");
    days.className = "days";
    days.textContent = diffDays >= 0 ? `Залишилось ${diffDays} днів` : "⏰ Прострочено";

    card.append(tag, title, date, days);
    list.appendChild(card);
  });
}

function calcDaysLeft(dateStr) {
  const now = new Date();
  const target = new Date(dateStr);
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  return diff;
}

addBtn.onclick = () => {
  const title = prompt("Введи назву дедлайну:");
  const type = prompt("Тип (Лаба, Курс, Сесія):", "Лаба");
  const date = prompt("Дата (2025-12-31):");

  if (title && date) {
    deadlines.push({ title, type, date });
    saveData();
    renderDeadlines();
  }
};

removeBtn.onclick = () => {
  const name = prompt("Введи назву дедлайну для видалення:");
  deadlines = deadlines.filter((d) => d.title !== name);
  saveData();
  renderDeadlines();
};

filterBtn.onclick = () => {
  const type = prompt("Введи тип для фільтру (Лаба, Курс, Сесія):");
  const filtered = deadlines.filter((d) => d.type.toLowerCase() === type.toLowerCase());
  renderDeadlines(filtered);
};

renderDeadlines();
