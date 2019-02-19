document.addEventListener('DOMContentLoaded', _ => {
  'use strict';
  let answer;

  function reset(randomNumber) {
    const numbers = Array.from(document.querySelectorAll('.number'));
    const feedback = document.getElementById('feedback');
    const blank = Math.floor(Math.random() * 3);
    answer = randomNumber + blank;
    feedback.classList.remove('correct', 'incorrect');
    feedback.textContent = '';
    numbers.forEach((num, i) => {
      num.onclick = i === blank ? choose : readNumber;
      num.dataset.value = randomNumber + i;
      num.textContent = i !== blank ? randomNumber + i : '';
    });
  }

  function choose(e) {
    const num = e.target;
    const feedback = document.getElementById('feedback');
    const guess = prompt('What\'s the number?');
    if (guess === null) { return; }
    if (!Number(guess)) { return choose(e); }
    if (guess === num.dataset.value) {
      num.textContent = guess;
      feedback.textContent = 'Correct! Great job!';
      feedback.classList.remove('incorrect');
      feedback.classList.add('correct');
      num.onclick = readNumber;
    } else {
      feedback.textContent = 'Wrong! Try again.';
      feedback.classList.remove('correct');
      feedback.classList.add('incorrect');
    }
    feedbackTone(guess === num.dataset.value);
  }

  function readNumber(e) {
    const num = e.target.dataset.value;
    const audio = document.querySelector(`audio[data-value="${num}"]`);
    audio.currentTime = 0;
    audio.play();
  }

  function feedbackTone(bool) {
    const result = bool ? 'success' : 'error';
    const tone = document.getElementById(result);
    tone.currentTime = 0;
    tone.play();
  }

  document.querySelector('.btn').addEventListener('click', _ => {
      reset(Math.ceil(Math.random() * 8));
  });

  document.getElementById('success').addEventListener('ended', _ => {
    const audio = document.querySelector(`audio[data-value="${answer}"]`);
    audio.currentTime = 0;
    audio.play();
  });

  reset(Math.ceil(Math.random() * 8));
});
