import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public tasks: Todo[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.tasks = [];
  }

  addTask(task: string) {
    if (task === "") return;
    this.tasks.push({
      text: task,
      done: false
    });
  }
  removeTask(task: Todo) {
    const taskIndex = this.tasks.indexOf(task);
    if(taskIndex <= -1) return;
    this.tasks.splice(taskIndex, 1);
  }
  toggle(task: Todo) {
    task.done = !task.done;
  }
}

export interface Todo {
  text: string;
  done: boolean;
}
