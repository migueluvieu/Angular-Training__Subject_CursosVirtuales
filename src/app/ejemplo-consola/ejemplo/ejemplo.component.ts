import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Component({
  selector: 'app-ejemplo',
  templateUrl: './ejemplo.component.html',
  styleUrls: ['./ejemplo.component.scss']
})
export class EjemploComponent implements OnInit {

  // Subject
  private _subject = new Subject <string>();
  public subject$ = this._subject.asObservable();

  // Behavior Subject (es necesario dar un valor inicial)
  private _behaviorSubject = new BehaviorSubject ('init valor');
  public behaviorSubject$ = this._behaviorSubject.asObservable();

  // Replay subject
  private _replaySubject = new ReplaySubject();
  public replaySubject$ = this._replaySubject.asObservable();

  // Observador, se suscribe, pinta valores emitidos y al terminar se desuscribe
  public observer;

  // subject para pintar en pantalla simulando console. Como el observable se pintará con async Pipe es importante
  // que sea un BehaviorSubject, ya que el pipe suscribe automáticamente y en el momento que lo hace con subject no valdría, 
  // no pinta nada en consola
  private _consola = new BehaviorSubject<any> (['']);
  public console$ = this._consola.asObservable();
  private _messages = [];



ngOnInit() {
  this._render ('/************* FROM APP.COMPONENT ****************/' );
  this._ejSubject();
  this._ejBehaviorSubject();
  this._ejReplaySubject();
  this._ejArrays ();
  this._render ('/************* FIN APP.COMPONENT ****************/' );
}

/**
 * El suscriptor solo recibirá los valores emitidos tras la suscripción, no los previos ni los actuales
 * @private
 * @memberOf AppComponent
 */
private _ejSubject() {
    this._render ('*** SUBJECT ***' );
    // emite valores pero aún no hay observers observadores
    this._subject.next('1');
    this._subject.next('2');
    this._subject.next('3');
    this._render('Emitidos x subject antes de la suscripción => ', 1 , 2 , 3);
    this._render(' |_ Suscripción => 3 NO LE LLEGA, es el último emitido antes de la suscripción... ');
    // si no utilizásemos onError, onComplete directamente podrmos poner this.subject$.subscribe(console.log)
    this.observer = this.subject$.subscribe(
        value => {this._render('_|_ onNext ', value); },
        err => {this._render('_|_ onError ', err); },
        () => {this._render('_|_ onCompleted!!!!'); }
    );
    this._render('Emitidos x subject tras suscripción => ', 4 , 5);
    this._subject.next('4');
    this._subject.next('5');
    this._subject.error('Error forzado!');
    // se pintará por consola 2 u 3
    this._subject.complete();
    this.observer.unsubscribe();
    this._render ('**************************************************' );
}

/**
 * El suscriptor recibirá los valores emitidos tras la suscripción y el actual, no los previos
 * @private
 * @memberOf AppComponent
 */
private _ejBehaviorSubject() {
  this._render ('*** BEHAVIOR-SUBJECT ***' );
  // emite valores pero aún no hay observers observadores
  this._behaviorSubject.next('1');
  this._behaviorSubject.next('2');
  this._behaviorSubject.next('3');
  this._render('Emitidos x behaviorSubject antes de la suscripción => ', 1 , 2 , 3);
  this._render(' |_ Suscripción => 3 es el último emitido antes de la suscripción, LE LLEGA!!!!... ');
  // si no utilizásemos onError, onComplete directamente podrmos poner this.subject$.subscribe(console.log)
  this.observer = this.behaviorSubject$.subscribe(
        value => {this._render('_|_ onNext ', value); },
        err => {this._render('_|_ onError ', err); },
        () => {this._render('_|_ onCompleted!!!!'); }
  );
  this._render('Emitidos x behaviorSubject tras suscripción => ', 4 , 5);
  this._behaviorSubject.next('4');
  // además podemos obtener su valor en el momento que queramos
  this._render (' |_ Valor de behavior ahora => this._behaviorSubject.getValue()=>', this._behaviorSubject.getValue() );
  this._behaviorSubject.next('5');
  // se pintará por consola 2 u 3
  // al lanzar el complete, en el handler lo estamos desuscribiendo
  this._behaviorSubject.complete();
  this.observer.unsubscribe();
  this._render ('**************************************************' );
}

/**
 * El suscriptor recibirá los valores emitidos todos, los previos, actual y los posteriores
 * @private
 * @memberOf AppComponent
 */
private _ejReplaySubject() {
  this._render ('*** REPLAY-SUBJECT ***' );
  // emite valores pero aún no hay observers observadores
  this._replaySubject.next('1');
  this._replaySubject.next('2');
  this._replaySubject.next('3');
  this._render('Emitidos x replaySubject antes de la suscripción=> ', 1 , 2 , 3);
  this._render(' |_ Suscripción => Le llegan todos los valores... ');
  // si no utilizásemos onError, onComplete directamente podrmos poner this.subject$.subscribe(console.log)
  this.observer = this.replaySubject$.subscribe(
      value => {this._render('_|_ onNext ', value); },
        err => {this._render('_|_ onError ', err); },
        () => {this._render('_|_ onCompleted!!!!'); }
  );
  this._render('Emitidos x replaySubject tras suscripción => ', 4 , 5);
  this._replaySubject.next('4');
  this._replaySubject.next('5');
  // se pintará por consola 2 u 3
  // al lanzar el complete, en el handler lo estamos desuscribiendo
  this._replaySubject.complete();
  // una buena práctica es desuscribir en el destroy del componente
  this.observer.unsubscribe();
  this._render ('**************************************************' );
}

private _ejArrays () {
   this._render ('***  ARRAY  ***' );
   const array = [1, 2, 3];
   const subject = new Subject();
   const subject$ = subject.asObservable();
   subject.next(array);
   // no hay suscripción, no lo pinta
   const observer = subject$.subscribe(
     value => {this._render('_|_ onNext ', value); },
      err => {this._render('_|_ onError ', err); },
      () => {this._render('_|_ onCompleted!!!!'); }
   );
   array.push(4);
   subject.next(array); // [1, 2, 3, 4]}
   observer.unsubscribe();
   this._render ('**************************************************' );
}

/**
 * Función que devuelve los mensajes pasados como argumento al componente en un observable
 * y además pinta por consola
 * @param {any} message
 *
 * @memberOf AppComponent
 */
public _render (...messages ) {
  // se separan x espacios en blanco
  console.log ([...messages].join(' '));
  this._messages.push([...messages].join(' '));
  this._consola.next( this._messages);
}

}
