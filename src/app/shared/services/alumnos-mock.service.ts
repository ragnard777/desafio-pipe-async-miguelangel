import { Injectable } from '@angular/core';
import { ALUMNOS_MOCK } from '../constantes/constantes';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlumnosMockService {
  alumnos: any[] = [];
  _alumnos$ = new BehaviorSubject<any>([]);
  alumnos$ = this._alumnos$.asObservable();

  constructor() {
    this.alumnos = ALUMNOS_MOCK;
    this._alumnos$.next(this.alumnos);
  }

  obtener(): Observable<any> {
    return this.alumnos$;
  }

  /*   obtener() {
    return this.alumnos;
  } */

  agregar(alumno: any): void {
    alumno.id = this.alumnos.length + 1;
    console.log('Alumno ', alumno);

    this.alumnos.push(alumno);
    console.log('agregar', this.alumnos);

    //this._alumnos$.next(alumno);
  }

  agregarAlumno(alumno: any): void {
    // TAKE 1 = solo quiero recibir una emision
    // SUPER IMPORTANTE PORQUE DE LO CONTRARIO,
    // CREARIAN UN BUCLE INFINITO
    this._alumnos$.pipe(take(1)).subscribe({
      next: (alumnos) => {
        this._alumnos$.next([
          ...alumnos,
          { ...alumno, id: alumnos.length + 1 },
        ]);
      },
    });
  }

  cargarNuevosUsuarios() {
    console.log(' funcion cargarNuevosUsuarios');
    console.log(' variable this.alumnos', this.alumnos);
    this._alumnos$.next(this.alumnos);
  }
}
