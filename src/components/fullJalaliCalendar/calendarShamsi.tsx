import React, { useState } from 'react';
import moment from 'moment-jalaali';
import "./style/calendar.css"
const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());

  const goToNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, 'jMonth'));
  };

  const goToPreviousMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'jMonth'));
  };

  const renderCalendar = () => {
    const startOfMonth = currentDate.clone().startOf('jMonth');
    const endOfMonth = currentDate.clone().endOf('jMonth');
    const daysInMonth = endOfMonth.diff(startOfMonth, 'days') + 1;

    const days = [];
    for (let i = 0; i < daysInMonth; i++) {
      const day = startOfMonth.clone().add(i, 'days');
      days.push(
        <div key={i} className="day">
          {day.format('jDD')}
        </div>
      );
    }

    return days;
  };

  return (
    <div>
      <h1>تقویم شمسی</h1>
      <div>
        <button onClick={goToPreviousMonth}>ماه قبل</button>
        <span>{currentDate.format('jMMMM jYYYY')}</span>
        <button onClick={goToNextMonth}>ماه بعد</button>
      </div>
      <div className="calendar">
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
