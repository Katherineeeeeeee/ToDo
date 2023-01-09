import { useState, useLayoutEffect } from "react";
import "./App.css";

const App = () => {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  useLayoutEffect(() => {
    async function getData() {
      const res = await fetch("/todos");
      const json = await res.json();
      setItems(json);
    }
    getData();
  }, []);

  const change = async (item, method) => {
    const response = await fetch("/todos", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    const { error, todoList } = await response.json();

    if (error) return alert(error);
    setItems(() => todoList);
  };

  const addTask = async (e) => {
    e.preventDefault();
    const task = {
      text: newItem,
      done: false,
    };

    change(task, "POST");

    setNewItem("");
  };

  const clear = async () => {
    const response = await fetch("/todos-all", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { error, todoList } = await response.json();

    if (error) return alert(error);
    setItems(() => todoList);
  };

  return (
    <>
      <div className="container">
        <form onSubmit={addTask}>
          <h1 className="title">Awesome Todo List</h1>
          <div className="wrap">
            <input
              className="bar"
              type="text"
              placeholder="Write your task..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />

            <button className="btn" type=" ">
              Add to list
            </button>
          </div>

          <ul>
            {items.map((item) => {
              return (
                <div key={item._id}>
                  <li>
                    <input
                      type="checkbox"
                      defaultChecked={item.done}
                      onChange={() => change(item, "PATCH")}
                      className="checkbox"
                    />

                    <span
                      style={{
                        textDecoration: item.done ? "line-through" : "none",
                      }}
                    >
                      {item.text}
                    </span>
                    <button
                      type="button"
                      onClick={() => change(item, "DELETE")}
                      className="close"
                    >
                      ❌
                    </button>
                  </li>
                </div>
              );
            })}
          </ul>
        </form>
      </div>

      {!items?.length ? null : (
        <div>
          <button className="clear" onClick={clear}>
            Clear
          </button>
        </div>
      )}
    </>
  );
};

export default App;
