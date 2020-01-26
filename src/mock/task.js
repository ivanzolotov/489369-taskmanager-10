import {COLORS, getRandomBoolean} from '../utils/common.js';

const DESCRIPTIONS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const TAGS = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
];

const TAGS_MAX = 3;

const DATE_WINDOW = 7;

const defaultRepeatingDays = {
  mo: false,
  tu: false,
  we: false,
  th: false,
  fr: false,
  sa: false,
  su: false,
};

const getRandomArrayItem = (array) => array[~~(Math.random() * array.length)];

const getRandomArrayItems = (array, n) => {
  return array
    .filter(() => getRandomBoolean())
    .slice(0, n);
};

const getRandomDate = (windowInDays) => {
  const targetDate = new Date();
  const sign = getRandomBoolean() ? 1 : -1;
  const difference = sign * ~~(Math.random() * windowInDays);

  targetDate.setDate(targetDate.getDate() + difference);

  return targetDate;
};

const getRandomRepeatingDays = () => {
  const repeatingDays = Object.assign({}, defaultRepeatingDays);

  Object.keys(repeatingDays).forEach((key) => {
    repeatingDays[key] = getRandomBoolean();
  });

  return repeatingDays;
};

const generateTask = () => {
  const description = getRandomArrayItem(DESCRIPTIONS);
  const dueDate = getRandomBoolean() ? null : getRandomDate(DATE_WINDOW);
  const repeatingDays = dueDate ? defaultRepeatingDays : getRandomRepeatingDays();
  const tags = new Set(getRandomArrayItems(TAGS, ~~(Math.random() * (TAGS_MAX + 1))));
  const color = getRandomArrayItem(COLORS);
  const isFavorite = getRandomBoolean();
  const isArchive = getRandomBoolean();

  return {
    description,
    dueDate,
    repeatingDays,
    tags,
    color,
    isFavorite,
    isArchive,
  };
};

const generateTasks = (numberOfTasks) => {
  const tasks = [];

  for (let i = 0; i < numberOfTasks; i++) {
    tasks.push(generateTask());
  }
  return tasks;
};

export {generateTask, generateTasks};
