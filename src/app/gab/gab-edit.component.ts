import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../_services';
import { GabService } from '../_services/gab.service';

import * as moment from 'moment-timezone';


@Component({ selector: 'app-gab-edit',templateUrl: 'gab-edit.component.html'})
export class AddEditgabComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    disabled=false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private gabService : GabService
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
            refId: [{value: '', disabled: this.isAddMode ? false : true}, [Validators.required,Validators.maxLength(8)]],
            lib: ['', Validators.required],
            type: ['', Validators.required],
            date: ['', Validators.required]
        });

        if (!this.isAddMode) {
            this.gabService.findById(this.id)
                .pipe(first())
            .subscribe((foundGab: any) => {
                // TODO : change any to model types
                console.info('foundGab = ', foundGab);
                if(foundGab && foundGab.result) {
                    foundGab.result.date =  moment(foundGab.result.date).format('YYYY-MM-DD')
                    this.form.patchValue(foundGab.result);
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

            this.createGag();
        } else {
           this.updateGab();
        }
    }

    private createGag() {
        console.info('created gab = ', this.form.value);
        this.gabService.addGab(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Gab added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateGab() {
        const gabToUpdate = this.form.value;
        gabToUpdate.id = this.id;
        this.gabService.update(gabToUpdate)
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