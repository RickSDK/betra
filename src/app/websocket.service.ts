import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
import {environment} from '../environments/environment';

const CHAT_URL = "ws://localhost:4200";

export interface Message {
  source: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  //private socket$  = new webSocket(url);
  //public messages$ = this.socket$.asObservable();

  private subject!: AnonymousSubject<MessageEvent>;
  //public messages: Subject<Message>;

  constructor() {
    const WebSocket = require('ws');
    const wss = new WebSocket.Server({ port: 8081 });

    /*
    wss.on('connection', (ws: { on: (arg0: string, arg1: { (message: any): void; (error: any): void; (ws: any): void; }) => void; }) => {
      onConnection(ws);
      ws.on('message', (message: any) => {
        message(message, ws);
      });
      ws.on('error', (error: any) => {
        error(error);
      });
       ws.on('close', (ws: any)=> {
        onclose();
    })
    });*/

      /*this.messages = <Subject<Message>>this.connect(CHAT_URL).pipe(
          map(
              (response: MessageEvent): Message => {
                  console.log(response.data);
                  let data = JSON.parse(response.data)
                  return data;
              }
          )
      );*/
  }

  
  public sendMessage(msg: any) {
    //this.socket$.next(msg);
  }

  /*public connect(url: string): AnonymousSubject<MessageEvent> {
      if (!this.subject) {
          this.subject = this.create(url);
          console.log("Successfully connected: " + url);
      }
      return this.subject;
  }

  private create(url: string): AnonymousSubject<MessageEvent> {
      let ws = new WebSocket(url);
      let observable = new Observable((obs: Observer<MessageEvent>) => {
          ws.onmessage = obs.next.bind(obs);
          ws.onerror = obs.error.bind(obs);
          ws.onclose = obs.complete.bind(obs);
          return ws.close.bind(ws);
      });
     let observer = {
          error: null,
          complete: null,
          next: (data: Object) => {
              console.log('Message sent to websocket: ', data);
              if (ws.readyState === WebSocket.OPEN) {
                  ws.send(JSON.stringify(data));
              }
          }
      };
      return new AnonymousSubject<MessageEvent>(observer, observable);
  }*/
}
function onConnection(ws: { on: (arg0: string, arg1: { (message: any): void; (error: any): void; (ws: any): void; }) => void; }) {
  throw new Error('Function not implemented.');
}

