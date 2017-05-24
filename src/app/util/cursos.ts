export const CURSOS_TYPE = {
 PUBLICADOS: 'publicados',
 SUSCRITOS: 'suscritos',
 DISPONIBLES: 'disponibles'
};

export const SUSCRIPTION_TYPE = {
 SUBJECT: 'subject',
 BEHAVIOR: 'behaviour',
 REPLAY: 'replay'
};

class Temario {
    constructor (public titulo: string, public url: string, public thumbnail: string ) {}
}

export class Curso {
  constructor (public id: string, public nombre: string, public icon: string, public descripcion: string, public temario: Array<Temario> ) {}
}

