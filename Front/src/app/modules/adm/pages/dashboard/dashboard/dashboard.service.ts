import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CommunicationConstants } from 'src/app/core/constants/communication';
import { environment } from "src/environments/environment";

const API_MAIN = environment.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
    private URL_CONSUMPTION : string =  environment.serverUrl + "get_record_consumption";
    private URL_CONSUMPTION_GRAPH : string =  environment.serverUrl + "get_data_consumption_graph";
    private URL_TRANSACTIONS : string =  environment.serverUrl + "get_transactions";

    constructor(private _http: HttpClient) {}

    getComsumption(client_id : number) : Observable<any>{

      let params = new HttpParams()
        .set('client_id', client_id ?? "")

      return this._http
        .get<any>(this.URL_CONSUMPTION, { params: params})
        .pipe(
            map((res: any) => {
                const [codigosCom, mensajesCom] = CommunicationConstants;
                if (res === null){
                    throw new Error(`${codigosCom.ERRORSRV}||${mensajesCom.MSGDATAVACIOSRV}`);
                }
                return res;
            })
        );
    }

    getComsumptionGraph(client_id : number) : Observable<any>{

        let params = new HttpParams()
          .set('client_id', client_id ?? "")
  
        return this._http
          .get<any>(this.URL_CONSUMPTION_GRAPH, { params: params})
          .pipe(
              map((res: any) => {
                  const [codigosCom, mensajesCom] = CommunicationConstants;
                  if (res === null){
                      throw new Error(`${codigosCom.ERRORSRV}||${mensajesCom.MSGDATAVACIOSRV}`);
                  }
                  return res;
              })
          );
    }

    getTransactions(client_id : number) : Observable<any>{
        let params = new HttpParams()
          .set('client_id', client_id ?? "")
  
        return this._http
          .get<any>(this.URL_TRANSACTIONS, { params: params})
          .pipe(
              map((res: any) => {
                  const [codigosCom, mensajesCom] = CommunicationConstants;
                  if (res === null){
                      throw new Error(`${codigosCom.ERRORSRV}||${mensajesCom.MSGDATAVACIOSRV}`);
                  }
                  return res;
              })
          );
    }

};


