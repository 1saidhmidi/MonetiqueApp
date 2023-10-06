import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { gabRoutingModule } from './gab-routing.module';
import { LayoutgabComponent } from './layoutgab.component';
import { GabComponent } from './gab.component';
import { AddEditgabComponent } from '../gab/gab-edit.component';
import {GabFilterpipe} from './gab-filter-pipe';
import { BrowserModule } from '@angular/platform-browser';
//import {MatDialogModule} from '@angular/material';
//import {MatDialogModule} from "@angular/material";
//import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        gabRoutingModule,
       // MatDialog, MatDialogRef
        
    ],
    declarations: [
        LayoutgabComponent,
        GabComponent,
        AddEditgabComponent,
        GabFilterpipe
    ],
    providers :[
    ],
})
export class gabModule { }