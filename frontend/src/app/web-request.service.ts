import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly Root_URL;

  constructor(private http: HttpClient) {
    this.Root_URL  = 'http://localhost:3000';
   }

   get(uri: string){
     return this.http.get(`${this.Root_URL}/${uri}`); 
   }
   post(uri: string, payload: Object){
     return this.http.post(`${this.Root_URL}/${uri}`, payload); 
   }
   patch(uri: string, payload: Object){
     return this.http.patch(`${this.Root_URL}/${uri}`, payload); 
   }
   delete(uri:string){
     return this.http.delete(`${this.Root_URL}/${uri}`);
   }

}
