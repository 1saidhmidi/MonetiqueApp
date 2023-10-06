import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';


import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import {ListdabComponent} from './dab/listdab.component';
import {DigitalComponent} from './digital/digital.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
//import {MatDialogModule} from '@angular/material'
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
      //  MatDialogModule,
        ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        ListdabComponent,
        DigitalComponent
        
    ],
    exports: [
        DigitalComponent,
      ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        // TODO : delete this when implementing the real backend for auth.
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };