const heart = document.querySelector('.heart');
const message = document.getElementById('message');

// Animación de latido
function heartbeat() {
  heart.classList.add('heartbeat');
  setTimeout(() => {
    heart.classList.remove('heartbeat');
  }, 1000);
}

setInterval(heartbeat, 2000);
