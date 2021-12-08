import React from 'react';
import dateFormat from 'dateformat';
export const DateTime = ({ date, format = 'dd-mm-yyyy' }) => {
  return (
    <small>
      <i className="far fa-clock" />
      {dateFormat(date, format)}
    </small>
  );
};
