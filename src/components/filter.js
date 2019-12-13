import { getRandomBoolean } from '../utils.js';

const createFilterMarkup = (filter, index) => {
  const {name, count} = filter;
  const isChecked = index === 0 ? true : false;

  return (
    `<input
       type="radio"
       id="filter__all"
       class="filter__input
       visually-hidden"
       name="filter"
       ${isChecked ? `checked` : ``}
     >
     <label for="filter__all" class="filter__label">
       ${name} <span class="filter__all-count">${count}</span>
     </label>`
  );
}

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters
    .map((filter, i) => createFilterMarkup(filter, i))
    .join(`\n`);

  return (
    `<section class="main__filter filter container">
       ${filtersMarkup}
     </section>`
  );
};

export { createFilterTemplate };
