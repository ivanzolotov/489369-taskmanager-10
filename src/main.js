import {render, replace} from './utils/render.js';

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
  let taskEditComponent = new TaskEditComponent(task);

  const editButtonClickHandler = () => {
    const onEscKeyDown = (event) => {
      if (event.keyCode === 27) {

        replace(taskComponent, taskEditComponent);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    replace(taskEditComponent, taskComponent);
    document.addEventListener('keydown', onEscKeyDown);
  }

  taskComponent.setEditButtonClickHandler(editButtonClickHandler);
  taskEditComponent.setSubmitHandler(() => {
    replace(taskComponent, taskEditComponent);
  })

  render(taskListElement, taskComponent, `beforeend`);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
render(siteHeaderElement, new SiteMenuComponent(), `beforeend`);
render(siteMainElement, new FilterComponent(filters), `beforeend`);

const boardComponent = new BoardComponent();
const sortComponent = new SortComponent();
const tasksComponent = new TasksComponent();

render(siteMainElement, boardComponent, `beforeend`);

if (isAllTasksArchived) {
  render(boardComponent.getElement(), new NoTasksComponent(), `beforeend`);
} else {
  render(boardComponent.getElement(), sortComponent, `beforeend`);
  render(boardComponent.getElement(), tasksComponent, `beforeend`);
}

const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

let visibleTasksCount = TASKS_COUNT_ON_START;
tasks.slice(0, visibleTasksCount).forEach((task) => {
  renderTask(task);
});

const loadMoreButtonComponent = new LoadMoreButtonComponent();
render(boardComponent.getElement(), loadMoreButtonComponent, `beforeend`);

const boardElement = siteMainElement.querySelector(`.board`);

removePointlessLoadMoreButton(loadMoreButtonComponent, visibleTasksCount, tasks.length);

loadMoreButtonComponent.setClickHandler(() => {
  const currentVisibleTasksCount = visibleTasksCount;
  visibleTasksCount += TASKS_COUNT_BY_BUTTON;

  tasks.slice(currentVisibleTasksCount, visibleTasksCount).forEach((task) => renderTask(task));
  removePointlessLoadMoreButton(loadMoreButtonComponent, visibleTasksCount, tasks.length);
});
