import moment from 'moment';

const getYears = (end = 2020, start = 1970) => {
  const endY = new Date().getFullYear() + 30;
  const years = [];
  for (let i = start; i <= endY; i++) {
    years.push(i);
  }
  return years;
};

const getToday = () => {
  const year = moment().year();
  const month = moment().month() + 1;
  const targetM = month < 10 ? '0' + month : month;
  const date = moment().date();
  const targetDate = date < 10 ? '0' + date : date;
  return `${year}${targetM}${targetDate}`;
};

const getMonth = date => {
  const month = moment(date).month() + 1;
  return month < 10 ? '0' + month : month;
};

export default {
  getYears,
  getToday,
  getMonth,
};
