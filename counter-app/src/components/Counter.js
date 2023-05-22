import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment,decrement, incrementByAmount} from '../redux/counter/counterSlice'
function Counter() {
  const countValue = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [number, setNumber] = useState(0)
  return (
    <div>
      <h1>{countValue}</h1>
    <button  onClick={()=>dispatch(decrement())} style={{marginRight: '10px'}}>Decrement</button>
    <button onClick={()=> dispatch(increment())}>Increment</button>

<br/>
<br/>
<input type='number' value={number} onChange={(event)=>{setNumber(event.target.value)}}/>
<button onClick={()=> dispatch(incrementByAmount(number))}>Increment by amount</button>
    </div>
  );
}

export default Counter;
