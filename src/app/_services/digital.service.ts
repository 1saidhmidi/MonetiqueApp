import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Digital } from '../_models/digital';
import { ArrayResponse } from '../_models/response';
import {environment} from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class DigitalService {


    public apibaseurl : string;
    private digitalSubject: BehaviorSubject<Digital>;
    public digital: Observable<Digital>;
    constructor(private http: HttpClient  /*config:apiUrl*/) { 
  //this.apibaseurl = `${config.environment.apiUrl}`
  
    }
  
    public get digitalValue(): Digital  {
      return this.digitalSubject.value;
  }
  
      
       addDigital(digital: Digital) {
        return this.http.post<Digital[]>(`${environment.apiUrl}/digitals`,digital);
       }
  
       findAll(){
         return this.http.get<any[]>(`${environment.apiUrl}/digitals`);
       }
  
       findById(digitalId : string){
        return this.http.get(`${environment.apiUrl}/digitals/${digitalId}`);
       } 
  
       update(digital: any){
        return this.http.put(`${environment.apiUrl}/digitals/`+digital.id,digital);
       }
       
       delete(digitalId : string){
         return this.http.delete(`${environment.apiUrl}/digitals/${digitalId}`);
                } 

}
