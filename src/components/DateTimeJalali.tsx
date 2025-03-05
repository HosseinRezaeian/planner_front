// import React, { useRef, useState } from "react";
// import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";

// export default function CustomDatePicker() {
//   const fixedContainerRef = useRef<HTMLDivElement | null>(null);
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const [date, setDate] = useState<DateObject | null>(null);
//   const [isOpen, setIsOpen] = useState(false);

//   const handleOpenCalendar = () => {
//     setIsOpen(true);
//   };

//   return (
//     <div style={{ position: "relative", width: "200px" }}>
//       {/* Target Input */}
//       <input
//         ref={inputRef}
//         type="text"
//         value={date ? date.format("YYYY/MM/DD") : ""}
//         readOnly
//         onClick={handleOpenCalendar}
//         style={{
//           width: "180px",
//           height: "26px",
//           padding: "5px",
//           border: "1px solid #ccc",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//       />

//       {/* Fixed Container for DatePicker */}
//       {isOpen && (
//         <div
//           ref={fixedContainerRef}
//           style={{
//             position: "absolute",
//             top: "40px",
//             left: "0",
//             width: "180px",
//             zIndex: 1000,
//             backgroundColor: "white",
//             boxShadow: "0 0 6px rgba(0,0,0,0.2)",
//             borderRadius: "5px",
//           }}
//         >
//           {/* Calendar Component */}
//           <Calendar
//             value={date}
//             onChange={(selectedDate) => {
//               // setDate(new DateObject(selectedDate)); // ✅ تبدیل به DateObject
//               setIsOpen(false);
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }
