import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SecureStorageService {

  key: string = environment.encryptionSecret;

  constructor(){}

  public saveData(key: string, value: string) {
    localStorage.setItem(key, this.encrypt(value));
  }

  public getData(key: string) {
    let data: string = localStorage.getItem(key) ?? "";
    const result = this.decrypt(data)

    return result;
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }

   public encriptBase64(txt: string): string{
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(txt));
  }

}
