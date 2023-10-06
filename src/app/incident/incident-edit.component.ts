import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../_services';
//import { IncidentService } from '../_services/incident.service';
import { IncidentService } from '../_services/incident.service';

import * as moment from 'moment-timezone';


@Component({ selector: 'app-incident-edit',templateUrl: 'incident-edit.component.html'})
export class AddEditincidentComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private incidentService : IncidentService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        console.log('dd '+this.isAddMode)
        // password not required in edit mode
        /*
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }*/

        this.form = this.formBuilder.group({
            transactions: ['', Validators.required],
            bourrage: ['', Validators.required],
            blocage: ['', Validators.required],
            coupure: ['', Validators.required],
            autre : ['', Validators.required],
            gabId : ['', Validators.required]
        });

        if (!this.isAddMode) {
            this.incidentService.findById(this.id)
                .pipe(first())
            .subscribe((foundIncident: any) => {
                // TODO : change any to model types
                console.info('foundIncident = ', foundIncident);
                if(foundIncident && foundIncident.result) {
                    foundIncident.result.date =  moment(foundIncident.result.date).format('YYYY-MM-DD')
                    this.form.patchValue(foundIncident.result);
                }
            });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        console.log('ssee'+this.form)
        // stop here if form is invalid
        if (this.form.invalid) {
            console.log('ffff dd'+JSON.stringify(this.form.value));
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            console.log('ffff '+JSON.stringify(this.form.value));

            this.createIncident();
        } else {
           this.updateIncident();
        }
    }

    private createIncident() {
        console.info('created incident = ', this.form.value);
        this.incidentService.addGab(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('incident added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateIncident() {
        const incidentToUpdate = this.form.value;
        incidentToUpdate.id = this.id;
        this.incidentService.update(incidentToUpdate)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
    
}