import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../model/task';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  //creamos un json sinID
  task: Task = {title: '', description: ''};

  constructor(public tasksService: TasksService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const taskID = parseInt( this.activatedRoute.snapshot.paramMap.get('id') , 10);
    const currentTask = this.tasksService.getTask(taskID);

    //si se edita la tarea si la id no es Nan
    //Rellenar los inputs con la informacion de la tarea
    if(!isNaN(taskID)) {this.task ={...currentTask};}
  }

  //vamos a guardar una tarea para ello hacemos uso del servicio que hemos inyectado
  saveTask(){
    this.tasksService.saveTask(this.task);
    //una vez agregado la tarea volvemos al menu inicial
    this.router.navigateByUrl(`/home`);
  }

}
