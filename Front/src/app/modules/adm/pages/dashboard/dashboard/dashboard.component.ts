import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { MessageConstants } from 'src/app/core/constants/message';
import { DashboardService } from './dashboard.service';
import { Socket } from 'ngx-socket-io';
import { SecureStorageService } from 'src/app/core/services/secure-storage.service';


interface currentBalance {
  balance: number;
  consumption: number;
  minutes: number;
  type: string;
}



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  codeMessage: any;
  textMessage: any;
  iconMessage: any;

  actualizacion!: string;
  currentBalance: currentBalance

  data: any;
  options: any;
  chat_data: any;
  transactions: any;

  constructor(
    private messageService: MessageService, 
    private queryManagementService: DashboardService,
    private socket: Socket,
    private secureStorageService: SecureStorageService
  ){}

  formatCurrency(value: number): string {
    return '$' + value.toFixed(2);
  }

  onSelect(event: any) {
    console.log(event);
  }

  getCurrentDate(){

    const now = new Date();
    const currentDate = now.toLocaleDateString(); 
    const currentTime = now.toLocaleTimeString(); 

    return `${currentDate}:${currentTime}`
  }

  isEmptyObject(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }

  ngOnInit() {

    const session = this.secureStorageService.getData("session")

    this.getWidgets()
    this.getGraph()
    this.getTransations()

    if(session){

      // Escuchar eventos del servidor Socket.IO
      this.socket.on('server_event', (data: any) => {

        console.log("tiempo real",data)

        if(data.client_id == JSON.parse(session).client_id){

          if(data.widget){
            this.currentBalance = data.widget;
            this.actualizacion = this.getCurrentDate()
          }
          console.log("data.chart",!this.isEmptyObject(data.chart))
          if(!this.isEmptyObject(data.chart)){
            this.chat_data = this.transformData(data.chart);
            this.charStyleConfig(this.chat_data.labels, this.chat_data.recargas, this.chat_data.consumos)
          }

          if(data.transactions){
            this.transactions = data.transactions;
          }

        }
        
      });
    }

  }

  charStyleConfig(labels: Array<string>, recargas: Array<number>, consumos: Array<number>) {
    
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    this.data = {
        labels: labels,
        datasets: [
            {
                label: 'Recargas(Megas)',
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                data: recargas
            },
            {
                label: 'Consumos(Megas)',
                backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                data: consumos
            }
        ]
    };

    this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }

        }
    };
  }

  transformData(data: any) {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    // Inicializar los arreglos con ceros
    const recargas = new Array(12).fill(0);
    const consumos = new Array(12).fill(0);
  
    // Mapear los datos de consumo
    data.consumption.forEach((item: any) => {
      const [yearMonth, value] = item;
      const [year, month] = yearMonth.split('-');
      const monthIndex = parseInt(month) - 1;
      consumos[monthIndex] = value;
    });
  
    // Mapear los datos de recarga
    data.recharge.forEach((item: any) => {
      const [yearMonth, value] = item;
      const [year, month] = yearMonth.split('-');
      const monthIndex = parseInt(month) - 1;
      recargas[monthIndex] = value;
    });
  
    // Crear las etiquetas
    const labels = monthNames;
  
    return {
      labels,
      recargas,
      consumos
    };
  }

  basicMessage(){
    [this.codeMessage, this.iconMessage, this.textMessage] = MessageConstants
    this.messageService.add({ key: 'basic-message', severity: this.codeMessage.SEVWARN, summary: this.textMessage.MSGWARNLOGIN, detail: 'La información que ingresó es incorrecta.', icon: this.iconMessage.ICONWARN });
  }

  getWidgets(){

    const session = this.secureStorageService.getData("session")

    if(session){


      const clientId = JSON.parse(session).client_id

      this.queryManagementService.getComsumption(clientId)
      .subscribe(
        {
          next: (data) => {
            console.log("informacion", data)
            let dataTmp = <any>data;
            if(dataTmp) {
              if(dataTmp.data){
                console.log("informacion", dataTmp.data)
                this.currentBalance = data.data;
                // this.actualizacion = this.getCurrentDate()
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
  }

  getGraph(){

    const session = this.secureStorageService.getData("session")

    if(session){


      const clientId = JSON.parse(session).client_id

      this.queryManagementService.getComsumptionGraph(clientId)
      .subscribe(
        {
          next: (data) => {
            console.log("informacion", data)
            let dataTmp = <any>data;
            if(dataTmp) {
              if(dataTmp.data){
                console.log("informacion", dataTmp.data)
                if(!this.isEmptyObject(data.data)){
                  this.chat_data = this.transformData(data.data);
                  this.charStyleConfig(this.chat_data.labels, this.chat_data.recargas, this.chat_data.consumos)
                }
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
  }

  getTransations(){

    const session = this.secureStorageService.getData("session")

    if(session){


      const clientId = JSON.parse(session).client_id

      this.queryManagementService.getTransactions(clientId)
      .subscribe(
        {
          next: (data) => {
            console.log("informacion", data)
            let dataTmp = <any>data;
            if(dataTmp) {
              if(dataTmp.data){
                console.log("informacion", dataTmp.data)
                this.transactions = data.data;
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
  }

  advanceMessage(){
    [this.codeMessage, this.iconMessage, this.textMessage] = MessageConstants
    this.messageService.add({ key: 'advance-message', sticky: true, severity: this.codeMessage.SEVERROR, summary: this.textMessage.MSGERRORSYSTEM, detail: '5ca1abb6ce037511f000628e', icon: this.iconMessage.ICONERROR });
  }
  

}
