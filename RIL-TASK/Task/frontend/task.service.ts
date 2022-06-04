import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseUrl = "http://localhost:3001/contacts";

  constructor(private http: HttpClient) { }
  
  //getting all contacts
  public getAllContacts() : Observable<any>{
    let url = `${this.baseUrl}`;
    return this.http.get(url);
  }

  //getting contacts by name
  public getContactByName(name : string) : Observable<any>{
    let url = `${this.baseUrl}/name/${name}`;
    return this.http.get(url);
  }
 
  //getting contacts by number
  public getContactsByNum(number : number) : Observable<any>{
    let url =  `${this.baseUrl}/number/${number}`;
    return this.http.get(url);
  }
}