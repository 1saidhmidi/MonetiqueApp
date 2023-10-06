import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

  import { GabService } from '../_services/gab.service';
  import * as XLSX from 'xlsx';
import { Gab } from '@app/_models/gab';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { newArray } from '@angular/compiler/src/util';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

//import {MatDialog, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-gab',
  templateUrl: './gab.component.html',
  styleUrls: ['./gab.component.less']
})
export class GabComponent implements OnInit {

   gabs:any[]=new Array();
gabsShareInit:any[]=[]

   private listgab=new BehaviorSubject<any[]>(this.gabsShareInit);
   currentGetListGab = this.listgab.asObservable();

     fileName= 'ExcelSheet.xlsx';
     searcheTerm: string;
  constructor(private gabService: GabService , private router: Router) {

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

  newListGab(listgab:any[]){

    this.listgab.next(listgab)
   }


  ngOnInit(): void {

    this.getListGab();
  }
  getListGab() {

    this.gabService.findAll()
    .subscribe((data) =>
     { 
       this.gabs =data; 
      console.log(this.gabs)
      this.newListGab(this.gabs)
      this.currentGetListGab.subscribe(dataSharing=>this.gabs=dataSharing)
    }
     );
    //this.gabs =this.gabs;
    console.log(' DATA '+this.gabs)

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

        deleteGab(gab: Gab) {
          //const foundGabs = this.gabs.find(x => x.id === gab.id);
          //foundGabs.isDeleting = true;
        if(gab.incidents && gab.incidents.length > 0) {
          alert('gab has incidents, please delete incidents before');
          return;
        }
          
          this.gabService.delete(gab._id)
              .pipe(first())
              .subscribe(() => {

                //this.gabs = this.gabs.filter(x => x.id != gab);
                this.getListGab();

                this.newListGab(this.gabs)
      this.currentGetListGab.subscribe(dataSharing=>this.gabs=dataSharing)

                console.log('AFTER'+this.gabs);
              


              });
      }
}





