import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';

import { Todo, TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and check tasks is empty', () => {
    expect(component).toBeTruthy();
    expect(component.tasks).toEqual([]);
  });

  it('should add task to a list of todos', () => {
    component.addTask('add this task for testing');
    expect(component.tasks).toBeTruthy();
    expect(component.tasks).toContain({
      text: 'add this task for testing',
      done: false
    });
  })

  it('should not add task to a list of todos if task text is empty', () => {
    component.addTask('');
    expect(component.tasks).toEqual([]);
  })

  it('should move task to done state from a list of todos', () => {
    const task: Todo = {
      text: 'add this task for testing to make a todo done',
      done: false
    };
    const task2: Todo = {
      text: 'add this task 2 for testing to make a todo done 2',
      done: false
    };
    component.tasks = [task, task2];
    component.toggle(task2); // toggling 1st task in the tasks array
    expect(component.tasks[1].done).toBe(true);
  })

  it('should move task to undone state from a list of todos', () => {
    const task: Todo = {
      text: 'add this task for testing to make a todo undone',
      done: true
    };
    const task2: Todo = {
      text: 'add this task 2 for testing to make a todo undone 2',
      done: false
    };
    component.tasks = [task, task2];
    component.toggle(task); // toggling 0th task in the tasks array
    expect(component.tasks[0].done).toBe(false);
  })

  it('should remove a task from a list of todos', () => {
    const task: Todo = {
      text: 'add this task for testing to remove a todo',
      done: false
    };
    const task2: Todo = {
      text: 'add this task 2 for testing to remove a todo 2',
      done: false
    };
    component.tasks = [task, task2]; // two task added
    component.removeTask(task2); // one removed
    expect(component.tasks.length).toEqual(1);
    expect(component.tasks).toEqual([task]);
  })

  it('should not break the app when trying to remove a task which is not found in a list of todos', () => {
    const task: Todo = {
      text: 'add this task for testing to remove a todo',
      done: false
    };
    const task2: Todo = {
      text: 'add this task 2 for testing to remove a todo 2',
      done: false
    };
    const task3: Todo = {
      text: 'add this task 3 for testing to remove a todo 3',
      done: false
    };
    component.tasks = [task, task2];
    component.removeTask(task3); // removing a task not in the tasks array
    expect(component.tasks.length).toEqual(2);
    expect(component.tasks).toEqual([task, task2]);
  })
});
