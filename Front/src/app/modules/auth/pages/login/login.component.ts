import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ValidFormService } from 'src/app/core/services/valid-form.service';
import { SecureStorageService } from 'src/app/core/services/secure-storage.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  valCheck: string[] = ['remember'];
  password!: string;
  formLogin: FormGroup;
  constructor(private authService: AuthService,
              private secureStorageService:SecureStorageService,
              private formValidService: ValidFormService,
              private routerParam: Router,
              private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.builForm();
  }

  menu:any = [
    {
      "id": 1,
      "text": "DASHBOARD",
      "action": "/adm/dashboard",
      "icon": "bx bxs-dashboard",
      "menuFatherId": null,
      "order": 1
    }
  ]
  
  onSubmit(): void {
    const request = {
      username: this.formLogin.get('user')?.value,
      password: this.secureStorageService.encriptBase64(this.formLogin.get('pass')?.value)
    }
    this.getAutentication(request);
    
  }

  getAutentication(request: any){
  
    
    this.authService.login(request)
      .subscribe(
        {
          next: (data) => {
            console.log("informacion", data)
            let dataTmp = <any>data;
            if(dataTmp) {
              if(dataTmp.code == "200"){
                console.log("informacion", dataTmp.data)
                this.secureStorageService.saveData("session", JSON.stringify(dataTmp.data))
                this.secureStorageService.saveData("menus",JSON.stringify(this.menu))
                localStorage.setItem('isLoggedIn', 'true');
                this.routerParam.navigate(["/"])
              }else{
                console.log("Error", dataTmp.message)
                this.messageService.add({severity:"error", key: 'basic-message', summary:'Error de inicio de sesión', detail: dataTmp.message});
              }

            }
          },
          error: (error) => {

          },
          complete: () => {

          }
        }
      );
  }


  builForm(){
    this.formLogin = new FormGroup(
      {
        user: new FormControl('', [Validators.required]),
        pass: new FormControl('', [Validators.required])
      }
    );
  }

  isFieldRequired(fieldName: string) {
    return this.formValidService.validInputRequerire(this.formLogin, fieldName);
  }
}
