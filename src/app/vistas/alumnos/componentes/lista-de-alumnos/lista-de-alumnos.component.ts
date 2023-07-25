import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AlumnosMockService } from 'src/app/shared/services/alumnos-mock.service';

@Component({
  selector: 'app-lista-de-alumnos',
  templateUrl: './lista-de-alumnos.component.html',
  styleUrls: ['./lista-de-alumnos.component.scss'],
})
export class ListaDeAlumnosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'actions'];

  @Input()
  dataSource: any[] = [];

  //localDataSource: any[] = [];

  @Output()
  eliminarAlumno = new EventEmitter<any>();

  @Output()
  editarAlumno = new EventEmitter<any>();

  constructor(private _alumnoService: AlumnosMockService) {}
  ngOnInit(): void {}
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log('ngOnChanges', this.dataSource);
  }
}
