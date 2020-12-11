export default class CreateAnimatedSlogan {
  constructor(
      elementSelector,
      timer,
      classForActivate,
      property
  ) {
    this._elementSelector = elementSelector;
    this._timer = timer;
    this._classForActivate = classForActivate;
    this._property = property;
    this._element = document.querySelector(this._elementSelector);

    this.prePareText();
  }

  countDelayLetter(counter) {
    let delayLetter;
    switch (counter) {
      case 1:
        delayLetter = 300;
        break;
      case 2:
      case 4:
      case 6:
        delayLetter = 100;
        break;
      case 3:
      case 7:
      case 10:
      case 12:
        delayLetter = 0;
        break;
      case 5:
      case 9:
      case 11:
        delayLetter = 200;
        break;
      case 8:
        delayLetter = 400;
        break;
      case 16:
        delayLetter = 500;
        break;
      case 18:
        delayLetter = 600;
        break;
      case 15:
        delayLetter = 700;
        break;
      case 13:
      case 17:
        delayLetter = 800;
        break;
      case 14:
        delayLetter = 900;
        break;
      default:
        delayLetter = 1000;
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
    this._element.dataset.text = text.join(` `);
    // result = [Т,3],[а,1],[и, 0],[н,1],[с,2],[т,1],[в,0],[е,4],[н,2],[н,0],[ы,2],[й,0],[о,8],[т,9],[п,7],[у,5],[с,8],[к,6]
    let counter = 0;
    const content = text.reduce((fragmentParent, word) => {
      const wordElement = Array.from(word).reduce((fragment, latter) => {
        counter = counter + 1;
        fragment.appendChild(this.createElement(latter, this.countDelayLetter(counter)));
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
    this._element.textContent = this._element.dataset.text;
  }
}
