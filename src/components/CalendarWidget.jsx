import React, { useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns';

export default function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const header = () => (
    <div className="calendar-header">
      <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>←</button>
      <h3>{format(currentDate, 'MMMM yyyy')}</h3>
      <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>→</button>
    </div>
  );

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const cells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        days.push(
          <div
            key={cloneDay}
            className={`calendar-cell ${
              !isSameMonth(cloneDay, monthStart) ? 'disabled' : ''
            } ${isSameDay(cloneDay, new Date()) ? 'today' : ''}`}
          >
            {format(cloneDay, 'd')}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="calendar-row" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="calendar-body">{rows}</div>;
  };

  return (
    <div className="widget calendar-widget">
      {header()}
      <div className="calendar-days">
        {daysOfWeek.map((day) => (
          <div key={day} className="calendar-day">
            {day}
          </div>
        ))}
      </div>
      {cells()}
    </div>
  );
}
