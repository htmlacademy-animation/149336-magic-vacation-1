export default () => {
  let showResultEls = document.querySelectorAll(`.js-show-result`);
  let results = document.querySelectorAll(`.screen--result`);
  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function (e) {
        let target = showResultEls[i].getAttribute(`data-target`);
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        let targetEl = [].slice.call(results).filter(function (el) {
          return el.getAttribute(`id`) === target;
        });
        targetEl[0].classList.add(`screen--show`);
        targetEl[0].classList.remove(`screen--hidden`);
        if (targetEl[0].id === `result`) {
          const paths = document.querySelectorAll(`.victory path`);
          let pathLength;
          for (let i = 0; i < paths.length; i++) {
            pathLength = paths[i].getTotalLength();
            const dasharray = `
              <animate attributeName="stroke-dasharray"
                                      dur="0.5s"
                                      begin="titleResultOpacity.begin"
                                      values="0 ${pathLength/3};
                                              ${pathLength/3} 0"
                                      fill="freeze"
                                      repeatCount="1" />
            `;
            paths[i].innerHTML = dasharray;
          }
          const svg = document.querySelector(`#titleResultOpacity`);
          svg.beginElement();
        } else if (targetEl[0].id === `result2`) {
          const paths = document.querySelectorAll(`.victory path`);
          let pathLength;
          for (let i = 0; i < paths.length; i++) {
            pathLength = paths[i].getTotalLength();
            const dasharray = `
              <animate attributeName="stroke-dasharray"
                                      dur="0.5s"
                                      begin="titleResult2Opacity.begin"
                                      values="0 ${pathLength/3};
                                              ${pathLength/3} 0"
                                      fill="freeze"
                                      repeatCount="1" />
            `;
            paths[i].innerHTML = dasharray;
          }
          const svg = document.querySelector(`#titleResult2Opacity`);
          svg.beginElement();
        } else {
          const paths = document.querySelectorAll(`.losing path`);
          let pathLength;
          for (let i = 0; i < paths.length; i++) {
            pathLength = paths[i].getTotalLength();
            const dasharray = `
              <animate attributeName="stroke-dasharray"
                                      dur="0.778s"
                                      begin="titleResult3Opacity.begin"
                                      values="0 ${pathLength/3};
                                              ${pathLength/3} 0"
                                      fill="freeze"
                                      repeatCount="1" />
            `;
            paths[i].innerHTML = dasharray;
          }
          const svg = document.querySelector(`#titleResult3Opacity`);
          svg.beginElement();
        }
      });
    }

    let playBtn = document.querySelector(`.js-play`);
    if (playBtn) {
      playBtn.addEventListener(`click`, function () {
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
      });
    }
  }
};
