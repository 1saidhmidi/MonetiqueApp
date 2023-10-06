import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Incident} from '../_models/incident';
import { ArrayResponse } from '../_models/response';
//import { apiUrl} from 'src/environments/environment';
import {environment} from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class IncidentService {

    public apibaseurl : string;
  private incidentSubject: BehaviorSubject<Incident>;
  public incident: Observable<Incident>;
  constructor(private http: HttpClient  /*config:apiUrl*/) { 
//this.apibaseurl = `${config.environment.apiUrl}`

  }
  

  public get gabValue(): Incident  {
    return this.incidentSubject.value;
}

    
     addGab(incident: Incident) {
      return this.http.post<Incident[]>(`${environment.apiUrl}/incidents`,incident);
     }

     findAll(){
       //return this.http.get<ArrayResponse<Gab>>(`/gabs`);
       return this.http.get<any[]>(`${environment.apiUrl}/incidents`);
     }

     findById(incidentId : string){
      return this.http.get(`${environment.apiUrl}/incidents/${incidentId}`);
     } 

     update(incident: any){
      return this.http.put(`${environment.apiUrl}/incidents/`+incident.id,incident);
     }
     
     delete(incidentId : string){
       return this.http.delete(`${environment.apiUrl}/incidents/${incidentId}`);
       //return this.http.delete(`/gabs/${gabId}`);
     } 
   
    

     
}
