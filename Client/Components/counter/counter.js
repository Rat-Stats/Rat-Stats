import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from './counterSlice';

export default function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');


  return (
    <div> 
        <button
          className="border bg-blue-400 shadow"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >+</button>
        <span className="border bg-red-400 shadow">{count}</span>
        <button
          className="border bg-green-400 shadow"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
    </div>
  )
}