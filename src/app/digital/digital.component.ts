import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

  import { DigitalService } from '../_services/digital.service';
  import * as XLSX from 'xlsx';
import { Digital } from '@app/_models/digital';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { newArray } from '@angular/compiler/src/util';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

//import {MatDialog, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-digital',
  templateUrl: './digital.component.html',
  styleUrls: ['./digital.component.less']
})
export class DigitalComponent implements OnInit {

   digitals:any[]=new Array();
  //digitals : Digital []=[];
   digitalsShareInit:any[]=[]

   private listdigital=new BehaviorSubject<any[]>(this.digitalsShareInit);
   currentGetListDigital = this.listdigital.asObservable();

     fileName= 'ExcelSheet.xlsx';
     searcheTerm: string;
  constructor(private digitalService: DigitalService , private router: Router) {

    //this.searcheTerm = this.searcheTerm;
    this.digitals=[];
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

  newListDigital(listdigital:any[]){

    this.listdigital.next(listdigital)
   }


  ngOnInit(): void {

    this.getListDigital();
  }
  getListDigital() {

    this.digitalService.findAll()
    .subscribe((data) =>
     { 
       this.digitals =data; 
      console.log(this.digitals)
      this.newListDigital(this.digitals)
      this.currentGetListDigital.subscribe(dataSharing=>this.digitals=dataSharing)
    }
     );
    //this.gabs =this.gabs;
    console.log(' DATA '+this.digitals)

  }


  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
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

        deleteDigital(digital: Digital) {
          //const foundGabs = this.gabs.find(x => x.id === gab.id);
          //foundGabs.isDeleting = true;
      /*  if(digital.incidents && digital.incidents.length > 0) {
          alert('gab has incidents, please delete incidents before');
          return;
        }*/
          
          this.digitalService.delete(digital.id)
              .pipe(first())
              .subscribe(() => {

                //this.gabs = this.gabs.filter(x => x.id != gab);
                this.getListDigital();

                this.newListDigital(this.digitals)
      this.currentGetListDigital.subscribe(dataSharing=>this.digitals=dataSharing)

                console.log('AFTER'+this.digitals);
              


              });
      }
}





