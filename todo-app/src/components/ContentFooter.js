import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {changeActiveFilter, clearCompleted} from '../redux/todos/todosSlice';
function ContentFooter() {
  const items = useSelector((state) => state.todos.items);
  const itemLeft = items.filter((item)=> !item.completed).length

  const activeFilter = useSelector((state)=> state.todos.activeFilter)
  const dispatch = useDispatch();

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemLeft} </strong> {itemLeft>1 ? 'items ' : 'item ' }
        left
      </span>
      <ul className="filters">
        <li>
          <a className= {activeFilter === 'all' ? 'selected' : ''} onClick={()=>dispatch(changeActiveFilter('all'))}>All</a>
        </li>
        <li>
          <a className= {activeFilter === 'active' ? 'selected' : ''} onClick={()=>dispatch(changeActiveFilter('active'))}>Active</a>
        </li>
        <li>
          <a className= {activeFilter === 'completed' ? 'selected' : ''} onClick={()=>dispatch(changeActiveFilter('completed'))}>Completed</a>
        </li>
      </ul>
      <button className="clear-completed" onClick={()=>dispatch(clearCompleted())}>Clear Completed </button>
    </footer>
  );
}

export default ContentFooter;
