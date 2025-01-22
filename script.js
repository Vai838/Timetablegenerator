const subjectList = document.getElementById("subject-list");
const timetableGrid = document.querySelector(".grid");

// Generate time slots for the timetable
const startTime = 9;
const endTime = 17.5; // 5:30 PM
const lunchBreakStart = 12.75; // 12:45 PM
const lunchBreakEnd = 13.66; // 1:40 PM
const periodDuration = 50; // minutes

function generateTimeSlots() {
  let currentTime = startTime;
  while (currentTime < endTime) {
    const hours = Math.floor(currentTime);
    const minutes = (currentTime % 1) * 60;

    const timeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    const slot = document.createElement("div");

    if (currentTime >= lunchBreakStart && currentTime < lunchBreakEnd) {
      slot.className = "lunch";
      slot.textContent = "Lunch Break";
    } else {
      slot.textContent = timeString;
    }

    timetableGrid.appendChild(slot);
    currentTime += periodDuration / 60;
  }
}

// Add subjects to the legend and timetable
function addSubject() {
  const name = document.getElementById("subject-name").value;
  const short = document.getElementById("subject-short").value;
  const color = document.getElementById("subject-color").value;

  if (!name || !short) {
    alert("Please enter a subject name and short form!");
    return;
  }

  // Add to the legend
  const listItem = document.createElement("li");
  listItem.innerHTML = `<span style="color: ${color}; font-weight: bold;">${short}</span> - ${name}`;
  subjectList.appendChild(listItem);

  // Add to timetable grid
  const gridSlots = document.querySelectorAll(".grid div:not(.lunch)");
  for (const slot of gridSlots) {
    slot.addEventListener("click", function () {
      slot.style.background = color;
      slot.textContent = short;
    });
  }

  // Clear input fields
  document.getElementById("subject-name").value = "";
  document.getElementById("subject-short").value = "";
}

generateTimeSlots();
