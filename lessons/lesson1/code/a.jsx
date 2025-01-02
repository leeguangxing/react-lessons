import React, { useState } from 'react';

function App() {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      onClick={() => setIsActive(!isActive)}
      style={{ backgroundColor: isActive ? 'green' : 'red' }}
    >
      {isActive ? 'Active' : 'Inactive'}
    </button>
  );
}

export default App;
