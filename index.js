// https://jsbin.com/liqavu/edit?html,js,output

let todo_list = [];
var dropTarget = document.querySelector(".wrapper");
var draggables = document.querySelectorAll(".task");
var container = document.querySelector(".box");


function add_item(item){
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

function delete_item(id){
  document.getElementById(id).remove();
  for(let i = 0; i<todo_list.length; i++){
    if(document.getElementById(i) != null){
      if(document.getElementById(i).getAttribute("style") === "background-color: yellow"){
        document.getElementById(i).remove();
      }
    }
  }
};

function create_new_item(item){
  let newDiv = document.createElement("div");
  let newContent = document.createTextNode(item);
  let div_id = todo_list.indexOf(item);
  newDiv.setAttribute("id", div_id);
  newDiv.setAttribute("draggable",true);
  newDiv.setAttribute("class", "task");
  newDiv.appendChild(newContent);
  container.appendChild(newDiv);
  newDiv.addEventListener("click",function(){delete_item(div_id)});
  newDiv.addEventListener("contextmenu",function(){edit_item(div_id)});
  newDiv.addEventListener("mouseover",function(){
  if(newDiv.getAttribute("style") === "background-color: yellow"){
    newDiv.setAttribute("style", "background-color: rgb(116, 157, 233)");
  }
  else{
    newDiv.setAttribute("style", "background-color: yellow")
  }});
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


