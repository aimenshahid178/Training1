let todo_list = [];

function add_item(item){
    todo_list.push(item);
    console.log(todo_list);
    display_new_item(item);

};

function edit_item(x){
    var change = prompt("Changes in To Do Item: ");
    if(change != null){
        document.getElementById(x).innerHTML = change;
    }
};

function display_items(){
    
    for(let i = 0; i < todo_list.length; i++){
        let newDiv = document.createElement("div");
        let newContent = document.createTextNode(todo_list[i]);
        newDiv.setAttribute("id", todo_list[i]);
        newDiv.onclick = function(){ newDiv.remove(); };
        newDiv.appendChild(newContent);
        var currentDiv = document.getElementById("demo"); 
        document.body.insertBefore(newDiv, currentDiv);
        document.getElementById(todo_list[i]).addEventListener("contextmenu",function(){edit_item(todo_list[i])});
        
    }
};

function display_new_item(item){
    let newDiv = document.createElement("div");
    let newContent = document.createTextNode(item);
    newDiv.setAttribute("id", todo_list.indexOf(item));
    newDiv.onclick = function(){ newDiv.remove(); };
    newDiv.appendChild(newContent);
    var currentDiv = document.getElementById("demo"); 
    document.body.insertBefore(newDiv, currentDiv);
    document.getElementById(todo_list.indexOf(item)).addEventListener("contextmenu",function(){edit_item(todo_list.indexOf(item))});

}
