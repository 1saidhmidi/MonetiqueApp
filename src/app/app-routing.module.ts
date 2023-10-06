import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import {ListdabComponent} from './dab/listdab.component';
import { GabComponent } from './gab/gab.component';
const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const gabsModule = () => import('./gab/gab.module').then(x=>x.gabModule);
const incidentsModule = () => import('./incident/incident.module').then(x=>x.incidentModule);

const digitalsModule = () => import('./digital/digital.module').then(x=>x.digitalModule);

import { Ng2SearchPipeModule } from 'ng2-search-filter';
const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'dabs', component: ListdabComponent, canActivate: [AuthGuard] },
    //{path: 'gabs', component:GabComponent, canActivate: [AuthGuard]},
    { path: 'gabs', loadChildren: gabsModule },

    { path: 'incidents', loadChildren: incidentsModule },
    { path: 'digitals', loadChildren: digitalsModule },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }