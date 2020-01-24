import {render} from './utils.js';

import SiteMenuComponent from './components/site-menu.js';
import FilterComponent from './components/filter.js';
import BoardComponent from './components/board.js';
import SortComponent from './components/sort.js';
import TasksComponent from './components/tasks.js';
import NoTasksComponent from './components/no-tasks.js';
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
const isAllTasksArchived = tasks.every((task) => task.isArchive);

const renderTask = (task) => {
  let taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);

  let taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);

  editButton.addEventListener(`click`, () => {
    const onEscKeyDown = (event) => {
      if (event.keyCode === 27) {
        taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
    document.addEventListener('keydown', onEscKeyDown);
  });

  editForm.addEventListener(`submit`, () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  });

  render(taskListElement, taskComponent.getElement(), `beforeend`);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
render(siteHeaderElement, new SiteMenuComponent().getElement(), `beforeend`);
render(siteMainElement, new FilterComponent(filters).getElement(), `beforeend`);

const boardComponent = new BoardComponent();
const sortComponent = new SortComponent();
const tasksComponent = new TasksComponent();

render(siteMainElement, boardComponent.getElement(), `beforeend`);

if (isAllTasksArchived) {
  render(boardComponent.getElement(), new NoTasksComponent().getElement(), `beforeend`);
} else {
  render(boardComponent.getElement(), sortComponent.getElement(), `beforeend`);
  render(boardComponent.getElement(), tasksComponent.getElement(), `beforeend`);
}

const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

let visibleTasksCount = TASKS_COUNT_ON_START;
tasks.slice(0, visibleTasksCount).forEach((task) => {
  renderTask(task);
});

const loadMoreButtonComponent = new LoadMoreButtonComponent();
render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.board`);

removePointlessLoadMoreButton(loadMoreButtonComponent, visibleTasksCount, tasks.length);

loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
  const currentVisibleTasksCount = visibleTasksCount;
  visibleTasksCount += TASKS_COUNT_BY_BUTTON;

  tasks.slice(currentVisibleTasksCount, visibleTasksCount).forEach((task) => renderTask(task));
  removePointlessLoadMoreButton(loadMoreButtonComponent, visibleTasksCount, tasks.length);
});
