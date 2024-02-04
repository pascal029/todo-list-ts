import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Todo } from "../entity/Todo";

export class TodoController {
  private todoRepository = AppDataSource.getRepository(Todo);

  async findAll(request: Request, response: Response, next: NextFunction) {
    const { userId } = request;
    const todos = await this.todoRepository.find({
      where: { user: { id: userId } },
      order: { todoDate: "ASC" },
    });
    return todos;
  }

  async findOne(request: Request, response: Response, next: NextFunction) {
    const { userId } = request;
    const { todoId } = request.params;
    const todo = await this.todoRepository.findOne({
      where: { id: Number(todoId) },
    });
    return todo;
  }

  async changeStatus(request: Request, response: Response, next: NextFunction) {
    const { todoId } = request.params;

    const todo = await this.todoRepository.findOne({
      where: { id: Number(todoId) },
    });
    await this.todoRepository
      .createQueryBuilder()
      .update(todo)
      .set({ status: !todo.status })
      .where("id = :id", { id: todo.id })
      .execute();

    return "success edit status";
  }

  async deleteOne(request: Request, response: Response, next: NextFunction) {
    const { todoId } = request.params;

    const todo = await this.todoRepository.findOne({
      where: { id: Number(todoId) },
    });

    await this.todoRepository.remove(todo);
    return "success delete todo";
  }
  async create(request: Request, response: Response, next: NextFunction) {
    const { userId } = request;

    const { todoName, todoDate } = request.body;
    console.log(todoName, todoDate);
    const newTodo = await this.todoRepository.save({
      todoName,
      todoDate: new Date(todoDate),
      user: {
        id: userId,
      },
    });
    return newTodo;
  }
}
