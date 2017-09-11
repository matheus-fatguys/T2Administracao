import { DetalheVeiculoComponent } from './../../components/detalhe-veiculo/detalhe-veiculo';
import { DetalheAdministradorComponent } from './../../components/detalhe-administrador/detalhe-administrador';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Veiculo } from './../../models/veiculo';
import { MensagemProvider } from './../../providers/mensagem/mensagem';
import { Usuario } from './../../models/usuario';
import { Administrador } from './../../models/administrador';
import { FatguysUberProvider } from './../../providers/fatguys-uber/fatguys-uber';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {

  private usuario= {} as Usuario;
  private loginForm:FormGroup;
  private administrador= {} as Administrador;
  private loading:Loading ;  
  private administradorValido:boolean;
  @ViewChild(DetalheAdministradorComponent)
  detalheAdministrador : DetalheAdministradorComponent;
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private fatguysService: FatguysUberProvider,
    private msg : MensagemProvider,
    public loadingCtrl: LoadingController) {
      this.loginForm = formBuilder.group({
        email: ['', Validators.required],
        senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });      
  }

  onChangeAdministradorValido(){
    this.administradorValido=this.detalheAdministrador.isValido();
    this.administrador=this.detalheAdministrador.administrador;
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarPage');
  }

  voltar(){
    this.navCtrl.setRoot('LoginPage');
  }

  async registrar(){
    try {
      
        this.loading = this.loadingCtrl.create({
              content: 'Registrando...'
            });
      this.loading.present().then(
        _=>{          
          let resultado = this.fatguysService.registrarAdministrador(this.administrador, this.usuario).then(
            ref => {
              this.loading.dismiss();              
              let toast = this.msg.mostrarMsg('Bem vindo, '+this.administrador.nome+'!', 3000);
              toast.onDidDismiss(() => {
                this.navCtrl.setRoot('HomePage');
              });
            }
          ).catch(error=>{
              this.loading.dismiss();
              this.msg.mostrarErro('Erro registrando: ' + error);
          });
        }
      );
    } catch (error) {
      this.msg.mostrarErro(error);
    }
  }
  

}
