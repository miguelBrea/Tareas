import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  tasks: Task[] = [];
  taskCounter?: number = 2;

  constructor() {
    this.tasks = [
    {
      id: 0,
      title: 'Ordenar',
      description: 'Ordenar la habitacion'
    },
    {
      id: 1,
      title: 'Leer',
      description: 'Leer el libro de ionic'
    }
   ];
  }

  //metodo que devuelve el vector de tareas disponibles
  getTasks(): Task[] {
    return this.tasks;
  }

  //la respuesta para que sea asyncrona, necesitamos un Obsevable
  getTasksObservable(): Observable<Task[]>{
    return of(this.tasks);
  }

  //para guardar una tarea en la lista de tareas
  saveTask(task: Task){
    //si la id es nula, entonces se a va añadir una tarea a la lista
    if(task.id == null){
      //aumentamos el id en uno tras asignarle el id a la nueva tarea
      const id = this.taskCounter++;
      //añadimos la nueva tarea al array de tareas, los ... es importante ya que asi
      //evitamos el error de pasar una referencia en vez de los datos.
      this.tasks.push({id, ...task});
    }else{
      //Si no, se va a editar una tarea ya existente
      const currentTask = this.getTask(task.id);
      Object.assign(currentTask, task);
    }
  }

  //obtiene una tarea filtrando el array de tarea por el id
  getTask(id: number): Task{
    return this.tasks.filter(task => task.id === id)[0];
  }

  //eliminar una tarea segun el id, para ello hago uso de un filtro, donde se pasaran
  //al array solo las tareas que no correspondan al id pasado como parametro
  deleteTask(id: number){
    this.tasks = this.tasks.filter( task => task.id !== id );
  }
}
