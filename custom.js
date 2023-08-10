const numFireflies = 200;
const fireflies = [];
const networkCanvas = document.getElementById('network-canvas');
const ctx = networkCanvas.getContext('2d');
networkCanvas.width = window.innerWidth;
networkCanvas.height = window.innerHeight;
const lineThreshold = 100; // Adjust the distance threshold for connecting fireflies
const fireflyColorDefault = 'rgba(255, 219, 88, 0.8)';
const fireflyColorHover = 'rgba(100, 219, 88, 1)';
const lineColorDefault = 'rgba(255, 219, 88, 0.1)';
const lineColorHover = 'rgba(255, 0, 0, 0.5)';

function createFireflies() {
  for (let i = 0; i < numFireflies; i++) {
    const firefly = {
      x: Math.random() * networkCanvas.width,
      y: Math.random() * networkCanvas.height,
      dx: (Math.random() - 0.5) * 1.5, // Random X movement
      dy: (Math.random() - 0.5) * 1.5, // Random Y movement
      radius: Math.random() * 2 + 2, // Random size
      color: fireflyColorDefault
    };
    fireflies.push(firefly);
  }
}

function drawLines() {
  ctx.strokeStyle = lineColorDefault;
  ctx.lineWidth = 1;

  for (let i = 0; i < fireflies.length; i++) {
    const fireflyA = fireflies[i];
    for (let j = i + 1; j < fireflies.length; j++) {
      const fireflyB = fireflies[j];
      const dx = fireflyA.x - fireflyB.x;
      const dy = fireflyA.y - fireflyB.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < lineThreshold) {
        ctx.beginPath();
        ctx.moveTo(fireflyA.x, fireflyA.y);
        ctx.lineTo(fireflyB.x, fireflyB.y);
        ctx.stroke();
      }
    }
  }
}

function updateFireflyMovement(mouseX, mouseY) {
  fireflies.forEach(firefly => {
    const dx = mouseX - firefly.x;
    const dy = mouseY - firefly.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) {
      firefly.dx = dx * 0.02;
      firefly.dy = dy * 0.02;
    }
  });
}

function animateFireflies() {
  ctx.clearRect(0, 0, networkCanvas.width, networkCanvas.height);

  for (const element of fireflies) {
    const firefly = element;
    firefly.x += firefly.dx;
    firefly.y += firefly.dy;

    // Check boundaries to keep fireflies within the canvas
    if (firefly.x < 0 || firefly.x > networkCanvas.width) {
      firefly.dx = -firefly.dx;
    }
    if (firefly.y < 0 || firefly.y > networkCanvas.height) {
      firefly.dy = -firefly.dy;
    }

    ctx.beginPath();
    ctx.arc(firefly.x, firefly.y, firefly.radius, 0, Math.PI * 2);
    ctx.fillStyle = firefly.color;
    ctx.fill();
  }

  drawLines();

  requestAnimationFrame(animateFireflies);
}

networkCanvas.addEventListener('mousemove', event => {
  const rect = networkCanvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  fireflies.forEach(firefly => {
    const dx = mouseX - firefly.x;
    const dy = mouseY - firefly.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 20) {
      firefly.color = fireflyColorHover;
    } else {
      firefly.color = fireflyColorDefault;
    }
  });

  ctx.strokeStyle = lineColorHover;
});

networkCanvas.addEventListener('mouseleave', () => {
  fireflies.forEach(firefly => {
    firefly.color = fireflyColorDefault;
  });

  ctx.strokeStyle = lineColorDefault;
});

document.addEventListener('DOMContentLoaded', () => {
  createFireflies();
  animateFireflies();
});
