import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  getHostname() {
    return 'https://www.betradating.com/betraPhp/';
  }
  
}
