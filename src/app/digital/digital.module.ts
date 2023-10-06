import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { digitalRoutingModule } from './digital-routing.module';
import { LayoutdigitalComponent } from './layoutdigital.component';
import { DigitalComponent } from './digital.component';
import { AddEditdigitalComponent } from '../digital/digital-edit.component';
import {DigitalFilterpipe} from './digital-filter-pipe';
import { BrowserModule } from '@angular/platform-browser';
//import {MatDialogModule} from '@angular/material';
//import {MatDialogModule} from "@angular/material";
//import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        digitalRoutingModule,
        DigitalComponent
        
    ],
    declarations: [
        LayoutdigitalComponent,
        
        AddEditdigitalComponent,
        DigitalFilterpipe
    ],
    providers :[
    ],
})
export class digitalModule { }