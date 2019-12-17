import {createSiteMenuTemplate} from './components/site-menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createBoardTemplate} from './components/board.js';
import {createTaskTemplate} from './components/task.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createLoadMoreButtonTemplate} from './components/load-more.js';

import {generateFilters} from './mock/filter.js';
import {generateTask, generateTasks} from './mock/task.js';

const TASK_COUNT = 30;
const TASKS_COUNT_ON_START = 8;
const TASKS_COUNT_BY_BUTTON = 8;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const removePointlessLoadMoreButton = (element, showedTasks, loadedTasks) => {
  if (showedTasks >= loadedTasks) {
    element.remove();
  }
};

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate(filters));
render(siteMainElement, createBoardTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
render(taskListElement, createTaskEditTemplate(tasks[0]));

let visibleTasksCount = TASKS_COUNT_ON_START;
tasks.slice(1, visibleTasksCount).forEach((task) => render(taskListElement, createTaskTemplate(task)));

const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, createLoadMoreButtonTemplate());

const loadMoreElement = boardElement.querySelector(`.load-more`);
removePointlessLoadMoreButton(loadMoreElement, visibleTasksCount, tasks.length);

loadMoreElement.addEventListener(`click`, () => {
  const currentVisibleTasksCount = visibleTasksCount;
  visibleTasksCount += TASKS_COUNT_BY_BUTTON;

  tasks.slice(currentVisibleTasksCount, visibleTasksCount).forEach((task) => render(taskListElement, createTaskTemplate(task)));
  removePointlessLoadMoreButton(loadMoreElement, visibleTasksCount, tasks.length);
});
