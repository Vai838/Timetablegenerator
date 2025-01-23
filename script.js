const timetableGrid = document.getElementById("timetable-grid");
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const legendContainer = document.getElementById("legend-container");


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

let legend = {}; // To store the subject legend information

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

  // Update the legend object
  legend[short] = { name, color };

  // Update the legend UI
  updateLegend();
  
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

// Function to update the legend UI
function updateLegend() {
  legendContainer.innerHTML = ""; // Clear existing legend
  for (const [short, { name, color }] of Object.entries(legend)) {
    const legendItem = document.createElement("div");
    legendItem.style.display = "flex";
    legendItem.style.alignItems = "center";
    legendItem.style.marginBottom = "5px";

    const colorBox = document.createElement("div");
    colorBox.style.width = "20px";
    colorBox.style.height = "20px";
    colorBox.style.backgroundColor = color;
    colorBox.style.marginRight = "10px";

    const text = document.createElement("span");
    text.textContent = `${short}: ${name}`;

    legendItem.appendChild(colorBox);
    legendItem.appendChild(text);
    legendContainer.appendChild(legendItem);
  }
}

function printAsPDF() {
  window.print();
}



function printAsPNG() {
// Get the actual dimensions of the timetable grid
  const timetable = document.getElementById('timetable-grid');
  const width = timetable.scrollWidth;
  const height = timetable.scrollHeight;
  html2canvas(document.getElementById('timetable-grid'), {
  useCORS: true, // Ensures CORS compliance for external resources
  scale: window.devicePixelRatio || 2, // Adjust scale for higher resolution
  width: width, // Full width of the timetable grid
  height: height, // Full height of the timetable grid
  scrollX: 0, // Prevent scrolling issues
  scrollY: 0, // Prevent scrolling issues
}).then((canvas) => {
  const link = document.createElement('a');
  link.download = 'timetable.png';
  link.href = canvas.toDataURL();
  link.click();
});

}

generateTimetable();
