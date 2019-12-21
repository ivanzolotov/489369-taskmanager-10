const COLORS = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
];

const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const getRandomBoolean = () => Math.random() < 0.5;

const makeTwoDigitNumber = (value) => (value < 10 ? `0${value}` : String(value));

const formatTime = (date) => {
  const hours = makeTwoDigitNumber(date.getHours() % 12);
  const minutes = makeTwoDigitNumber(date.getMinutes());
  const interval = date.getHours() > 11 ? `pm` : `am`;

  return `${hours}:${minutes} ${interval}`;
}

export { COLORS, MONTH_NAMES, getRandomBoolean, makeTwoDigitNumber, formatTime };
