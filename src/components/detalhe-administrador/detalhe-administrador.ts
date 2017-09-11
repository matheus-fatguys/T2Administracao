import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database';
import { MensagemProvider } from './../../providers/mensagem/mensagem';
import { Observable } from 'rxjs';
import { FatguysUberProvider } from './../../providers/fatguys-uber/fatguys-uber';
import { Chave } from './../../models/chave';
import { Administrador } from './../../models/administrador';
import { Component, Input, OnInit, SimpleChanges, AfterViewInit, EventEmitter, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'detalhe-administrador',
  templateUrl: 'detalhe-administrador.html'
})
export class DetalheAdministradorComponent  implements OnDestroy{  

  @Input() administrador= {} as Administrador;
  @Input() chave= {} as Chave;
  @Output()
  onChangeAdministradorValido = new EventEmitter<any>();  
  public form:FormGroup;
  private subscription;
  

  constructor(public formBuilder: FormBuilder,
              public fatguys: FatguysUberProvider,
            public msg: MensagemProvider) {   

    this.form = formBuilder.group({
        nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        telefone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern('^[(][0-9]{2}[)][\\\s]?[0-9]{4,5}[-][0-9]{4}$')])],
        chave: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern('^[0-9]{4}$')])]
    });
    this.subscription = this.form.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(
        s=>{
          this.validar()
        }
      );
  }

    isValido(){
    return this.form.valid;
  }

  obterAdministrador(){

    if(this.administrador!=null&&this.administrador.id!=null){
      return;
    }    

    if(this.chave.chave==null){
      return;
    }    
    if(this.chave.chave.length<4){
      return;
    }
    let ref = this.fatguys.obterAdministradorPelaChave(this.chave.chave);
    let sub = ref.subscribe(
      c=>{
        sub.unsubscribe();
        if(c[0]==null){
          this.msg.mostrarMsg("Essa chave não está associada a usuário algum");
        }
        else{
          let subAdministrador = this.fatguys.obterAdministrador(c[0].administrador).subscribe(
            cond=>{
              subAdministrador.unsubscribe();
              this.fatguys.administrador=cond[0];
              this.administrador=this.fatguys.administrador
            }
          );
        }
      }
    );
  }

  validar(){
    this.obterAdministrador();
    this.onChangeAdministradorValido.next(this.form.valid);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
