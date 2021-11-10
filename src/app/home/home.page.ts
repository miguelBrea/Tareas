import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { Task } from '../model/task';
import { AlertController } from '@ionic/angular';
import { present } from '@ionic/core/dist/types/utils/overlays';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //Inyectamos los servicios en la home
  constructor(public tasksService: TasksService,
              private router: Router,
              private alertController: AlertController) {}

  //Este metodo se usa para navegar al lugar de la tarea seleccionada por su id
  goEditTask(id?: number){
    this.router.navigateByUrl(`/edit/${id != null ? id : ''}`);
  }

  //este metodo es necesario para obtener una ventana de confirmacion de borrado de una tarea
  async presentAlertConfirm( t: Task){
    console.log('alerta');
    const alert = await this.alertController.create({
      header: 'Borrar tarea',
      message: `¿Estas seguro que quieres borrar la tarea <strong>${t.title}</strong>?`,
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancelar',
        },{
          text: 'Aceptar',
          handler: () => {
            this.tasksService.deleteTask(t.id);
          }
        }
      ]
    });

    await alert.present();
  }

}
