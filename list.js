// remove comment to disable logs
// console.log = function() {};

const listEntries = JSON.parse(localStorage.getItem("listEntries"));
const entryStyle = JSON.parse(localStorage.getItem("entryStyle"));

console.log("Loaded listEntries: [" + listEntries + "]");
console.log("Loaded entryStyle: [" + entryStyle + "]");

// updates once at the beginning to instantly display loaded things from localstorage
updateList();

function addElement(value) {
  if (value != "") {
    value = value.replace("<", "");
    value = value.replace(">", "");

    listEntries.push(value);
    entryStyle.push(0);
    console.log(`Info: listEntries[${listEntries.length - 1}] = "${value}"`);

    updateList();
    // this is just for debug purposes, the user just wouldnt get a list entry
    // likely case for empty input
  } else console.log("Warning: Invalid Input");
}

function removeElement(entry) {
  listEntries.splice(entry, 1);
  entryStyle.splice(entry, 1);
  console.log(`Info: removed listEntries[${entry}]`);

  updateList();
}

function cycleColor(entry) {
  if (entryStyle[entry] != 3) {
    entryStyle[entry]++;
  } else entryStyle[entry] = 0;

  updateList();
}

function changeColor(entry, bgColor, textColor) {
  switch (entryStyle[entry]) {
    case 0:
      bgColor = "#cfe2f3";
      textColor = "darkblue";
      break;

    case 1:
      bgColor = "#d9ead3";
      textColor = "darkgreen";
      break;
    case 2:
      bgColor = "#fce5cd";
      textColor = "darkorange";
      break;
    case 3:
      bgColor = "#f4cccc";
      textColor = "darkred";
      break;
    default:
      bgColor = "white";
      textColor = "black";
      break;
  }

  document.getElementById(`li${entry}`).style.backgroundColor = bgColor;
  document.getElementById(`li${entry}`).style.color = textColor;
}

function shiftItem(entry, direction) {
  let temp = listEntries[entry];
  let temp2 = entryStyle[entry];

  if (direction == "down") {
    listEntries[entry] = listEntries[entry + 1];
    listEntries[entry + 1] = temp;

    entryStyle[entry] = entryStyle[entry + 1];
    entryStyle[entry + 1] = temp2;
    console.log(`shifted ${temp} ${direction}`);
  } else if (direction == "up") {
    listEntries[entry] = listEntries[entry - 1];
    listEntries[entry - 1] = temp;

    entryStyle[entry] = entryStyle[entry - 1];
    entryStyle[entry - 1] = temp2;

    console.log(`shifted ${temp2}  ${direction}`);
  }

  updateList();
}


// most importaint function, creates and updates list items
function updateList() {
  let text = "<ul>";
  // creates new list element for each entry in listEntries array (with custom id)
  for (let i = 0; i < listEntries.length; i++) {
    text += `<li class = "entryColor" id="li${i}">${listEntries[i]}\xa0
    <span id="deleteEntry${i}" class= "deleteEntry">x</span>\xa0
    <span style = "cursor: pointer" class = "menuitem" id="changeColor${i}">\xa0⋮\xa0</span>\xa0`;
    if (i != 0) {
      text += `<span style = "cursor: pointer" id="shiftUp${i}">˄</span>\xa0`;
    }
    if (i != listEntries.length - 1) {
      text += `<span style = "cursor: pointer" id="shiftDown${i}">˅</span>`;
    }

    text += `</li>`;
  }
  text += "</ul>";

  // this updates the visuals on the page
  document.getElementById("list").innerHTML = text;

  // adds custem click event for each entry
  // the i iteration will make sure only this entry is affected
  for (let i = 0; i < listEntries.length; i++) {
    document
      .getElementById(`deleteEntry${i}`)
      .addEventListener("click", function () {
        removeElement(i);
      });

    document
      .getElementById(`changeColor${i}`)
      .addEventListener("click", function () {
        cycleColor(i);
      });

    if (i != 0) {
      document
        .getElementById(`shiftUp${i}`)
        .addEventListener("click", function () {
          shiftItem(i, "up");
        });
    }
    if (i != listEntries.length - 1) {
      document
        .getElementById(`shiftDown${i}`)
        .addEventListener("click", function () {
          shiftItem(i, "down");
        });
    }

    // updates color of each element
    changeColor(i);
  }

  // removes old item and saves new entry
  localStorage.removeItem("listEntries");
  localStorage.setItem("listEntries", JSON.stringify(listEntries));

  localStorage.removeItem("entryStyle");
  localStorage.setItem("entryStyle", JSON.stringify(entryStyle));
}

// event to get enter-press, to add input value into list
input = document
  .getElementById("input")
  .addEventListener("keydown", ({ key }) => {
    if (key === "Enter") {
      addElement(document.getElementById("input").value);
      document.getElementById("input").value = "";
    }
  });
