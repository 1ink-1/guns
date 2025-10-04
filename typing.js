// Typing and backspacing animation for "1ink"
const typingName = document.getElementById('typingName');
const text = "1ink";
let idx = 0;
let typing = true;

function typeLoop() {
  if (typing) {
    typingName.textContent = text.slice(0, idx);
    if (idx < text.length) {
      idx++;
      setTimeout(typeLoop, 210);
    } else {
      typing = false;
      setTimeout(typeLoop, 1200); // Pause before erasing
    }
  } else {
    typingName.textContent = text.slice(0, idx);
    if (idx > 0) {
      idx--;
      setTimeout(typeLoop, 130);
    } else {
      typing = true;
      setTimeout(typeLoop, 400); // Pause before typing again
    }
  }
}
typeLoop(); 
