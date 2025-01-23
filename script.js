const timetableGrid = document.getElementById("timetable-grid");
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];


const timeSlots = [
  "09:00 - 09:50",
  "09:55 - 10:45",
  "10:55 - 11:45",
  "11:50 - 12:45",
  "12:45 - 01:40",
  "01:45 - 02:35",
  "02:40 - 03:30",
  "03:40 - 04:30",
  "04:35 - 05:30",
];



function generateTimetable() {
  // Set up grid columns
  timetableGrid.style.gridTemplateColumns = `150px repeat(${timeSlots.length}, 1fr)`;

  // Add time slot headers
  timetableGrid.innerHTML = "<div></div>"; // Empty top-left corner
  timeSlots.forEach((slot) => {
    const timeDiv = document.createElement("div");
    timeDiv.className = "time-slot";
    timeDiv.textContent = slot;
    timetableGrid.appendChild(timeDiv);
  });

  // Add days and slots
  days.forEach((day) => {
    const dayDiv = document.createElement("div");
    dayDiv.className = "day";
    dayDiv.textContent = day;
    timetableGrid.appendChild(dayDiv);

    timeSlots.forEach((slot, index) => {
      const cell = document.createElement("div");

      // Check for lunch break
      if (slot.includes("12:45 - 01:40")) {
        cell.className = "lunch";
        cell.textContent = "Lunch Break";
      } else if (index >= 9) {
        // Beyond the 9th period, leave cells empty
        cell.className = "empty";
        cell.textContent = "";
      } else {
        cell.className = "editable";
        cell.addEventListener("dblclick", () => {
          const color = prompt("Enter a background color (e.g., #ff5722, red):");
          if (color) {
            cell.style.backgroundColor = color;
          }
        });
      }
      timetableGrid.appendChild(cell);
    });
  });
}

// Add subjects and update timetable
function addSubject() {
  const name = document.getElementById("subject-name").value;
  const short = document.getElementById("subject-short").value;
  const color = document.getElementById("subject-color").value;

  if (!name || !short) {
    alert("Please enter a subject name and short form!");
    return;
  }

  const gridSlots = document.querySelectorAll(".editable");
  gridSlots.forEach((slot) => {
    slot.addEventListener("click", function () {
      slot.style.background = color;
      slot.textContent = short;
    });
  });

  // Clear input fields
  document.getElementById("subject-name").value = "";
  document.getElementById("subject-short").value = "";
}

function printAsPDF() {
  window.print();
}



function printAsPNG() {
  html2canvas(document.getElementById('timetable-grid'), {
  useCORS: true, // Ensures CORS compliance for external resources
}).then((canvas) => {
  const link = document.createElement('a');
  link.download = 'timetable.png';
  link.href = canvas.toDataURL();
  link.click();
});

}

generateTimetable();
