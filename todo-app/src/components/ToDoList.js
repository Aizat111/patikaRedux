import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle, destroy ,getToDoAsync} from "../redux/todos/todosSlice";

function ToDoList() {
  const items = useSelector((state) => state.todos.items);
  const activeFilter =  useSelector((state) => state.todos.activeFilter)
  const dispatch = useDispatch();
  let filtered = [];
  const handleDestroy = (id)=>{
      if(window.confirm('Are you sure?')){
        dispatch(destroy(id))
      }
  }
  useEffect(()=>{
    dispatch(getToDoAsync())
  },[dispatch])

  filtered=items
  if(activeFilter!=='all'){
    filtered = items.filter((todo)=>
      activeFilter === 'active'
      ? todo.completed === false && todo 
      : todo.completed ===true &&todo
    )
  }
  return (
    <ul className="todo-list">
      {items.map((item) => {
        return (
          <li className={item?.completed ? "completed" : ""} key={item?.id}>
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                onChange={() => dispatch(toggle({ id: item?.id }))}
                checked={item?.completed}
              />
              <label>{item?.title}</label>
              <button className="destroy" onClick={()=>handleDestroy(item.id)}></button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ToDoList;
