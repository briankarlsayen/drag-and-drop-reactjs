import React, { useState, useRef } from 'react';
import './App.css'

function App() {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [shoppingList, setShoppingList] = useState([
    { id: 1, name: "Chicken"},
    { id: 2, name: "Soy sauce"},
    { id: 3, name: "Carrot"},
    { id: 4, name: "Onion"},
    { id: 5, name: "Garlic"},
  ])
  const [isDragActive, setDragActive] = useState()

  const dragStart = (e, position) => {
    dragItem.current = position;
  };
 
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    setDragActive(position)
  };

  const drop = (e) => {
    const copyListItems = [...shoppingList];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setShoppingList(copyListItems);
    setDragActive(null)
  };

  return (
    <div className="App">
     <h1>Shopping List</h1>
     { shoppingList && shoppingList.map((item, index)=> (
        <div className={`${isDragActive === index ? 'drag-hovered shopping-item' : 'shopping-item'}`} 
        key={item.id}
        onDragStart={(e) => dragStart(e, index)}
        onDragEnter={(e) => dragEnter(e, index)}
        onDragEnd={drop}
        draggable>
          { item.name }
        </div>
     ))}
    </div>
  )
}

export default App
