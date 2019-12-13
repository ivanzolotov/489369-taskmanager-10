const NUMBER_OF_TASKS = 5;

const filterNames = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `tags`,
  `archive`,
];

const generateFilters = (tasks = new Array(NUMBER_OF_TASKS)) => {
  return filterNames.map((filter) => {
    return {
      name: filter,
      count: (filter === `all`) ? tasks.length : ~~(Math.random() * tasks.length),
    }
  })
};

export { generateFilters };
