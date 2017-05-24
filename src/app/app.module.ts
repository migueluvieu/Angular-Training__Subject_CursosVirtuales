import { EjemploConsolaModule } from './ejemplo-consola/ejemplo-consola.module';
import {RouterModule, Routes} from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { CursosModule } from './cursos/cursos.module';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
 { path: 'ejemplo',  loadChildren: 'app/ejemplo-consola/ejemplo-consola.module#EjemploConsolaModule'},
 { path: '', loadChildren: 'app/cursos/cursos.module#CursosModule' }
];


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    CursosModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    EjemploConsolaModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
