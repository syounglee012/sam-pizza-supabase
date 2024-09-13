"use client";
import React, { useState } from "react";
import Pizza from "../pizza-table/pizza";
import "./topping.css";
import {
  fetchTopping,
  addTopping,
  editTopping,
  removeTopping,
} from "./actions";

export default function Topping({ data, pizza }) {
  const [toppings, setToppings] = useState(data);
  const [editing, setEditing] = useState(null);
  const [newTopping, setNewTopping] = useState("");
  const [newToppingInput, setNewToppingInput] = useState("");

  const handleAddTopping = () => {
    const toppingExists = toppings.some(
      (topping) => topping.name.toLowerCase() === newToppingInput.toLowerCase()
    );

    if (!toppingExists && newToppingInput.trim() !== "") {
      addTopping(newToppingInput);
      setNewToppingInput("");
      fetchToppingHandler();
    } else {
      alert("This topping already exists or input is invalid!");
    }
  };

  const handleRemoveTopping = (id) => {
    removeTopping(id);
    fetchToppingHandler();
  };

  const handleEditTopping = (value) => {
    setEditing(value);
    setNewTopping(value);
  };

  const handleSaveTopping = (id) => {
    editTopping(id, newTopping);
    fetchToppingHandler();
    setEditing(null);
  };

  function fetchToppingHandler() {
    fetchTopping()
      .then((fetchData) => {
        setToppings(fetchData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="topping-container">
      <h1>Topping List</h1>
      <div className="add-topping-container">
        <input
          type="text"
          value={newToppingInput}
          onChange={(e) => setNewToppingInput(e.target.value)}
          placeholder="Add new topping"
        />
        <button onClick={handleAddTopping}>Add</button>
      </div>
      <table>
        <tbody>
          {toppings.map((topping, idx) => (
            <tr key={topping.id}>
              <td id="idx">{idx + 1}</td>
              <td>
                {editing === topping.name ? (
                  <input
                    type="text"
                    value={newTopping}
                    onChange={(e) => setNewTopping(e.target.value)}
                  />
                ) : (
                  topping.name
                )}
              </td>

              <td>
                {editing === topping.name ? (
                  <button onClick={() => handleSaveTopping(topping.id)}>
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEditTopping(topping.name)}>
                    Edit
                  </button>
                )}
              </td>
              <td>
                <button onClick={() => handleRemoveTopping(topping.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pizza toppings={toppings} pizza={pizza} />
    </div>
  );
}
