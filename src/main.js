const TASK_COUNT = 3;

import {createSiteMenuTemplate} from './components/site-menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createBoardTemplate} from './components/board.js';
import {createTaskTemplate} from './components/task.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createLoadMoreButtonTemplate} from './components/load-more.js';

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate());
render(siteMainElement, createBoardTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
render(taskListElement, createTaskEditTemplate());

for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListElement, createTaskTemplate());
}

// В лекции итерировались вот так, но зачем?!
// new Array(TASK_COUNT)
//   .fill(``)
//   .forEach(
//     () => render(taskListElement, createTaskTemplate())
//   );

const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, createLoadMoreButtonTemplate());
