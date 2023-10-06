import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Gab } from '../_models/gab';
import { ArrayResponse } from '../_models/response';
import { environment } from '@environments/environment';

//import { apiUrl} from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class GabService {

    public apibaseurl : string;
  private gabSubject: BehaviorSubject<Gab>;
  public gab: Observable<Gab>;
  constructor(private http: HttpClient  /*config:apiUrl*/) { 
//this.apibaseurl = `${config.environment.apiUrl}`

  }

  public get gabValue(): Gab  {
    return this.gabSubject.value;
}

    
     addGab(gab: Gab) {
      return this.http.post<Gab[]>(`${environment.apiUrl}/gabs`,gab);
     }

     findAll(){
       //return this.http.get<ArrayResponse<Gab>>(`/gabs`);
       return this.http.get<any[]>(`${environment.apiUrl}/gabs`);
     }

     findById(gabId : string){
      return this.http.get(`${environment.apiUrl}/gabs/${gabId}`);
     } 

     update(gab: any){
      return this.http.put(`${environment.apiUrl}/gabs/`+gab.id,gab);
     }
     
     delete(gabId : string){
       return this.http.delete(`${environment.apiUrl}/gabs/${gabId}`);
       //return this.http.delete(`/gabs/${gabId}`);
     } 

     
}
