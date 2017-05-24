import { HttpModule } from '@angular/http';
import { CursosSourceService } from './cursos-source.service';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ButtonModule, DataTableModule,
        SharedModule, DragDropModule, GrowlModule,
        AccordionModule, PanelModule, SplitButtonModule, FieldsetModule,
        ToggleButtonModule, OverlayPanelModule, MenuItem, MenubarModule,
         DialogModule, LightboxModule
      } from 'primeng/primeng';
import { CursoInfoComponent } from './curso-info/curso-info.component';

const routes: Routes = [
 { path: '', component: DashboardComponent }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpModule,
    ButtonModule,
    FormsModule,
    DragDropModule,
    SharedModule,
    DataTableModule,
    GrowlModule,
    AccordionModule,
    PanelModule,
    SplitButtonModule,
    FieldsetModule,
    ToggleButtonModule,
    OverlayPanelModule,
    LightboxModule,
    DialogModule,
    MenubarModule
  ],
  declarations: [DashboardComponent, CursoInfoComponent],
  exports: [],
  providers: [CursosSourceService],
})
export class CursosModule { }
