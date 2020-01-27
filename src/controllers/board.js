import {render, replace, remove} from '../utils/render.js';
import SortComponent, {SortType} from '../components/sort.js';
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

const renderTasks = (taskListElement, tasks) => {
  tasks.forEach((task) => {
    renderTask(taskListElement, task);
  });
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
    renderTasks(taskListElement, tasks.slice(0, visibleTasksCount));

    const renderLoadMoreButton = () => {
      if (visibleTasksCount >= tasks.length) {
        return;
      }
      render(container, this._loadMoreButtonComponent, `beforeend`);
      this._loadMoreButtonComponent.setClickHandler(() => {
        const currentVisibleTasksCount = visibleTasksCount;
        visibleTasksCount += TASKS_COUNT_BY_BUTTON;
        renderTasks(taskListElement, tasks.slice(currentVisibleTasksCount, visibleTasksCount));
        this._loadMoreButtonComponent.removeIfUnnesessary(visibleTasksCount, tasks.length);
      });
    };

    renderLoadMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedTasks = [];

      switch (sortType) {
        case SortType.DATE_UP:
          sortedTasks = tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
          break;
        case SortType.DATE_DOWN:
          sortedTasks = tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
          break;
        case SortType.DEFAULT:
          sortedTasks = tasks.slice(0, visibleTasksCount);
          break;
      }
      taskListElement.innerHTML = ``;
      renderTasks(taskListElement, sortedTasks);
      if (sortType === SortType.DEFAULT) {
        renderLoadMoreButton();
      } else {
        remove(this._loadMoreButtonComponent);
      }
    });

  }
}
