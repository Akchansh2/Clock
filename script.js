

const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const dateEl = document.getElementById("date");

const toggleThemeBtn = document.getElementById("toggleMode");
const toggleFormatBtn = document.getElementById("toggleFormat");



let isDarkMode = localStorage.getItem("theme") === "dark";
let is24Hour = localStorage.getItem("timeFormat") !== "12"; // default 24h

applyPreferences();


function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  let ampm = "";

  if (!is24Hour) {
    ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
  }

  hourEl.textContent = formatTime(hours);
  minuteEl.textContent = formatTime(minutes);
  secondEl.textContent = formatTime(seconds);

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };


  dateEl.textContent = now.toLocaleDateString(undefined, dateOptions);


 
}



function formatTime(value) {
  return value < 10 ? "0" + value : value;
}



toggleThemeBtn.addEventListener("click", () => {
  isDarkMode = !isDarkMode;

  document.body.classList.toggle("dark", isDarkMode);
  toggleThemeBtn.textContent = isDarkMode ? "☀️" : "🌙";

  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
});



toggleFormatBtn.addEventListener("click", () => {
  is24Hour = !is24Hour;

  toggleFormatBtn.textContent = is24Hour ? "24H" : "12H";
  localStorage.setItem("timeFormat", is24Hour ? "24" : "12");

  updateClock();
});


function applyPreferences() {
  document.body.classList.toggle("dark", isDarkMode);
  toggleThemeBtn.textContent = isDarkMode ? "☀️" : "🌙";
  toggleFormatBtn.textContent = is24Hour ? "24H" : "12H";
}


updateClock();
setInterval(updateClock, 1000);