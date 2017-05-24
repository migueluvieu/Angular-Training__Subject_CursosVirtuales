import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EjemploComponent } from './ejemplo/ejemplo.component';

const rutas: Routes = [
  {path: '' , component: EjemploComponent }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rutas)
  ],
  declarations: [EjemploComponent]
})
export class EjemploConsolaModule { }
