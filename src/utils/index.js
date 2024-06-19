import moment from 'moment';

export const formattedDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};

export const formattedTime = (time) => {
  return moment(time).fromNow();
};
