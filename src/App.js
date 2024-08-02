import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState } from 'react';
let nextId = 0;
function App() {

  const [inputToDo, setIputToDo] = useState('');
  const [listToDos, setListToDos] = useState([]);
  const [editing, setEditing] = useState(false);
  let viewMode = {};
  let editMode = {};
  if (editing) {
    viewMode.display = 'none';
  } else {
    editMode.display = 'none';
  }

  const handleSubmit = (e) => {
    setIputToDo(e.target.value);
  };
  const handleEditing = () => {
    setEditing(true);
  };
  
  const updateItem = (updatedTitle,id) => {
    // 1. Find the todo with the provided id
    const currentTodoIndex = listToDos.findIndex((todo) => todo.id === id);
    // 2. Mark the todo as complete
    const updatedTodo = { ...listToDos[currentTodoIndex], task: updatedTitle};
    // 3. Update the todo list with the updated todo
    const newTodos = [
      ...listToDos.slice(0, currentTodoIndex),
      updatedTodo,
      ...listToDos.slice(currentTodoIndex + 1)
    ];
    setListToDos(newTodos);
  }

  const deleteItem = (id) => {
    setListToDos((listToDos) => listToDos.filter((item) => item.id !== id));
  };

  const insertItem = () => {
    const singleListItem = {
      id: nextId++,
      task: inputToDo
    }
    setListToDos(oldArray => [...oldArray, singleListItem]);
    setIputToDo('')
  }

  const handleUpdatedDone = (event) => {
    if (event.key === 'Enter') {
      setEditing(false);
    }
  };
  return (
    <div className="bg-color container">
      <h1> to do list </h1>
      <div className="inputFlex">
        <div>
          <input value={inputToDo} onChange={(e) => handleSubmit(e)} ></input>
        </div>
        <div>
          <button onClick={insertItem} >Add</button>
        </div>
      </div>
      <ul>
        {listToDos.map(listToDo => (
          <li key={listToDo.id}>
            <div style={viewMode}>
              <input value={listToDo.task}></input>
              <button onClick={() => deleteItem(listToDo.id)}>delete</button>
              <button onClick={handleEditing}>Edit</button>
            </div>
            
              <input type='text' value={listToDo.task} className='editTextInput' style={editMode}
                    onKeyDown={handleUpdatedDone}
                    onChange={(e) => updateItem(e.target.value, listToDo.id)} />
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
