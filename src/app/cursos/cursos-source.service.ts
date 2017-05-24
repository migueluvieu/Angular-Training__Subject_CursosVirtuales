import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Curso } from './../util/cursos';

@Injectable()
export class CursosSourceService {

 // se crea tipo subject para observar los publicados
private _cursosPublicadosSubject = new Subject<Curso>();
// se crea subject para emitir curso. Emitirá los cursos una vez alguien se suscriba
private _cursosSuscritosSubject = new Subject<Curso>();
// se crea BehaviorSubject para emitir curso. Emitirá el curso actual y los siguiente
private _cursosSuscritosBehaviorSubject = new BehaviorSubject<Curso>(null);
// se crea ReplayrSubject para emitir curso. Emitirá todos los previos y los siguientes
private _cursosSuscritosReplaySubject = new ReplaySubject<Curso>();


 constructor(private _http: Http) { }

/**
 * Observable con el CC de cursos que lee de un json
 * @readonly
 * @type {Observable<Curso[]>}
 * @memberOf CursosSourceService
 */
get catalogoCursos$ (): Observable<Curso[]>{
    return this._http.get('./assets/cursos.json').map(res => res.json());
  }

/**
 * Crea un observable para devolver a los suscriptores el curso publicado
 * @readonly
 * @type {Observable<Curso>}
 * @memberOf CursosSourceService
 */
get cursosPublicadosSubject$(): Observable<Curso>{
  return  this._cursosPublicadosSubject.asObservable();
}

/**
 * Crea un observable para devolver a los suscriptores el curso suscrito (con Subject)
 * @readonly
 * @type {Observable<Curso>}
 * @memberOf CursosSourceService
 */
get cursosSuscritosSubject$(): Observable<Curso>{
  return  this._cursosSuscritosSubject.asObservable();
}

/**
 * Crea un observable para devolver a los suscriptores el curso suscrito (con BehaviorSubject)
 * @readonly
 * @type {Observable<Curso>}
 * @memberOf CursosSourceService
 */
 get cursosSuscritosBehaviorSubject$(): Observable<Curso>{
  return  this._cursosSuscritosBehaviorSubject.asObservable();
}

/**
 * Crea un observable para devolver a los suscriptores el curso suscrito (con ReplaySubject)
 * @readonly
 * @type {Observable<Curso>}
 * @memberOf CursosSourceService
 */
 get cursosSuscritosReplaySubject$(): Observable<Curso>{
  return  this._cursosSuscritosReplaySubject.asObservable();
}

 /**
  * Método para publicar curso. e envía el curso a todos los suscriptores de los distintos subjects
  * Por ejemplo su hay suscriptores del Behavior, lo recibirán, si los hay de Replay, tb,..
  * @param {Curso} curso
  * @memberOf CursosSourceService
  */
 publicarCurso (curso: Curso) {
    // se emite el nuevo array a todos los suscriptores
    this._cursosPublicadosSubject.next(curso);
    // se emite el nuevo array de los cursos suscritos con subject a sus observers
    this._cursosSuscritosSubject.next(curso);
    // se emite el nuevo array de los cursos suscritos con behaviorsubject a sus observers
    this._cursosSuscritosBehaviorSubject.next(curso);
    // se emite el nuevo array de los cursos suscritos con Replaysubject a sus observers
    this._cursosSuscritosReplaySubject.next(curso);
  }
}
