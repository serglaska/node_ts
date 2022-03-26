import { Todo } from "../models/todo";
import { RequestHandler } from "express";
/////////////////////////////////////////

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  try {
    const text = (req.body as { text: string }).text;
    const newTodo = new Todo(Math.random().toString(), text);
    TODOS.push(newTodo);

    res.json({
      message: 'Created Todo', createdTODO: newTodo
    })
  } catch (err) {
    next(err)
  }
};

export const getTodo: RequestHandler = (req, res, next) => {
  try {
    res.json({
      message: 'Show Todo', TODOS
    })
  } catch (err) {
    next(err)
  }
};

export const updateTodo: RequestHandler = (req, res, next) => {
  try {
    const id = req.params.id;
    const text = (req.body as { text: string }).text;
    const index = TODOS.findIndex(el => el.id === id);
    if (index < 0) throw Error('Id wasnt find');
    TODOS[index] = new Todo(TODOS[index].id, text);

    res.json({
      message: 'Todo was updated', TODOS: TODOS
    })
  } catch (err) {
    next(err)
  }
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  try {
    const id = req.params.id;
    const index = TODOS.findIndex(el => el.id === id);
    if (index < 0) throw Error('Id wasnt find');
    TODOS.splice(index, 1);
    res.json({
      message: 'Todo was deleted', TODOS: TODOS
    })
  } catch (err) {
    next(err)
  }
};
