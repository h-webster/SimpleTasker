let menu = null;
let selectedItem = -1;
let ids = 0;
function AddItem() {
  ids += 1;
  //create the new elements
  var itemDiv = document.createElement("div");
  itemDiv.innerHTML = `
  <div id="item">
    <p id="item-text" class="item-text"></p>
    <button id="btn${ids}" class="item-button" onclick="ChangeMenu(document.getElementById('setting-menu'),true)"><img src="https://static-00.iconduck.com/assets.00/settings-icon-2048x2046-cw28eevx.png" width="20px" height="20px" alt="item setting"></button>
  </div>`;

  //get items container
  var div = document.getElementById("item-container");

  //put elements into hierachy
  div.appendChild(itemDiv);

  var text = document.getElementById("item-text");
  text.innerText = document.getElementById("item-name").value;

  text.setAttribute("id", ids);
  //reset
  document.getElementById("item-name").value = "";
  ChangeMenu(document.getElementById("add-menu"), false);
}

document.querySelector(".items").addEventListener("click", function (e) {
  if (e.target && e.target.matches("button > img")) {
    let parentDiv = e.target.closest("[id]");
    selectedItem = parentDiv.id;
    selectedItem = selectedItem.substring(3);
    console.log("Selected item: " + selectedItem);
    OpenSetting();
  }
});

document.querySelector(".items").addEventListener("click", function (e) {
  if (e.target && e.target.nodeName === "BUTTON") {
    let parentDiv = e.target.closest("[id]");
    selectedItem = parentDiv.id;
    selectedItem = selectedItem.substring(3);
    console.log("Selected item: " + selectedItem);
    OpenSetting();
  }
});
function RemoveItem() {
  if (selectedItem != "-1") {
    container = document.getElementById(selectedItem).parentNode;
    Supercontainer = container.parentNode;
    Supercontainer.removeChild(container);
    ChangeMenu(document.getElementById("setting-menu"), false);
  } else {
    console.log("Error no selected item");
  }
}

function Mark() {
  if (selectedItem != "-1") {
    var text = document.getElementById(selectedItem);
    text.style.textDecorationLine =
      text.style.textDecorationLine == "line-through" ? "" : "line-through";
    ChangeMenu(document.getElementById("setting-menu"), false);
  } else {
    console.log("Error no selected item");
  }
}
function ChangeMenu(type, show) {
  type.style.zIndex = show ? 999 : -1;
  menu = show ? type : null;
  selectedItem = show ? selectedItem : "-1";
}

function OpenSetting() {
  console.log("open");
  let input = document.getElementById("rename");
  let textValue = document.getElementById(selectedItem);
  console.log("Sel: " + selectedItem);
  input.value = textValue.textContent;
}

function Rename() {
  let text = document.getElementById(selectedItem);
  let input = document.getElementById("rename");
  text.textContent = input.value;
  ChangeMenu(menu, false);
}
