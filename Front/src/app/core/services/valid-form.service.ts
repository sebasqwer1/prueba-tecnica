import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageForm } from '../constants/message';

@Injectable({
  providedIn: 'root'
})
export class ValidFormService {

    validInputRequerire(form: FormGroup, controlName: string) {
        const control = form.get(controlName);
        if ((control.touched || control.dirty) && control.errors != null) {
            if (control.errors['required'] != null) {
                return MessageForm.INPUT_REQUIERED;
            }    
          }
          return '';
      }

}