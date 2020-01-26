// Служебные зависимости
import {render} from './utils/render.js';

// Импорт компонентов
import SiteMenuComponent from './components/site-menu.js';
import FilterComponent from './components/filter.js';
import BoardComponent from './components/board.js';

// Импорт контроллеров
import BoardController from './controllers/board.js';

// Импорт данных из моков
import {generateFilters} from './mock/filter.js';
import {generateTasks} from './mock/task.js';

// Параметризация
const TASK_COUNT = 30;

// Генерирование данных из моков
const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

// Отрисовка меню и фильтров
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
render(siteHeaderElement, new SiteMenuComponent(), `beforeend`);
render(siteMainElement, new FilterComponent(filters), `beforeend`);

// Отрисовка доски для задач
const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent, `beforeend`);

const boardController = new BoardController(boardComponent);
boardController.render(tasks);
