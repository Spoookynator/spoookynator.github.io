function toggle(elem) {
  if (elem.innerHTML === "check_box") {
    elem.innerHTML = "check_box_outline_blank";
    localStorage.setItem(elem.getAttribute('id'), false);
    console.log(localStorage.getItem(elem.getAttribute('id')));
  } else {
    elem.innerHTML = "check_box";
    localStorage.setItem(elem.getAttribute('id'), true);
    console.log(localStorage.getItem(elem.getAttribute('id')));
  }


}

function loadCheckboxesFromStorage() {
  settingsContainer = document.getElementById("settings-container");
  settings = settingsContainer.children;

  for (const child of settings) {
    console.log(child.lastElementChild.id);
    child.lastElementChild.innerHTML = setCheckbox(localStorage.getItem(child.lastElementChild.id))
  }

}

function setCheckbox(isChecked) {
  if (isChecked === null) {

    return "check_box_outline_blank"
  }
  if (isChecked === "true") {
    return "check_box"
  } else {
    return "check_box_outline_blank"
  }
}