import throttle from 'lodash/throttle';
import CreateAnimatedSlogan from './slogan';

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
      if (screen.querySelector(`h1[class*="title"][data-text], p.intro__date[data-text], h2[class*="title"][data-text]`)) {
        let el = screen.querySelector(`h1[class*="title"][data-text], p.intro__date[data-text], h2[class*="title"][data-text]`);
        el.textContent = el.dataset.text;
        el.removeAttribute(`data-text`);
        el.classList.remove(`active`);
      }
    });
    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    setTimeout(() => {
      this.screenElements[this.activeScreen].classList.add(`active`);
      // animate title
      if (this.activeScreen === 0) {
        // Slogan animate
        const animationTopScreenTextLine = new CreateAnimatedSlogan(`.intro__title`, 500, `active`, `transform`);
        setTimeout(()=>{
          animationTopScreenTextLine.runAnimation();
          const animationBottomScreenTextLine = new CreateAnimatedSlogan(`.intro__date`, 500, `active`, `transform`);
          setTimeout(()=>{
            animationBottomScreenTextLine.runAnimation();
          }, 1500);
        }, 200);
      } else {
        const animationTextLine = new CreateAnimatedSlogan(`.screen.active h2[class$="title"]`, 500, `active`, `transform`);
        setTimeout(()=>{
          animationTextLine.runAnimation();
          // setTimeout(() => animationTextLine.destroyAnimation(), 1000);
        }, 500);
      }
    }, 500);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
