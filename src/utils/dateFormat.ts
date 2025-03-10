// src/utils/dateFormat.ts
import moment from 'moment';

const formatDate = (date: Date): string => {
  return moment(date).format('MMM DD, YYYY [at] hh:mm a');
};

export default formatDate;
