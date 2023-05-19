window.addEventListener('DOMContentLoaded', (event) => {
    const message = document.getElementById('message');
    setInterval(function () {
      message.classList.toggle('hidden');
    }, 500);
  });
  