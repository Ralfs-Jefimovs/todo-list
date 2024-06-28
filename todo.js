
const menuButton = document.querySelector('.menuButton');
const addButton = document.querySelector('.addButton');
const deleteButton = document.querySelector('.deleteButton');
const todoModal = document.querySelector('#modal');
const cover = document.querySelector('.cover');
const listView = document.querySelector('.todo-list');
const addTodo = document.querySelector('.addTodo');


let todos = [];

let menuOpen = false;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let now = new Date();

let today = now.getDate();
let month = now.getMonth();
let year = now.getFullYear();

document.querySelector('.date').innerHTML = today;
document.querySelector('.month').innerHTML = months[month];
document.querySelector('.year').innerHTML = year;




menuButton.addEventListener('click', ()=>{
    if(!menuOpen){
      addButton.classList.add("move");
      deleteButton.classList.add("move");
      document.querySelector('.fa-bars').classList.add('hide');
      document.querySelector('.fa-close').classList.remove('hide');
      menuOpen = !menuOpen;
    }else if(menuOpen){
        addButton.classList.remove("move");
        deleteButton.classList.remove("move");
        document.querySelector('.fa-bars').classList.remove('hide');
      document.querySelector('.fa-close').classList.add('hide');
        menuOpen = !menuOpen;
    }
})


addButton.addEventListener('click', ()=>{
  todoModal.classList.add('active');
  cover.classList.add('active');
})

cover.addEventListener('click', ()=>{
  todoModal.classList.remove('active');
  cover.classList.remove('active');
})

const hideModal = () => {
  todoModal.classList.remove('active');
  cover.classList.remove('active');
}


deleteButton.addEventListener('click', ()=>{
  let newTd = todos.filter( elm => {
    return !elm.isComplete;
  })

  todos = newTd;
  listfresher();
})




const complete=(i)=>{

  todos[i].isComplete = !todos[i].isComplete;

  listfresher();
}

const listfresher=()=>{
  listView.innerHTML="";
  renderTodos();
}


const renderTodos = ()=>{

  for(i in todos){

    let td = todos[i];
    
    let template = `<div class="listItem ${td.isComplete? 'complete' : null}">
        <p>
            ${td.title}<br>
            <small>${td.date}</small>
        </p>

        <span onClick="complete(${i})"></span>

      </div>`;

    listView.insertAdjacentHTML('beforeend', template);
  }
}



addTodo.addEventListener('click',()=>{
  
  event.preventDefault();

  let title = document.querySelector('.newTitle').value;
  let date = document.querySelector('.newDate').value;
  let form = document.querySelector('#addForm');


  let temp = {"title": title, "date": date, "isComplete": false};

  todos.push(temp);

  listfresher();
  hideModal();

  form.reset();
})


const initApp= async()=>{


  let localData = await localStorage.getItem("weDoData");

  let data = JSON.parse(localData);

  if(localData.length > 0) {
    todos = data;
  }

 renderTodos();
}

initApp();

window.addEventListener('beforeunload', function(e) {
  let data = JSON.stringify(todos);
  this.localStorage.setItem("weDoData", data);
})