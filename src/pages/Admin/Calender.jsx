import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Theme with blue highlight

// Optional: custom config
const calendarOptions = {
  defaultDate: new Date(), // today
  inline: true, // shows it embedded (not as popup)
  onReady: (selectedDates, dateStr, instance) => {
    const today = new Date().toDateString();
    const days = instance.calendarContainer.querySelectorAll(".flatpickr-day");

    days.forEach((day) => {
      if (day.dateObj.toDateString() === today) {
        day.classList.add("custom-today");
      }
    });
  },
};
