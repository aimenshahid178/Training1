// https://jsbin.com/liqavu/edit?html,js,output

let todo_list = ['1','2','3','4'];
var dropTarget = document.querySelector(".wrapper");
var draggables = document.querySelectorAll(".task");
var container = document.querySelector(".box");


function add_item(item){
  console.log(item);
  if (item === ""){
    alert("You cannot add an empty item.");
  }
  else{
    for(let i = 0; i < todo_list.length; i++){
      if(item === todo_list[i]){
        alert("This item already exists in the Todo List, please add a different item.");
        return;
      }
    }
    todo_list.push(item);
    console.log(todo_list);
    create_new_item(item);
  }
};

function edit_item(id){
    var change = prompt("Changes in To Do Item: ");
    if(change != ""){
        document.getElementById(id).innerHTML = change;
    }
    else{
      alert("You cannot add an empty item.");
    }
};

function create_new_item(item){
  let newDiv = document.createElement("div");
  let newContent = document.createTextNode(item);
  newDiv.setAttribute("id", todo_list.indexOf(item));
  newDiv.setAttribute("draggable",true);
  newDiv.setAttribute("class", "task");
  newDiv.onclick = function(){ newDiv.remove(); };
  newDiv.appendChild(newContent);
  container.appendChild(newDiv);
  document.getElementById(todo_list.indexOf(item)).addEventListener("contextmenu",function(){edit_item(todo_list.indexOf(item))});
  startDrag();
  dragOver();
  drop();
};

function startDrag(){
  dropTarget.addEventListener("dragstart", function(ev){
    ev.dataTransfer.setData("srcId", ev.target.id);
  });
};

function dragOver(){
  dropTarget.addEventListener('dragover', function(ev) {
    ev.preventDefault();
  });
};

function drop(ev){
  dropTarget.addEventListener('drop', function(ev) {
    ev.preventDefault();
    let target = ev.target;
    let droppable  = target.classList.contains('box');
    let srcId = ev.dataTransfer.getData("srcId");

    if (droppable) {
      ev.target.appendChild(document.getElementById(srcId));
      if(target.id === "complete"){
        document.getElementById(srcId).setAttribute("style", "background-color: green");
      }
    }
  });
};

function display_items(){
    for(let i = 0; i < todo_list.length; i++){
        let item = todo_list[i];
        create_new_item(item);    
    }
};


