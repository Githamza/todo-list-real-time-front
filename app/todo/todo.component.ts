import { Tasks } from './tasks.model';
import { AddTaskService } from './todo.service';
import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  task = '';
  tasks: Tasks[] = [];
  loading = true;
  constructor(private addTaskService: AddTaskService) { }

  ngOnInit() {
    this.getalltasks();
    const socket = io.connect('https://mysterious-cove-64998.herokuapp.com');
    socket.on('payload', () => {
      this.getalltasks();
    });
  }
  addtask(value) {
    if (value && value.replace(/\s/g, '').length > 0) {
      this.loading = true;
      const response = this.addTaskService.posttasks(value).subscribe(res => {
      });
    }
    this.task = '';
  }
  getalltasks() {
    this.tasks = [];

    this.addTaskService.getalltasks().subscribe(res => {
      res.forEach(element => {
        this.tasks.push(element);

      });
      this.loading = false;
    }, err => console.log(err));
  }
  deleteById(id) {
    this.loading = true;
    this.addTaskService.deleteById(id).subscribe(res => {
    });
  }
}
