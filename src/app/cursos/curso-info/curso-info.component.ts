import { CURSOS_TYPE, Curso } from './../../util/cursos';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-curso-info',
  templateUrl: './curso-info.component.html',
  styleUrls: ['./curso-info.component.scss']
})
export class CursoInfoComponent implements OnInit, OnChanges {

 @Input() curso: Curso;
 @Input() type: string;

private _playing;
private _display;
public CURSOS_TYPE;
public indexSelected;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.CURSOS_TYPE = CURSOS_TYPE;
   }

  ngOnChanges() {
   this.playing = false;
  }

  play(url, i) {
    this.playing = this._sanitizerURL(url);
    this.indexSelected = i;
    console.log(this.indexSelected);
  }

 /**
  * 'Sanea' la url, es imprescindible hacerlo para el src dinámico del frameset de youtube
  * @private
  * @param {string} url
  * @returns {SafeResourceUrl}
  * @memberOf CursoInfoComponent
  */
  private _sanitizerURL( url: string ): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  close () {
    this.playing = null;
  }

/**
 * Obtiene la clase correspondiente en función del tipo de listado
 * @returns
 * @memberOf CursoInfoComponent
 */
  public getClass (): string {
    let clase = '';
    switch (this.type) {
      case CURSOS_TYPE.DISPONIBLES:
          clase = 'curso-card-disponibles';
          break;
      case CURSOS_TYPE.PUBLICADOS:
          clase = 'curso-card-publicados';
          break;
      case CURSOS_TYPE.SUSCRITOS:
          clase = 'curso-card-suscritos';
          break;
     }
     return clase;
  }

 show () {
   this._display = true;
 }

  public get display (): string{
   return this._display ;
 }

  public set display (value: string){
   this._display = value ;
 }


  public get playing(){
   return this._playing;
 }

 public set playing (value){
   this._playing = value;
 }

}
