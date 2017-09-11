import { FatguysUberProvider } from './../../providers/fatguys-uber/fatguys-uber';
import { Subscription } from 'rxjs';
import { Administrador } from './../../models/administrador';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MestrePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mestre',
  templateUrl: 'mestre.html',
})
export class MestrePage {

  // public senhaMestre:FormControl;
  private autenticado:boolean=false;
  private mestreForm:FormGroup;
  private administrador:Administrador={} as Administrador;
  private subscription:Subscription;

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public formBuilder: FormBuilder
    , public fatguys: FatguysUberProvider
  ) {

    this.mestreForm = formBuilder.group({        
        senhaMestre: ['', Validators.compose([Validators.required, Validators.minLength(10)])]
    });
      // this.senhaMestre=new FormControl();
    
    this.subscription = this.mestreForm.controls.senhaMestre.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      // .filter(_=>this.mestreForm.controls.senhaMestre.valid)
      .subscribe(
        s=>{
          this.validarSenhaMestre()
        }
      );
  }

  validarSenhaMestre(){
    if(this.mestreForm.controls.senhaMestre.valid){
      this.fatguys.autenticarSenhaMestre(this.mestreForm.controls.senhaMestre.value)
      .subscribe(s=>{
        if(s!=null&&s.$value==this.mestreForm.controls.senhaMestre.value){
          this.autenticado=true;
        }
      });
    }
    else{
      this.autenticado=false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MestrePage');
  }

}
