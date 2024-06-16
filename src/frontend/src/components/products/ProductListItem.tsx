import React from 'react';
import Item, { CategoryType } from '../../models/Item'; // Assuming ItemInterface is the file name

const renderItems = (items: Item[]) => {
  return items.map((item) => (
    <div key={item.id}>
      <h2>{item.name}</h2>
      <p>Price: {item.price} zł</p>
      <p>Category: {item.category}</p>
      <p>Description: {item.description}</p>
      {item.url && <img src={item.url} alt={item.name} />}
    </div>
  ));
};

export default renderItems;
