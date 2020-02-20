// https://jsbin.com/liqavu/edit?html,js,output

let todo_list = [];
let checked = [];
var dropTarget = document.querySelector(".wrapper");
var draggables = document.querySelectorAll(".task");
var container = document.querySelector(".box");

Sortable.create(container);
task.addEventListener("keydown", function(event){
  if(event.keyCode === 13){
    event.preventDefault();
    add_item(document.getElementById('task').value);
  }
})


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

function edit_item(item){
    var change = prompt("Changes in To Do Item: ");
    if(change != ""){
      for(let i = 0; i<todo_list.length; i++){
        if(change === todo_list[i]){
          alert("This task already exists in the Todo List, please add a different item.");
          return
        }
      }
        document.getElementById(item).childNodes[1].nodeValue = change;
    }
    else{
      alert("You cannot add an empty item.");
    }
};

function delete_item(item){
  document.getElementById(item).remove();
  todo_list = todo_list.filter(i => {return i != item});  
};

function multiple_delete(){
  for(let i = 0; i<checked.length; i++){
    document.getElementById(checked[i]).remove();
    todo_list = todo_list.filter(x => {return x != checked[i]});
  }
  checked = [];
}

function create_new_item(item){
  let div_id = item;
  let newDiv = document.createElement("div");
  let delButton = document.createElement("button");
  let editButton = document.createElement("button");
  let select = document.createElement("input");
  select.type = "checkbox";
  select.addEventListener('change', function(){
    if(this.checked){
      checked.push(div_id);
    }
  })
  delButton.innerHTML = "DELETE";
  editButton.innerHTML = "EDIT";
  editButton.onclick = function(){edit_item(div_id)};
  delButton.onclick = function(){delete_item(div_id)};
  editButton.setAttribute("style", "margin-left: 30%");
  delButton.setAttribute("style", "margin-left: 5%");
  let newContent = document.createTextNode(item);
  select.setAttribute("style", "margin-left: 5px");
  select.setAttribute("style", "margin-right: 20px");
  newDiv.setAttribute("id", div_id);
  newDiv.setAttribute("draggable",true);
  newDiv.setAttribute("class", "task");
  newDiv.appendChild(select);
  newDiv.appendChild(newContent);
  newDiv.appendChild(editButton);
  newDiv.appendChild(delButton);
  container.appendChild(newDiv);
  startDrag();
  dragOver();
  drop();
};

function display_items(){
  for(let i = 0; i < todo_list.length; i++){
      let item = todo_list[i];
      create_new_item(item);    
  }
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




