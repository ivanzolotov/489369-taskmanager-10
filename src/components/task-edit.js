import {COLORS, monthNames, formatTime} from '../utils.js';

const createRepeatedDaysMarkup = (repeatingDays) => {
  return Object.keys(repeatingDays)
  .map((day) => {
    const isChecked = repeatingDays[day];
    const checkedStatus = isChecked ? `checked` : ``;

    return (
      `<input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-${day}-4" name="repeat" value="${day}" ${checkedStatus}>
      <label class="card__repeat-day" for="repeat-${day}-4">${day}</label>`
    );
  })
  .join(`\n`);
};

const createTagsMarkup = (tags) => {
  return Array.from(tags)
  .map((tag) => {
    return (
      `<span class="card__hashtag-inner">
        <input type="hidden" name="${tag}" value="repeat" class="card__hashtag-hidden-input">
        <p class="card__hashtag-name">#${tag}</p>
        <button type="button" class="card__hashtag-delete">delete</button>
      </span>`
    );
  })
  .join(`\n`);
};

const createColorsMarkup = (taskColor) => {
  return COLORS
  .map((color) => {
    const isChecked = (color === taskColor) ? `checked` : ``;
    return (
      `<input type="radio" id="color-${color}-4" class="card__color-input card__color-input--${color} visually-hidden" name="color" value="${color}" ${isChecked}>
      <label for="color-${color}-4" class="card__color card__color--${color}">${color}</label>`
    );
  })
  .join(`\n`);
};

export const createTaskEditTemplate = (task) => {
  const {description, dueDate, repeatingDays, tags, color} = task;

  const isDated = !!dueDate;
  const isRepeated = Object.values(repeatingDays).some(Boolean);

  const repeatClass = isRepeated ? `card--repeat` : ``;
  const dateStatus = isDated ? `yes` : `no`;
  const repeatStatus = isRepeated ? `yes` : `no`;
  const date = isDated ? `${dueDate.getDate()} ${monthNames[dueDate.getMonth()]}` : ``;
  const time = isDated ? formatTime(dueDate) : ``;
  const repeatedDaysMarkup = isRepeated ? createRepeatedDaysMarkup(repeatingDays) : ``;
  const tagsMarkup = tags ? createTagsMarkup(tags) : ``;
  const colorsMarkup = createColorsMarkup(color);

  return (
    `<article class="card card--edit card--${color} ${repeatClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
          <div class="card__textarea-wrap">
            <label>
              <textarea class="card__text" placeholder="Start typing your text here..." name="text">${description}</textarea>
            </label>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date:&nbsp;<span class="card__date-status">${dateStatus}</span>
                </button>
                ${isDated ? `
                <fieldset class="card__date-deadline">
                  <label class="card__input-deadline-wrap">
                    <input class="card__date" type="text" placeholder="" name="date" value="${date} ${time}">
                  </label>
                </fieldset>` : ``}
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${repeatStatus}</span>
                </button>
                ${isRepeated ? `
                <fieldset class="card__repeat-days">
                <div class="card__repeat-days-inner">
                  ${repeatedDaysMarkup}
                </div>
                </fieldset>` : ``}
              </div>
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${tagsMarkup}
                </div>
                <label>
                  <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here">
                </label>
              </div>
            </div>
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${colorsMarkup}
              </div>
            </div>
          </div>
          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};
