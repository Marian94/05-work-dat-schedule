//Add the hours to have in the schedule
const hours = [
  "6AM",
  "7AM",
  "8AM",
  "9AM",
  "10AM",
  "11AM",
  "12PM",
  "1PM",
  "2PM",
  "3PM",
  "4PM",
  "5PM",
  "6PM",
];
//Check the hours in the schedule and compare if the time is past, present or future
function checkClass(begginingTime) {
  const currentTime = moment(moment().format("h A"), "h a");
  console.log("schedule", begginingTime._d);
  console.log("now", currentTime._d);
  if (currentTime.isSame(begginingTime._d)) {
    return "present";
  } else {
    return currentTime.isBefore(begginingTime) ? "future" : "past";
  }
}
//Create the timeblocks
function createTimeBlocks(hours) {
  hours.map((hour) => {
    const localStorageValue = localStorage.getItem(`${hour}-localStorage`)
      ? localStorage.getItem(`${hour}-localStorage`)
      : "";
    const trId = moment(`${hour}`, "h a");
    const className = checkClass(trId);
    const disable = className !== "past" ? "" : "readonly";
    const tr = $(`<tr id="${trId}-timeBlock" class="${className}">`);
    const placeholder =
      className !== "past" ? "Add task" : "You can't add a task";
    tr.append($(`<td class="hour">${hour}</td>`));
    tr.append(
      $(`<td>
              <textarea class="form-control" placeholder="${placeholder}" id="${hour}-task" style="height: 100px" ${disable}>${localStorageValue}</textarea>
          </td>`)
    );
    tr.append(
      $(`<td>
            <button class="saveBtn" style="width: 100%" id="${hour}-button">
              <i aria-label="save" class="bi bi-save"></i> Save
            </button>
          </td>
          `)
    );
    $("#timeBlock").append(tr);
  });
}
//Save functionality
function saveTask(e) {
  const getIdElement = e.currentTarget.id.split("-")[0];
  const textareaId = `${getIdElement}-task`;
  const saveTextareValue = $(`#${textareaId}`).val();
  localStorage.setItem(`${getIdElement}-localStorage`, saveTextareValue);
}

// This interval shows the date in the page
setInterval(function () {
  $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
}, 1000);

createTimeBlocks(hours);
//Add event listener to the buttons with jquery
$(".saveBtn").on("click", saveTask);
