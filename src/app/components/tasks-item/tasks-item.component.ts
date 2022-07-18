import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { TASKS } from 'src/app/mock-tasks';
import { Task } from '../../Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export enum TaskStates {
  Expired = 'Expired',
  Urgent= 'Urgent',
  Semi_urgent= 'Semi_urgent',
  Standar= 'Standar',
}

@Component({
  selector: 'app-tasks-item',
  templateUrl: './tasks-item.component.html',
  styleUrls: ['./tasks-item.component.css']
})
export class TasksItemComponent implements OnInit {
  @Input() task:Task = TASKS[0];
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();


  taskStates = TaskStates;

  constructor() { }
  faTimes = faTimes;  
  ngOnInit(): void {
  }

  onDelete(task: Task){
    this.onDeleteTask.emit(task)
  }
  
  onToggle(task: Task){
    this.onToggleReminder.emit(task)
  }

  
  TaskUrgency(task: Task){
    let time_dif =  Date.parse(task.day) - Date.now();
    const convertion = (1000*60*60*24)
    time_dif = (Math.round(time_dif))/convertion;

    if(time_dif > 7){
      return TaskStates.Standar
    }

    if(time_dif >= 1){
      return TaskStates.Semi_urgent
    }

    if(time_dif <= 0){
      return TaskStates.Expired
    }

    if(time_dif < 1){
      return TaskStates.Urgent
    }

    return
  }

}
