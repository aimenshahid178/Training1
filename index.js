let todo_list = [1,2,3,4];
let id;
//var container = document.querySelector("section");
var dropTarget = document.querySelector(".box");
var draggables = document.querySelectorAll(".task");


function add_item(item){
    todo_list.push(item);
    console.log(todo_list);
    display_new_item(item);

};

function edit_item(id){
    var change = prompt("Changes in To Do Item: ");
    if(change != null){
        document.getElementById(id).innerHTML = change;
    }
}; /*

function allowDrop(ev){
   ev.preventDefault();
};

function dragStart(ev){
    id = ev.target.id;
};

function drop(ev){
    ev.target.append(document.getElementById(id));
}; */

function display_items(){
    
    for(let i = 0; i < todo_list.length; i++){
        let newDiv = document.createElement("div");
        let newContent = document.createTextNode(todo_list[i]);
        newDiv.setAttribute("id", todo_list[i]);
        //newDiv.setAttribute("ondragstart", dragStart(event));
        newDiv.setAttribute("class", "task");
        newDiv.setAttribute("draggable",true);
        newDiv.onclick = function(){ newDiv.remove(); };
        newDiv.appendChild(newContent);
        dropTarget.appendChild(newDiv);
        //var currentDiv = document.getElementById("demo"); 
        //document.body.insertBefore(newDiv, currentDiv);
        document.getElementById(todo_list[i]).addEventListener("contextmenu",function(){edit_item(todo_list[i])});
        dropTarget.addEventListener("dragstart", function(ev){
            ev.dataTransfer.setData("srcId", ev.target.id);
        });
        dropTarget.addEventListener('dragover', function(ev) {
            ev.preventDefault();
          });
          dropTarget.addEventListener('drop', function(ev) {
            ev.preventDefault();
            let target = ev.target;
            let droppable  = target.classList.contains('box');
            let srcId = ev.dataTransfer.getData("srcId");
            
            if (droppable) {
              ev.target.appendChild(document.getElementById(srcId));
            }
          });
        
    }
};

function display_new_item(item){
    let newDiv = document.createElement("div");
    let newContent = document.createTextNode(item);
    newDiv.setAttribute("id", todo_list.indexOf(item));
    newDiv.setAttribute("draggable",true);
    newDiv.setAttribute("class", "task");
    newDiv.onclick = function(){ newDiv.remove(); };
    newDiv.appendChild(newContent);
    dropTarget.appendChild(newDiv);
    document.getElementById(todo_list.indexOf(item)).addEventListener("contextmenu",function(){edit_item(todo_list.indexOf(item))});
    dropTarget.addEventListener("dragstart", function(ev){
        ev.dataTransfer.setData("srcId", ev.target.id);
    });
    dropTarget.addEventListener('dragover', function(ev) {
        ev.preventDefault();
      });
      dropTarget.addEventListener('drop', function(ev) {
        ev.preventDefault();
        let target = ev.target;
        let droppable  = target.classList.contains('box');
        let srcId = ev.dataTransfer.getData("srcId");
        
        if (droppable) {
          ev.target.appendChild(document.getElementById(srcId));
        }
      });
    
}


