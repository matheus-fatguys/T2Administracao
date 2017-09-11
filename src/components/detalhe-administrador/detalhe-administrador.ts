import { Component } from '@angular/core';

/**
 * Generated class for the DetalheAdministradorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'detalhe-administrador',
  templateUrl: 'detalhe-administrador.html'
})
export class DetalheAdministradorComponent {

  text: string;

  constructor() {
    console.log('Hello DetalheAdministradorComponent Component');
    this.text = 'Hello World';
  }

}
