import {render, replace} from '../utils/render.js';
import SortComponent from '../components/sort.js';
import TasksComponent from '../components/tasks.js';
import NoTasksComponent from '../components/no-tasks.js';
import TaskComponent from '../components/task.js';
import TaskEditComponent from '../components/task-edit.js';
import LoadMoreButtonComponent from '../components/load-more.js';

const TASKS_COUNT_ON_START = 8;
const TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {

  const onEscKeyDown = (event) => {
    if (event.keyCode === 27) {
      replace(taskComponent, taskEditComponent);
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  const editButtonClickHandler = () => {
    replace(taskEditComponent, taskComponent);
    document.addEventListener('keydown', onEscKeyDown);
  }

  const submitHandler = () => {
    replace(taskComponent, taskEditComponent);
  }

  let taskComponent = new TaskComponent(task);
  let taskEditComponent = new TaskEditComponent(task);

  taskComponent.setEditButtonClickHandler(editButtonClickHandler);
  taskEditComponent.setSubmitHandler(submitHandler);

  render(taskListElement, taskComponent, `beforeend`);
};

export default class BoardController {

  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(tasks) {
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, `beforeend`);
    } else {
      render(container, this._sortComponent, `beforeend`);
      render(container, this._tasksComponent, `beforeend`);
    }

    const taskListElement = this._tasksComponent.getElement();

    let visibleTasksCount = TASKS_COUNT_ON_START;
    tasks.slice(0, visibleTasksCount).forEach((task) => {
      renderTask(taskListElement, task);
    });

    render(container, this._loadMoreButtonComponent, `beforeend`);
    this._loadMoreButtonComponent.removeIfUnnesessary(visibleTasksCount, tasks.length);
    this._loadMoreButtonComponent.setClickHandler(() => {
      const currentVisibleTasksCount = visibleTasksCount;
      visibleTasksCount += TASKS_COUNT_BY_BUTTON;
      tasks.slice(currentVisibleTasksCount, visibleTasksCount).forEach((task) => renderTask(taskListElement, task));
      this._loadMoreButtonComponent.removeIfUnnesessary(visibleTasksCount, tasks.length);
    });
  }
}
