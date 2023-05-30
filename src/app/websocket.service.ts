import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

const CHAT_URL = "wss://localhost/betraPhp/websocket.php";

export interface Message {
  source: string;
  content: string;
}

@Injectable()
export class WebsocketService {
  private subject!: AnonymousSubject<MessageEvent>;
  public messages: Subject<Message>;

  public myWebSocket = new WebSocketSubject(CHAT_URL);


  constructor() {
    this.messages = <Subject<Message>>this.connect().pipe(
      map(
        (response: MessageEvent): Message => {
          console.log('contructor', response.data);
          let data = JSON.parse(response.data)
          return data;
        }
      )
    );
  }

  public connect(): AnonymousSubject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create();
      console.log("Successfully connected: " + CHAT_URL);
    }
    return this.subject;
  }

  private create(): AnonymousSubject<MessageEvent> {
    let ws = new WebSocket(CHAT_URL);
    let observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      error: (err: any) => console.error(err),
      complete: () => undefined,
      next: (data: Object) => {
        console.log('Message sent to websocket: ', data);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return new AnonymousSubject<MessageEvent>(observer, observable);
  }


  public sendMessage(msg: any) {
    console.log('sending new message:', msg);
    this.messages.next(msg);
  }

}


