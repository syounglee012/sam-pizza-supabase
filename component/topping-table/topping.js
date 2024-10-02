"use client";
import React, { useState, useEffect } from "react";
import Pizza from "../pizza-table/pizza";
import "./topping.css";
import {
  fetchTopping,
  addTopping,
  editTopping,
  removeTopping,
} from "./actions";
import { removeDeletedToppingsFromTheList } from "../pizza-table/actions";

export default function Topping({ data, pizza }) {
  const [toppings, setToppings] = useState(data);
  const [editing, setEditing] = useState(null);
  const [newTopping, setNewTopping] = useState("");
  const [newToppingInput, setNewToppingInput] = useState("");
  const regexp = /^\b(\w+\b\s*){1,15}$/;

  const handleAddTopping = () => {
    const toppingExists = toppings.some(
      (topping) => topping.name.toLowerCase() === newToppingInput.toLowerCase()
    );

    if (!toppingExists && regexp.test(newToppingInput.trim())) {
      addTopping(newToppingInput);
      setNewToppingInput("");
      fetchToppingHandler();
    } else {
      alert("This topping already exists or input is invalid!");
    }
  };

  const handleRemoveTopping = (id, value) => {
    removeTopping(id);
    removeDeletedToppingsFromTheList(value).then(() => fetchToppingHandler());
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTopping();
            }
          }}
        />
        <button onClick={handleAddTopping}>Add</button>
      </div>
      <table>
        <tbody>
          {toppings
            .sort((a, b) => a.id - b.id)
            .map((topping, idx) => (
              <tr key={topping.id}>
                <td id="idx">{idx + 1}</td>
                <td>
                  {editing === topping.name ? (
                    <input
                      type="text"
                      value={newTopping}
                      onChange={(e) => setNewTopping(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSaveTopping(topping.id);
                        }
                      }}
                    />
                  ) : (
                    topping.name
                  )}
                </td>
                <td className="topping-list">
                  {editing === topping.name ? (
                    <button onClick={() => handleSaveTopping(topping.id)}>
                      Save
                    </button>
                  ) : (
                    <button onClick={() => handleEditTopping(topping.name)}>
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() =>
                      handleRemoveTopping(topping.id, topping.name)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Pizza toppings={toppings} pizza={pizza} regexp={regexp} />
    </div>
  );
}
