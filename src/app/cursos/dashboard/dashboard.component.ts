import { Observable } from 'rxjs/Observable';
import {Subscription } from 'rxjs/Subscription';
import { CursosSourceService } from './../cursos-source.service';
import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import {Message} from 'primeng/primeng';
import { CURSOS_TYPE, SUSCRIPTION_TYPE, Curso } from './../../util/cursos';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy  {

  public catalogoCursos: Array<Curso>;
  private catalogoCursos$: Observable<Curso>;
  public cursosPublicados: Array<Curso> = [];
  public cursosSuscritos: Array<Curso> = [];
  public draggedCurso: Curso;
  public containerDragDrop = 'containerCursos';
  public indexDraggedCurso: number;
  public msgs: Array<Message> = [];
  public lblSubjNoSubs= true;
  public lblBehvNoSubs = true;
  public lblReplayNoSubs = true;
  private suscripcion = new Subscription ();
  public existeSuscripcion = false;
  public CURSOS_TYPE;
  public SUSCRIP_TYPE;


 constructor(public _cursosSource: CursosSourceService,  private elementRef: ElementRef) {
  }

ngOnInit() {
  this.CURSOS_TYPE = CURSOS_TYPE;
  this.SUSCRIP_TYPE = SUSCRIPTION_TYPE;
  // se suscribe al CC de los cursos
  this._cursosSource.catalogoCursos$.subscribe(v => this.catalogoCursos = v );
  // se suscribe a los cursos publicados
  this._cursosSource.cursosPublicadosSubject$
  .subscribe(c => this.cursosPublicados = this._addItem(this.cursosPublicados, c) );
 }

/**
 * Método para suscribir o desuscribirse a un subject
 * @param {string} type
 * @param {any} event
 * @memberOf DashboardComponent
 */
public suscribir(type: string, event) {
  // event.checked=false cuando usuario clica para suscribirse, si no se entiende que quiere desuscribirse
  const suscribir = !event.checked;
  // siempre cancelamos suscripción y vaciamos array de suscritos
  this.suscripcion.unsubscribe();
  this.cursosSuscritos = [];
  this.existeSuscripcion = suscribir;
  if (suscribir) {
      switch (type) {
        case this.SUSCRIP_TYPE.SUBJECT :
          this._suscribirseSubject();
          break;
        case  this.SUSCRIP_TYPE.BEHAVIOR:
          this._suscribirseBehaviorSubject();
          break;
        case  this.SUSCRIP_TYPE.REPLAY:
          this._suscribirseReplaySubject();
          break;
      }
   }
}

/**
 * Se suscribe a un subject, a partir de ese momento empezará a recibir los cursos emitidos
 * @private
 * @memberOf DashboardComponent
 */
private _suscribirseSubject () {
  // controladores para labels de suscripción. Se utiliza desestructuración
  [this.lblSubjNoSubs, this.lblBehvNoSubs, this.lblReplayNoSubs] = [false, true, true];
  this.suscripcion = this._cursosSource.cursosSuscritosSubject$
     .subscribe(c => this.cursosSuscritos = this._addItem(this.cursosSuscritos, c));
}

/**
 * Se suscribe a un behavior, recibirá el último curso emitido y posteriores los cursos emitidos
 * @private
 * @memberOf DashboardComponent
 */
private _suscribirseBehaviorSubject () {
  // controladores para labels de suscripción. Se utiliza desestructuración
  [this.lblSubjNoSubs, this.lblBehvNoSubs, this.lblReplayNoSubs] = [true, false, true];
  // caso particular el de behavior-> siempre viene un valor, al menos el inicial, si viene el inicial, no lo añadimos
  this.suscripcion = this._cursosSource.cursosSuscritosBehaviorSubject$
      .subscribe(c => {if (c) {this.cursosSuscritos = this._addItem(this.cursosSuscritos, c); }});
}

/**
 * Se suscribe a un Replay, recibirá todos los cursos emitidos y posteriores los cursos emitidos
 * @private
 * @memberOf DashboardComponent
 */
private _suscribirseReplaySubject () {
  // controladores para labels de suscripción. Se utiliza desestructuración
  [this.lblSubjNoSubs, this.lblBehvNoSubs, this.lblReplayNoSubs] = [true, true, false];
  this.suscripcion = this._cursosSource.cursosSuscritosReplaySubject$
    .subscribe(c => this.cursosSuscritos = this._addItem(this.cursosSuscritos, c));
}

/****** Eventos para el Drag&Drop ********/

/**
 * handler para el comienzo del drag
 * @param {any} event
 * @param {any} curso
 * @param {any} index
 * @memberOf DashboardComponent
 */
public dragStart(event, curso: Curso, index) {
  this.draggedCurso = curso;
  this.indexDraggedCurso = index;
}

/**
 * Handler para el final de drag
 * @param {any} event
 * @memberOf DashboardComponent
 */
public dragEnd(event) {
  this.draggedCurso = null;
  }

/**
 * Handler para el drop cuando se suelta el cursor sobre el contenedor destino
 * @param {any} event
 * @memberOf DashboardComponent
 */
public drop(event) {
  if (this.draggedCurso) {
   this._cursosSource.publicarCurso(this.draggedCurso);
   this.catalogoCursos = this.catalogoCursos.filter((valor, i ) => {return i !== this.indexDraggedCurso; });
   this.msgs = [{severity: 'success', summary: 'Publicado', detail: this.draggedCurso.nombre}];
   this.draggedCurso = null;
  }
}

/**
 * Devuelve un nuevo array con el item recibido, inmutable
 * @private
 * @param {Array<Curso>} array
 * @param {any} item
 * @returns
 * @memberOf DashboardComponent
 */
private _addItem (array: Array<Curso>, item) {
  return [...array, item];
}

/**
 * Cancela las suscripciones al destruirse el componente
 * @memberOf DashboardComponent
 */
ngOnDestroy () {
  this.suscripcion.unsubscribe();
 }
}
