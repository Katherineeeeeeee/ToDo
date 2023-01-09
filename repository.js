const Todo = require("./service/shemas/schema");

const getTodos = async () => {
  return await Todo.find();
};

const addTodo = async ({ body: todo }) => {
  let error = null;
  try {
    await Todo.create(todo);
  } catch (e) {
    error = e.message;
  }

  return {
    error,
    todoList: await getTodos(),
  };
};

const removeTodo = async (req) => {
  const id = req.body._id;
  let error = id ? null : "ID is not defined";

  if (id) {
    try {
      await Todo.deleteOne({ _id: id });
    } catch (e) {
      error = e.message;
    }
  }

  const todoList = await getTodos();
  return {
    error,
    todoList,
  };
};

const toggle = async (req) => {
  const todo = req.body;
  let error = todo?._id ? null : "Todo is not defined";

  if (todo?._id) {
    try {
      await Todo.updateOne({ _id: todo._id }, { done: !todo.done });
    } catch (e) {
      error = e.message;
    }
  }

  return {
    error,
    todoList: await getTodos(),
  };
};

const clear = async () => {
  try {
    await Todo.deleteMany();
    return {
      error: null,
      todoList: [],
    };
  } catch (error) {
    return {
      error: error.message,
      todoList: await getTodos(),
    };
  }
};

module.exports = {
  getTodos,
  addTodo,
  removeTodo,
  toggle,
  clear,
};
