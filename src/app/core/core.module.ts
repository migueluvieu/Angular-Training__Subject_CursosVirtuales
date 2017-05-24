import {RouterModule, Routes} from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';



const routes: Routes = [
  { path: '', loadChildren: './../cursos/cursos.module#CursosModule' }
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [LayoutComponent],
  exports: [LayoutComponent]
})
export class CoreModule { }
