const dragItemList = document.querySelectorAll(".drag-item-list");
const progressList = document.getElementById("progress-list");
const backLogList = document.getElementById("backlog-list");
const onHoldList = document.getElementById("onhold-list");
const completeList = document.getElementById("complete-list");

//addBtn

const addBtn = document.querySelectorAll(".add-btn");

let backLogListArray = [];
let progressListArray = [];
let onHoldListArray = [];
let completeListArray = [];
let updateOnLoad = false;
let dragItem;
let dragging = false;
let currColumn;

//drag container list
const listColums = [backLogList, progressList, onHoldList, completeList];

function getFromLocal() {
  if (localStorage.getItem("backlogitems")) {
    backLogListArray = JSON.parse(localStorage.backlogitems);
    progressListArray = JSON.parse(localStorage.progressitems);
    onHoldListArray = JSON.parse(localStorage.onholditems);
    completeListArray = JSON.parse(localStorage.completeitems);
  } else {
    backLogListArray = ["backlog", "as"];
    progressListArray = ["progress", "Asd"];
    onHoldListArray = ["onhold"];
    completeListArray = ["complete"];
  }
}

// function createDom(){

// }

function createDom(createElem, value, item, index) {
  const liEl = document.createElement("li");
  liEl.classList.add("li");
  liEl.textContent = item;
  liEl.draggable = true;
  liEl.contentEditable = true;
  liEl.setAttribute("onfocusout", `update(${value} , ${index})`);
  liEl.setAttribute("ondragstart", "drag(event)");
  if (liEl.textContent) {
    createElem.append(liEl);
  }
}

function filteration(array) {
  const filter = array.filter((arr) => arr !== null);
  return filter;
}

function updateDom() {
  if (!updateOnLoad) {
    getFromLocal();
  }

  //for backlog
  backLogList.textContent = "";
  backLogListArray.forEach((backlogitems, index) => {
    createDom(backLogList, 0, backlogitems, index);
  });
  backLogListArray = filteration(backLogListArray);

  //for progress
  progressList.textContent = "";
  progressListArray.forEach((progressitems, index) => {
    createDom(progressList, 1, progressitems, index);
  });

  progressListArray = filteration(progressListArray);

  //for onhold
  onHoldList.textContent = "";
  onHoldListArray.forEach((onholditems, index) => {
    createDom(onHoldList, 2, onholditems, index);
  });
  onHoldListArray = filteration(onHoldListArray);

  //for complete
  completeList.textContent = "";
  completeListArray.forEach((completeitems, index) => {
    createDom(completeList, 3, completeitems, index);
  });

  completeListArray = filteration(completeListArray);

  updateOnLoad = true;
  setInLocal();
}

function update(column, id) {
  const arrayList = [
    backLogListArray,
    progressListArray,
    onHoldListArray,
    completeListArray,
  ];
  const selectedColum = arrayList[column];
  const selectColEl = listColums[column].children[id].textContent;

  if (!dragging) {
    if (!selectColEl) {
      delete selectedColum[id];
    } else {
      selectedColum[id] = selectColEl;
    }

    updateDom();
  }
}

function rebuildArray() {
  console.log(backLogList.children);
  backLogListArray = [];
  for (let i = 0; i < backLogList.children.length; i++) {
    backLogListArray.push(backLogList.children[i].textContent);
    console.log(backLogListArray);
  }
  //progressList
  progressListArray = [];

  for (let i = 0; i < progressList.children.length; i++) {
    progressListArray.push(progressList.children[i].textContent);
  }

  //onholdlist

  onHoldListArray = [];
  for (let i = 0; i < onHoldList.children.length; i++) {
    onHoldListArray.push(onHoldList.children[i].textContent);
  }

  //oncomplete

  completeListArray = [];
  for (let i = 0; i < completeList.children.length; i++) {
    completeListArray.push(completeList.children[i].textContent);
  }

  updateDom();
}

function drag(e) {
  dragItem = e.target;
  dragging = true;
}

function onDrop(e) {
  e.preventDefault();
  dragItemList.forEach((col) => {});
  const parent = dragItemList[currColumn];
  parent.appendChild(dragItem);
  dragging = false;
  rebuildArray();
}

function onAllowDrop(e) {
  e.preventDefault();
}

function dragEnter(e) {
  currColumn = e;
}

function setInLocal() {
  //save in localStorage
  const arrayList = [
    backLogListArray,
    progressListArray,
    onHoldListArray,
    completeListArray,
  ];
  //arrayName
  const arrayName = ["backlog", "progress", "onhold", "complete"];
  arrayName.forEach((arrayName, index) => {
    localStorage.setItem(`${arrayName}items`, JSON.stringify(arrayList[index]));
  });
}

const newTxt = document.querySelectorAll(".text");

function addnew(number) {
  const newText0 = document.getElementById("newTxt0");
  const newText1 = document.getElementById("newTxt1");
  const newText2 = document.getElementById("newTxt2");
  const newText3 = document.getElementById("newTxt3");

  console.log(addBtn);
  for (let i = 0; i < addBtn.length; i++) {
    addBtn[0].setAttribute("id", "Btn0");
    addBtn[1].setAttribute("id", "Btn1");
    addBtn[2].setAttribute("id", "Btn2");
    addBtn[3].setAttribute("id", "Btn3");
  }

  const Btn0 = document.getElementById("Btn0");
  const Btn1 = document.getElementById("Btn1");
  const Btn2 = document.getElementById("Btn2");
  const Btn3 = document.getElementById("Btn3");

  if (number === 0) {
    newText0.hidden = false;
    Btn0.textContent = "Save";

    if (newText0.textContent !== "") {
      progressListArray.push(newText0.textContent);
    }
    if (newText0.textContent) {
      newText0.hidden = true;
      Btn0.textContent = "Add+";
    }

    newText0.textContent = "";
  }

  //for onHold

  if (number === 1) {
    newText1.hidden = false;
    Btn1.textContent = "Save";

    if (newText1.textContent !== "") {
      onHoldListArray.push(newText1.textContent);
    }
    if (newText1.textContent) {
      newText1.hidden = true;
      Btn1.textContent = "Add +";
    }
    newText1.textContent = "";
  }

  if (number === 2) {
    newText2.hidden = false;
    Btn2.textContent = "Save";

    if (newText2.textContent !== "") {
      backLogListArray.push(newText2.textContent);
    }
    if (newText2.textContent) {
      newText2.hidden = true;
      Btn2.textContent = "Add +";
    }
    newText2.textContent = "";
  }

  if (number === 3) {
    newText3.hidden = false;
    Btn3.textContent = "Save";

    if (newText3.textContent !== "") {
      completeListArray.push(newText3.textContent);
    }
    if (newText3.textContent) {
      newText3.hidden = true;
      Btn3.textContent = "Add +";
    }

    newText3.textContent = "";
  }

  updateDom();
  setInLocal();
}

updateDom();
