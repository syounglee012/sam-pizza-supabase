import React, { useState } from "react";
import "./pizza.css";
import {
  fetchPizza,
  addPizza,
  editPizza,
  removePizza,
  removePizzaTopping,
  addPizzaTopping,
} from "./actions";

export default function Pizza({ toppings, pizza }) {
  const [pizzas, setPizzas] = useState(pizza);
  const [newPizzaName, setNewPizzaName] = useState("");
  const [editingPizzaIndex, setEditingPizzaIndex] = useState(null);
  const [tempPizzaName, setTempPizzaName] = useState("");

  const handleAddPizza = () => {
    const pizzaExists = pizzas.some(
      (pizza) => pizza.name.toLowerCase() === newPizzaName.toLowerCase()
    );

    if (!pizzaExists && newPizzaName.trim() !== "") {
      addPizza(newPizzaName);
      setNewPizzaName("");
      fetchPizzaHandler();
    } else {
      alert("This pizza already exists or input is invalid!");
    }
  };

  const handleRemovePizza = (id) => {
    removePizza(id);
    fetchPizzaHandler();
  };

  const handleNewPizzaName = (id, name) => {
    setEditingPizzaIndex(id);
    setTempPizzaName(name);
  };

  const handleEditPizza = () => {
    if (tempPizzaName !== "") {
      editPizza(editingPizzaIndex, tempPizzaName);
      setEditingPizzaIndex(null);
      fetchPizzaHandler();
    } else alert("Pizza name is required");
  };

  const selectedToppingHandler = (id, value) => {
    const selectedPizza = pizzas.find((pizza) => pizza.id === id);

    const toppingExists = selectedPizza?.toppings?.some(
      (topping) => topping === value
    );

    if (!toppingExists && value.trim() !== "") {
      addPizzaTopping(id, value);
      fetchPizzaHandler();
    } else {
      alert("This topping already exists or input is invalid!");
    }
  };

  const handleRemovePizzaTopping = (id, value) => {
    removePizzaTopping(id, value);
    fetchPizzaHandler();
  };

  function fetchPizzaHandler() {
    fetchPizza()
      .then((fetchData) => {
        setPizzas(fetchData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <div className="pizza-container">
      <div>Create a New Pizza</div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Pizza Name"
          value={newPizzaName}
          onChange={(e) => setNewPizzaName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddPizza();
            }
          }}
        />
        <button onClick={handleAddPizza}>Create</button>
      </div>

      <div className="pizza-list">
        {pizzas
          .sort((a, b) => a.id - b.id)
          .map((pizza, index) => (
            <div key={index} className="pizza-item">
              {editingPizzaIndex === pizza.id ? (
                <div>
                  <input
                    className="new-name-input"
                    type="text"
                    value={tempPizzaName}
                    onChange={(e) => setTempPizzaName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleEditPizza();
                      }
                    }}
                  />
                  <div>
                    <button className="save-btn" onClick={handleEditPizza}>
                      Save
                    </button>
                    <button onClick={() => setEditingPizzaIndex(null)}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3>{pizza.name}</h3>
                  <button
                    onClick={() => handleNewPizzaName(pizza.id, pizza.name)}
                  >
                    Edit
                  </button>
                </div>
              )}
              <select
                value={""}
                onChange={(e) =>
                  selectedToppingHandler(pizza.id, e.target.value)
                }
              >
                <option value="">Select Topping</option>
                {toppings.map((topping, toppingIndex) => (
                  <option key={toppingIndex} value={topping.name}>
                    {topping.name}
                  </option>
                ))}
              </select>
              <ul>
                {pizza.toppings !== null &&
                  pizza.toppings.map((topping, toppingIndex) => (
                    <li key={toppingIndex}>
                      {topping}
                      <button
                        onClick={() =>
                          handleRemovePizzaTopping(pizza.id, topping)
                        }
                      >
                        Remove
                      </button>
                    </li>
                  ))}
              </ul>

              <button
                className="del-btn"
                onClick={() => handleRemovePizza(pizza.id)}
              >
                Delete Pizza
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
