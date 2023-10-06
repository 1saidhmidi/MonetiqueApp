import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { incidentRoutingModule } from './incident-routing.module';
import { LayoutincidentComponent } from './layoutincident.component';
import { IncidentComponent } from './incident.component';
import { AddEditincidentComponent } from '../incident/incident-edit.component';
//import { IncidentService } from '../_services/incident.service';
import {IncidentFilterpipe} from './incident-filter-pipe';
import { BrowserModule } from '@angular/platform-browser';
//import {MatDialogModule} from '@angular/material';
//import {MatDialogModule} from "@angular/material";
//import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        incidentRoutingModule       // MatDialog, MatDialogRef
        
    ],
    declarations: [
        LayoutincidentComponent,
        IncidentComponent,
        AddEditincidentComponent,
        IncidentFilterpipe,
        //IncidentService
    ],
    providers :[
        //IncidentService
    ],
})
export class incidentModule { }