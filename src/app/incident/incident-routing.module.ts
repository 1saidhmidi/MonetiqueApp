import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutincidentComponent } from './layoutincident.component';
import { IncidentComponent } from './incident.component';
import {AddEditincidentComponent} from './incident-edit.component';

const routes: Routes = [
    {
        path: '', component: LayoutincidentComponent,
        children: [
            { path: '', component: IncidentComponent },
            { path: 'addincident', component: AddEditincidentComponent },
            { path: 'editincident/:id', component: AddEditincidentComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class incidentRoutingModule { 


}