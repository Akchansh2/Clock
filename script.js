// ── STATE ──
let use12h = true;

// ── HELPERS ──
const pad = n => String(n).padStart(2, '0');

const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// ── TICK ──
function tick() {
  const now  = new Date();
  let   h    = now.getHours();
  const m    = now.getMinutes();
  const s    = now.getSeconds();
  const ampm = h >= 12 ? 'PM' : 'AM';

  if (use12h) h = h % 12 || 12;

  setBox('hour',   pad(h));
  setBox('minute', pad(m));
  setBox('second', pad(s));

  // AM/PM badge
  const badge = document.getElementById('ampm-badge');
  badge.textContent = ampm;
  badge.style.display = use12h ? 'inline-block' : 'none';

  // Date
  document.getElementById('date').textContent =
    `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

  // Seconds progress bar
  document.getElementById('sec-bar').style.width = ((s / 59) * 100) + '%';
}

// ── SET BOX WITH FADE ──
function setBox(id, value) {
  const el = document.getElementById(id);
  if (el.textContent === value) return; // no change, skip animation

  el.classList.add('fade-out');
  setTimeout(() => {
    el.textContent = value;
    el.classList.remove('fade-out');
    el.classList.add('fade-in');
    setTimeout(() => el.classList.remove('fade-in'), 250);
  }, 200);
}

// ── FORMAT TOGGLE ──
document.getElementById('toggleFormat').addEventListener('click', function () {
  use12h = !use12h;
  this.textContent = use12h ? '12H' : '24H';
  tick();
});

// ── THEME SWITCHER ──
document.querySelectorAll('.dot').forEach(dot => {
  dot.addEventListener('click', function () {
    document.documentElement.setAttribute('data-theme', this.dataset.theme);
    document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
    this.classList.add('active');
  });
});

// ── INIT ──
tick();
setInterval(tick, 1000);
