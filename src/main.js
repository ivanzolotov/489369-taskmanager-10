import {render} from './utils.js';

import SiteMenuComponent from './components/site-menu.js';
import FilterComponent from './components/filter.js';
import BoardComponent from './components/board.js';
import TaskComponent from './components/task.js';
import TaskEditComponent from './components/task-edit.js';
import LoadMoreButtonComponent from './components/load-more.js';

import {generateFilters} from './mock/filter.js';
import {generateTasks} from './mock/task.js';

const TASK_COUNT = 30;
const TASKS_COUNT_ON_START = 8;
const TASKS_COUNT_BY_BUTTON = 8;

const removePointlessLoadMoreButton = (component, showedTasks, loadedTasks) => {
  if (showedTasks >= loadedTasks) {
    component.getElement().remove();
    component.removeElement();
  }
};

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
render(siteHeaderElement, new SiteMenuComponent().getElement(), `beforeend`);
render(siteMainElement, new FilterComponent(filters).getElement(), `beforeend`);

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent.getElement(), `beforeend`);

const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);
render(taskListElement, new TaskEditComponent(tasks[0]).getElement(), `beforeend`);

let visibleTasksCount = TASKS_COUNT_ON_START;
tasks.slice(1, visibleTasksCount).forEach((task) => render(taskListElement, new TaskComponent(task).getElement(), `beforeend`));

const loadMoreButtonComponent = new LoadMoreButtonComponent();
render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.board`);

removePointlessLoadMoreButton(loadMoreButtonComponent, visibleTasksCount, tasks.length);

loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
  const currentVisibleTasksCount = visibleTasksCount;
  visibleTasksCount += TASKS_COUNT_BY_BUTTON;

  tasks.slice(currentVisibleTasksCount, visibleTasksCount).forEach((task) => render(taskListElement, new TaskComponent(task).getElement(), `beforeend`));
  removePointlessLoadMoreButton(loadMoreButtonComponent, visibleTasksCount, tasks.length);
});
