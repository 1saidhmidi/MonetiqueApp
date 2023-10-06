import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutgabComponent } from './layoutgab.component';
import { GabComponent } from './gab.component';
import {AddEditgabComponent} from './gab-edit.component';

const routes: Routes = [
    {
        path: '', component: LayoutgabComponent,
        children: [
            { path: '', component: GabComponent },
            { path: 'addgab', component: AddEditgabComponent },
            { path: 'editgab/:id', component: AddEditgabComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class gabRoutingModule { 


}