const canvas = document.getElementById('money-bg');
const ctx = canvas.getContext('2d');
const moneyImg = new Image();
moneyImg.src = 'money.png'; // Use your own dollar bill image here

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const NUM_BILLS = 18;
const bills = [];

function randomBetween(a, b) {
  return Math.random() * (b - a) + a;
}

function initBills() {
  bills.length = 0;
  for (let i = 0; i < NUM_BILLS; i++) {
    bills.push({
      x: randomBetween(0, canvas.width),
      y: randomBetween(-canvas.height, 0),
      speed: randomBetween(1.2, 3.5),
      size: randomBetween(60, 120),
      angle: randomBetween(-0.3, 0.3),
      rotationSpeed: randomBetween(-0.01, 0.01),
      blur: randomBetween(4, 12)
    });
  }
}

moneyImg.onload = () => {
  initBills();
  animate();
};

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bills.forEach(bill => {
    ctx.save();
    ctx.filter = `blur(${bill.blur}px)`;
    ctx.translate(bill.x, bill.y);
    ctx.rotate(bill.angle);
    ctx.drawImage(moneyImg, -bill.size / 2, -bill.size / 4, bill.size, bill.size / 2.1);
    ctx.restore();

    bill.y += bill.speed;
    bill.angle += bill.rotationSpeed;

    if (bill.y - bill.size / 2 > canvas.height) {
      bill.x = randomBetween(0, canvas.width);
      bill.y = randomBetween(-canvas.height * 0.5, 0);
      bill.speed = randomBetween(1.2, 3.5);
      bill.size = randomBetween(60, 120);
      bill.angle = randomBetween(-0.3, 0.3);
      bill.rotationSpeed = randomBetween(-0.01, 0.01);
      bill.blur = randomBetween(4, 12);
    }
  });

  requestAnimationFrame(animate);
}
