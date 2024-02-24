let menu = null;
let selectedItem = -1;
//hello
function AddItem() {
  
  //create the new elements
  var itemDiv = document.createElement("div");
  itemDiv.innerHTML = `
  <div id="item">
    <p id="item-text" class="item-text"></p>
    <button id="btn${parseInt(getCookie("ids")) + 1}" class="item-button" onclick="ChangeMenu(document.getElementById('setting-menu'),true)"><img src="https://static-00.iconduck.com/assets.00/settings-icon-2048x2046-cw28eevx.png" width="20px" height="20px" alt="item setting"></button>
  </div>`;

  //get items container
  var div = document.getElementById("item-container");

  //put elements into hierachy
  div.appendChild(itemDiv);

  var text = document.getElementById("item-text");
  text.innerText = document.getElementById("item-name").value;
  

  let total_ids = parseInt(getCookie("ids")) + 1;
  setCookie("ids", total_ids.toString());
  let name = `item${getCookie("ids")}`;
  setCookie(name, "0" + document.getElementById("item-name").value);

  text.setAttribute("id", getCookie("ids"));

  //reset
  document.getElementById("item-name").value = "";
  ChangeMenu(document.getElementById("add-menu"), false);
}

function AddSpecificItem(itemname, marked, id) {
  var itemDiv = document.createElement("div");

  

  itemDiv.innerHTML = `
  <div id="item">
    <p id="item-text" class="item-text"></p>
    <button id="btn${id}" class="item-button" onclick="ChangeMenu(document.getElementById('setting-menu'),true)"><img src="https://static-00.iconduck.com/assets.00/settings-icon-2048x2046-cw28eevx.png" width="20px" height="20px" alt="item setting"></button>
  </div>`;

  //get items container
  var div = document.getElementById("item-container");

  //put elements into hierachy
  div.appendChild(itemDiv);

  var text = document.getElementById("item-text");
  text.innerText = itemname
  text.style.textDecorationLine = marked == "1" ? "line-through" : "";

  text.setAttribute("id", id);
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
    deleteCookie(`item${selectedItem}`);
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
    text.style.textDecorationLine = text.style.textDecorationLine == "line-through" ? "" : "line-through";
    var marked = text.style.textDecorationLine == "line-through" ? "1" : "0";
    setCookie(`item${selectedItem}`, marked + text.innerText);
    ChangeMenu(document.getElementById("setting-menu"), false);
  } else {
    console.log("Error no selected item");
  }
}
function ChangeMenu(type, show) {
  console.log(document.cookie);
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

  var marked = text.style.textDecorationLine == "line-through" ? "1" : "0";
  setCookie(`item${selectedItem}`, marked + input.value);

  ChangeMenu(menu, false);
}

//****************************** */
// Cookie Handling
//****************************** */

function OnStart() {
  //clearAllCookies();
  let isNew = getCookie("new");
  if (isNew == "") {
    setCookie("new", "true");
    setCookie("ids", "0");
  }
  else {
    LoadItems();
  }
  console.log(document.cookie);
}

document.addEventListener('DOMContentLoaded', function() {
    // Your function call goes here
    OnStart();
});

function LoadItems() {
  let cookies = document.cookie.split(';');
  let ordered = [];

  cookies.forEach(cookie => {
    let [name, value] = cookie.trim().split('=');
    if (name.includes('item')) {
      let id = parseInt(name.replace("item", ""));
      let cookieObject = {id : id, value: cookie}
      ordered.push(cookieObject);
    }
  });
  
  ordered.sort((a,b) => a.id - b.id);

  ordered.forEach(obj => {
    let cookie = obj.value;
    let [name, value] = cookie.trim().split('=');
    if (name.includes('item')) {
      let val = value.substring(1);
      let id = name.replace("item", "");
      AddSpecificItem(val, value[0], id);
    }
  });
}

//****************************** */
// Cookies
//****************************** */
function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue + "; path=/";
}
function clearAllCookies() {
    let cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf('=');
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
}
function deleteCookie(cname) {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

