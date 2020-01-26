import AbstractComponent from './abstract-component.js';
import {remove} from '../utils/render.js';

const createLoadMoreButtonTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class LoadMoreButton extends AbstractComponent {

  getTemplate() {
    return createLoadMoreButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  removeIfUnnesessary(showedTasks, loadedTasks) {
    if (showedTasks >= loadedTasks) {
      remove(this);
    }
  }

}
