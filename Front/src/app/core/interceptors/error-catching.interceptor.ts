import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, timeout} from "rxjs/operators";
import { CommunicationConstants } from '../constants/communication';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService){}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const TIMEOUT = 5000;
    return next.handle(request)
           .pipe(
                timeout(TIMEOUT),
                catchError((error: HttpErrorResponse) => {
                    let errorMsg: string;
                    const [codigosCom, mensajesCom] = CommunicationConstants;
                    if (error.error instanceof ErrorEvent) {
                        errorMsg = `${codigosCom.ERRORCLT}||${mensajesCom.ERRORCLT}`;
                    } else {

                        if(error.status === 400){
                            let message = error.error?.ErrorMessage != null ? error.error?.ErrorMessage :"Se enviaron datos incorrectos al servidor.";
                            errorMsg= `${codigosCom.ERROR}:${message}`;
                            this.messageService.add({severity:"error", key: 'basic-message', summary:'400', detail: message});
                        }else if( error.status === 500){
                            let message : string = "";
                            const _errorArr = error.message.split('||');
                            if(_errorArr.length >= 2) message =_errorArr[1];
                            message = message === ""? error.message : "";
                            message = error.error?.Message != null && message === "" ? error.error?.Message : "";
                            errorMsg = `${codigosCom.ERROR}:${message}`;
                            this.messageService.add({severity:"error", key: 'advance-message', summary: message, detail: "2y3yuhh3348jdhsiuwe872989823"});
                        } else if(error.status === 401){
                            this.messageService.add({severity:"error", key: 'basic-message', summary:'401', detail: mensajesCom.MSGTIMEOUT});
                            errorMsg = `${codigosCom.TIMEOUT}:${mensajesCom.MSGTIMEOUT}`;
                        } else if(error.status === 404){
                            this.messageService.add({severity:"error", key: 'basic-message', summary:'404', detail: mensajesCom.MSG404});
                            errorMsg = `${codigosCom.ERROR}:${mensajesCom.MSG404}`;
                        } else {
                            this.messageService.add({severity:"error", key: 'basic-message', summary: 'Error de comunicación', detail: mensajesCom.MSGERRORSRV});
                            errorMsg = `${codigosCom.ERROR}:${mensajesCom.MSGERRORSRV}`;
                        }
                    }
                    throw new Error(errorMsg);
                 })
           )
  }
}
