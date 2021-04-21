export default class CreateAnimatedTimer {

  constructor() {}

  animate(options) {
    let criterion;
    let start = performance.now();
    requestAnimationFrame(criterion = function (time) {
      let timeFraction = (time - start) / options.duration;
      let progress = options.timing(timeFraction);
      let dur = options.duration;
      options.draw(progress, dur);
      if (timeFraction < 1) {
        requestAnimationFrame(criterion);
      } else {
        cancelAnimationFrame(criterion);
      }
    });
  }

  timerStart(fps) {
    // общие переменные для реализации точного fps
    let fpsInterval = 1000 / fps;
    let now;
    let then = Date.now();
    let elapsed;

    this.animate({
      duration: 300000,	// 5 minutes
      timing: (timeFraction) => {
        return timeFraction;
      },
      draw: (progress, duration) => {
        let t = duration * (1 - progress);
        if (t < 0) {
          return false;
        } else {
          // проверяем, сколько времени прошло с предыдущего запуска
          now = Date.now();

          elapsed = now - then;
          // проверяем, достаточно ли прошло времени с предыдущей отрисовки кадра
          if (elapsed > fpsInterval) {
            // сохранение времени текущей отрисовки кадра
            then = now - (elapsed % fpsInterval);

            // запуск функции отрисовки
            let seconds = Math.floor((t / 1000) % 60);
            let minutes = Math.floor((t / 1000 / 60) % 60);
            document.querySelector(`.game__counter`).firstElementChild.textContent = `0${minutes}`.slice(-2);
            document.querySelector(`.game__counter`).lastElementChild.textContent = `0${seconds}`.slice(-2);
          }
        }
        return true;
      }
    });
  }

  timerFinish() {
    // cancelAnimationFrame(criterion);
  }
}
