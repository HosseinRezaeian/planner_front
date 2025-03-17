import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment-jalaali";
import { DateClickArg } from "@fullcalendar/interaction"; // 👈 اضافه کردن نوع

const convertToJalali = (date: string | Date): string => {
  return moment(date).format("jYYYY/jMM/jDD");
};

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<{ id: string; title: string; date: string }[]>([
    { id: "1", title: "جلسه تیمی", date: "2024-03-20" },
    { id: "2", title: "تحویل پروژه", date: "2024-03-22" },
  ]);

  // رفع خطای TS7006 با استفاده از نوع DateClickArg
  const handleDateClick = (info: DateClickArg) => {
    const newEvent = { id: Date.now().toString(), title: "رویداد جدید", date: info.dateStr };
    setEvents([...events, newEvent]);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale="fa"
      events={events.map((event) => ({
        ...event,
        date: convertToJalali(event.date),
      }))}
      dateClick={handleDateClick}
      editable={true}
      selectable={true}
    />
  );
};

export default Calendar;
