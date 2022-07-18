import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from '../../service/ui.service';
import { Task } from '../../Task';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  form: FormGroup;

  showAddTask: boolean = false;
  subscription?: Subscription;
  
  constructor(
    private uiService : UiService,
    private formBuilder: FormBuilder
    ) { 
      this.subscription = this.uiService.onToggle()
      .subscribe(
        value => this.showAddTask = value
      )

      this.form = this.formBuilder.group({
        text:['',[Validators.required]],
        day:['', [Validators.required]],
        reminder:[false],
     })
    }

  ngOnInit(): void {
  } 


  get InputText(){
    return this.form.get("text");
   }

  get InputDate(){
    return this.form.get("date");
  }

  get InputReminder(){
    return this.form.get("reminder");
  }


  onSubmit(event : Event){
    event.preventDefault;

    if(this.form.valid){

      const newTask: Task = {
        text: this.InputText,
        date: this.InputDate,
        reminder: this.InputReminder

      };

      this.onAddTask.emit(newTask);

    }

    // if(this.text.length === 0){
    //   alert("Please Add Text");
    //   return
    // }

  }

  // Parse Natural Language String To a Date 
}
