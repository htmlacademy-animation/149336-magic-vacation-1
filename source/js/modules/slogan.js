export default class CreateAnimatedSlogan {
  constructor(
      elementSelector,
      timer,
      classForActivate,
      property
  ) {
    this._TIME_SPACE = 100;

    this._elementSelector = elementSelector;
    this._timer = timer;
    this._classForActivate = classForActivate;
    this._property = property;
    this._element = document.querySelector(this._elementSelector);

    this.prePareText();
  }

  countDelayLetter(letter, pre, index) {
    let delayLetter;
    switch (pre) {
      case 0:
        switch (index) {
          case 0:
            delayLetter = 300;
            break;
          case 1:
          case 3:
          case 5:
            delayLetter = 100;
            break;
          case 2:
          case 6:
          case 9:
          case 11:
            delayLetter = 0;
            break;
          case 4:
          case 8:
          case 10:
            delayLetter = 200;
            break;
          case 7:
            delayLetter = 400;
            break;
          default:
            delayLetter = 1000;
        }
        break;
      case 1:
        switch (index) {
          case 3:
            delayLetter = 500;
            break;
          case 5:
            delayLetter = 600;
            break;
          case 2:
            delayLetter = 700;
            break;
          case 0:
          case 4:
            delayLetter = 800;
            break;
          case 1:
            delayLetter = 900;
            break;
          default:
            delayLetter = 1000;
        }
        break;
    }
    return delayLetter;
  }

  createElement(letter, del) {
    const span = document.createElement(`span`);
    span.textContent = letter;
    span.style.transition = `${this._property} ${this._timer}ms ease ${del}ms`;
    return span;
  }

  prePareText() {
    if (!this._element) {
      return;
    }
    const text = this._element.textContent.trim().split(` `).filter((latter)=>latter !== ``);
    // result = [Т,3],[а,1],[и, 0],[н,1],[с,2],[т,1],[в,0],[е,4],[н,2],[н,0],[ы,2],[й,0],[о,8],[т,9],[п,7],[у,5],[с,8],[к,6]
    const content = text.reduce((fragmentParent, word, index) => {
      let pre = index;
      const wordElement = Array.from(word).reduce((fragment, latter, ind) => {
        fragment.appendChild(this.createElement(latter, this.countDelayLetter(latter, pre, ind)));
        return fragment;
      }, document.createDocumentFragment());
      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`text__word`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);
      return fragmentParent;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  runAnimation() {
    if (!this._element) {
      return;
    }
    this._element.classList.add(this._classForActivate);
  }

  destroyAnimation() {
    this._element.classList.remove(this._classForActivate);
  }
}
