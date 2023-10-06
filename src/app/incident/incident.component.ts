import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { IncidentService } from '../_services/incident.service';



import * as XLSX from 'xlsx';
import { Incident } from '../_models/incident';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { newArray } from '@angular/compiler/src/util';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

//import {MatDialog, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.less']
})
export class IncidentComponent implements OnInit {

  incidents: any[] = new Array();
  incidentsShareInit: any[] = []

  private listincidents = new BehaviorSubject<any[]>(this.incidentsShareInit);
  currentGetListIncidents = this.listincidents.asObservable();

  fileName = 'ExcelSheet.xlsx';
  searcheTerm: string;
  constructor(private incidentService: IncidentService, private router: Router) {

    //this.searcheTerm = this.searcheTerm;
  }


  /*

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
   this.dialog.open(GabComponent, {
     width: '250px',
     enterAnimationDuration,
     exitAnimationDuration,
   });
 }

  */

  newListIncident(listincidents: any[]) {

    this.listincidents.next(listincidents)
  }


  ngOnInit(): void {

    this.getListIncident();
  }
  getListIncident() {

    this.incidentService.findAll()
      .subscribe((data: any) => {
        if (!!data && data.result) {

          this.incidents = data.result.map((inc) => {
            inc.isDeleting = false;
            return inc;
          });
          console.log(this.incidents)
          this.newListIncident(this.incidents)
          this.currentGetListIncidents.subscribe(dataSharing => this.incidents = dataSharing)

        }

      }
      );
    //this.gabs =this.gabs;
    console.log(' DATA ' + this.incidents)

  }



  IncidentService() {

    console.log(this.IncidentService);


  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }
  /*
    deleteGab(gab: Gab) {
      const foundGabs = this.gabs.find(x => x.gab === gab);
      foundGabs.isDeleting = true;
      
      this.gabService.delete(gab.id)
          .pipe(first())
          .subscribe(() => {
            this.gabs.filter(x => x.id != gab);
            console.log(this.gabs);
          
          });
  */
/*
  deleteIncident(incident: Incident) {
    //const foundGabs = this.gabs.find(x => x.id === gab.id);
    //foundGabs.isDeleting = true;
    /*   if(incident.incidents && incident.incidents.length > 0) {
         alert('gab has incidents, please delete incidents before');
         return;
       }
    
    this.incidentService.delete(incident._id)
      .pipe(first())
      .subscribe(() => {

        //this.gabs = this.gabs.filter(x => x.id != gab);
        this.getListIncident();

        this.newListIncident(this.incidents)
        this.currentGetListIncidents.subscribe(dataSharing => this.incidents = dataSharing)

        console.log('AFTER' + this.incidents);



      });
  }
*/

deleteIncident(incident: Incident) {


        this.incidentService.delete(incident._id)
        .pipe(first())
        .subscribe(() => {

          //this.gabs = this.gabs.filter(x => x.id != gab);
          this.getListIncident();

          this.newListIncident(this.incidents)
this.currentGetListIncidents.subscribe(dataSharing=>this.incidents=dataSharing)

          console.log('AFTER'+this.incidents);
        


        });



}


}





