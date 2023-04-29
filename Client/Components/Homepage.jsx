import React, { useState } from 'react';
import Counter from './counter/counter.js';

export default function Homepage() {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(prevCounter => prevCounter + 1);
  }

  return (
    <div className="container border bg-blue-200 shadow">
      <h1> I'm homepage</h1>
      <Counter />
    </div>
  )
}