import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  isBefore, 
  startOfDay,
  getDay
} from 'date-fns';

const CalendarPicker = ({ selectedDate, onDateChange, closedDays = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <button
          type="button"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-lg font-bold text-gray-800">
          {format(currentMonth, 'MMMM yyyy')}
        </span>
        <button
          type="button"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 mb-2">
        {days.map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider py-2">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    const today = startOfDay(new Date());

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'd');
        const cloneDay = day;
        const dayOfWeek = getDay(day);
        const isPast = isBefore(day, today);
        const isClosed = closedDays.includes(dayOfWeek);
        const isSelected = isSameDay(day, selectedDate);
        const isCurrentMonth = isSameMonth(day, monthStart);

        days.push(
          <div
            key={day}
            className={`relative h-12 flex items-center justify-center cursor-pointer transition-all duration-200
              ${!isCurrentMonth ? 'text-gray-300' : ''}
              ${(isPast || isClosed) ? 'text-gray-200 cursor-not-allowed bg-gray-50' : 'hover:bg-rose-50'}
              ${isSelected ? 'bg-rose-500 text-white hover:bg-rose-600 rounded-lg shadow-md z-10 scale-110' : ''}
            `}
            onClick={() => (!isPast && !isClosed) && onDateChange(cloneDay)}
          >
            <span className="text-sm font-medium">{formattedDate}</span>
            {isClosed && isCurrentMonth && !isPast && (
              <span className="absolute top-1 text-[8px] text-gray-400 font-bold uppercase">Closed</span>
            )}
            {isSameDay(day, today) && !isSelected && !isClosed && (
              <div className="absolute bottom-1 w-1 h-1 bg-rose-500 rounded-full"></div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="px-2 pb-4">{rows}</div>;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {renderHeader()}
      <div className="p-2">
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
};

export default CalendarPicker;
