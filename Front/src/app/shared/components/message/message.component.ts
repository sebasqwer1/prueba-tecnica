import { Component } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  constructor() {}

  copyToClipboard(message: string) {
    const textToCopy = message;
    navigator.clipboard.writeText(textToCopy).then(() => {
      console.log('Texto copiado al portapapeles');
    }).catch((error) => {
      console.error('Error al copiar al portapapeles: ', error);
    });
  }
}
