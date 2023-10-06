import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutdigitalComponent } from './layoutdigital.component';
import { DigitalComponent } from './digital.component';
import {AddEditdigitalComponent} from './digital-edit.component';

const routes: Routes = [
    {
        path: '', component: LayoutdigitalComponent,
        children: [
            { path: '', component: DigitalComponent },
            { path: 'adddigital', component: AddEditdigitalComponent },
            { path: 'editdigital/:id', component: AddEditdigitalComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class digitalRoutingModule { 


}