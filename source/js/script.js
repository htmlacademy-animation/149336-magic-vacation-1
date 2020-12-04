// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

window.onload = function () {
  document.querySelector(`body`).classList.add(`loaded`);
};

document.addEventListener(`DOMContentLoaded`, function () {
  const parentEl = document.querySelector(`.page-content .screen--prizes`);
  const curtain = document.createElement(`div`);
  const pointer = parentEl.querySelector(`.screen__wrapper`);
  curtain.className = `curtain`;
  parentEl.insertBefore(curtain, pointer);
});

const addStyle = function (element, css) {
  // const css = `.rules__link { animation-play-state: running, running; } .rules__link::before { animation-play-state: running; }`;
  const head = document.head || document.getElementsByTagName(`head`)[0];
  const style = document.createElement(`style`);

  head.appendChild(style);

  style.type = `text/css`;
  if (style.styleSheet) {
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
};

const rulesLink = document.querySelector(`.rules__item:last-of-type p`);
const rulesLinkStyle = `.rules__link { animation-play-state: running, running; } .rules__link::before { animation-play-state: running; }`;
rulesLink.addEventListener(`animationend`, function () {
  addStyle(rulesLink, rulesLinkStyle);
});

