import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AlumnosMockService } from 'src/app/shared/services/alumnos-mock.service';
import { AbmAlumnosComponent } from './componentes/abm-alumnos/abm-alumnos.component';
import { MatDialog } from '@angular/material/dialog';
import { ALUMNOS_MOCK } from 'src/app/shared/constantes/constantes';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss'],
})
export class AlumnosComponent implements OnInit {
  //alumnos: Observable<any[]>;
  alumnos: any;
  hoy = new Date();

  constructor(
    private _alumnosService: AlumnosMockService,
    private matDialog: MatDialog
  ) {
    console.log('Paso por el constructor de alumnos.component');
    this._alumnosService.cargarNuevosUsuarios();
    this.alumnos = this._alumnosService.obtener();
  }

  ngOnInit(): void {
    this.alumnos = this._alumnosService.obtener();
  }

  crearAlumno(): void {
    this.matDialog
      .open(AbmAlumnosComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this._alumnosService.agregarAlumno({
              nombre: v.nombre,
              email: v.email,
              password: v.password,
              alias: v.alias,
            });
          }
        },
      });
  }

  onEliminarAlumno(alumnoToDelete: any): void {
    if (confirm(`¿Está seguro de eliminar a ${alumnoToDelete.name}?`)) {
      /*       this.alumnos = this.alumnos.filter(
        (u: any) => u.id !== alumnoToDelete.id
      ); */
    }
  }

  onEditarAlumno(alumnoToEdit: any): void {
    this.matDialog
      .open(AbmAlumnosComponent, {
        data: alumnoToEdit,
      })
      .afterClosed()
      .subscribe({
        next: (userUpdated) => {
          console.log(userUpdated);
          if (userUpdated) {
            /*             this.alumnos = this.alumnos.map((user: any) => {
              return user.id === alumnoToEdit.id
                ? { ...user, ...userUpdated }
                : user;
            }); */
          }
        },
      });
  }
}
