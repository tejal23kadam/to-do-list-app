import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useState } from 'react';
import Axio from './Axio';
let nextId = 0;


function App() {

  const [inputToDo, setIputToDo] = useState('');  //single input
  const [listToDos, setListToDos] = useState([]); //array of object {id :1 task:"task1"}
  const [editing, setEditing] = useState(false); //to set edit mode  or view mode (enable disable input for update)
  const [weekDay, setWeekDay] = useState(new Date()); 
  let viewMode = {};
  let editMode = {};
 
  if (editing) {
    viewMode.display = 'none'
  }
  else {
    editMode.display = 'none';
  }

  const handleSubmit = (e) => {
    setIputToDo(e.target.value);
  };

  const updateItem = (updatedTitle, id) => {
    //1. Find the todo with the provided id
    const currentTodoIndex = listToDos.findIndex((todo) => todo.id === id);
    console.log("this is currentToDoIndex of an array" + JSON.stringify(currentTodoIndex));

    //2. Mark the todo as complete
    const updatedTodo = { ...listToDos[currentTodoIndex], task: updatedTitle };
    console.log("this is updatedTodo of an array" + JSON.stringify(updatedTodo));
    // 3. Update the todo list with the updated todo
    const newTodos = [
      ...listToDos.slice(0, currentTodoIndex),
      updatedTodo,
      ...listToDos.slice(currentTodoIndex + 1)
    ];
    console.log("this is newTodos of an array" + JSON.stringify(newTodos));
    setListToDos(newTodos);

  }
  const deleteItem = (id) => {
    setListToDos((listToDos) => listToDos.filter((item) => item.id !== id));
  };

  const insertItem = () => {
    if (inputToDo != '') {
      const singleListItem = {
        id: nextId++,
        task: inputToDo
      }
      setListToDos(oldArray => [...oldArray, singleListItem]);
      setIputToDo('')
    }
  }
  const handleEditing = () => {
    setEditing(true);
    console.log("value of editing variable is = " + editing);
  };
  const handleUpdatedDone = (event) => {
    if (event.key === 'Enter') {
      setEditing(false);
    }
  }
  return (
    <div className="bg-color">

      {/* <Axio /> */}
      {/* <div className="container-sm"> */}
      <div>

        <h1 className='title handleeFontFamily'> to do list </h1>        
        <h3 className='weekName handleeFontFamily'>{weekDay.getDate()}-{weekDay.toLocaleDateString('en-us', { month:"long"})}-{weekDay.getFullYear()}</h3>
        <h3 className='weekName handleeFontFamily '>{weekDay.toLocaleDateString('en-us', { weekday:"long"})}</h3>
        <div className="inputFlex">
          <div className="col-75">
            <input value={inputToDo} onChange={(e) => handleSubmit(e)} placeholder='Add your task.....' className='handleeFontFamily'></input>
          </div>
          <div>
            <i className="bi bi-plus" onClick={insertItem}></i>
          </div>
        </div>
        <div>
          <ul className='ul-style'>

            {listToDos.map(listToDo => (
              <li key={listToDo.id} className="list-group-item px-3 rounded-pill rounded-3 list-group-item-light mb-2">
                <div>
                  <div className="col-75" style={viewMode} >
                    <input value={listToDo.task} disabled className='handleeFontFamily'></input>
                    <i className="bi bi-pencil-fill" onClick={handleEditing}></i>
                    <i className="bi bi-trash" onClick={() => deleteItem(listToDo.id)}></i>
                  </div>
                  <input type='text' value={listToDo.task} className='editTextInput handleeFontFamily' style={editMode}
                    onKeyDown={handleUpdatedDone}
                    onChange={(e) => updateItem(e.target.value, listToDo.id)} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
