const cols = document.querySelectorAll(".col");

// вызывает функцию по нажатию "пробел"
document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() == "space") {
    setRandomColors();
  }
});

// По клику на связку (фон + замочек) меняем классы (картинку замочка)
document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;
  console.log(type);
  console.log("2");

  if (type == "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0];

    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type == "copy") {
    copyToClickboard(event.target.textContent);
  }
});

// Готовая функция - генератор случайных цветов
function generateRandomColor() {
  const hexCodes = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return "#" + color;
}

// Функция - Перебрать объект колонок /
// Записать кнопку и текст в переменную и присвоить им цвета
function setRandomColors() {
  cols.forEach((col) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const btn = col.querySelector("button");
    const color = chroma.random();

    if (isLocked) {
      return;
    }
    text.textContent = color;
    col.style.background = generateRandomColor();

    setTextColor(text, color);
    setTextColor(btn, color);
  });
}

// Функция меняющая цвет текста и кнопки в зависимоти от фона
function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}

function copyToClickboard(text) {
  navigator.clipboard.writeText(text);
}
setRandomColors();
