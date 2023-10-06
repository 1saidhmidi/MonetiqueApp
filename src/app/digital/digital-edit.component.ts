import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../_services';
import { DigitalService } from '../_services/digital.service';

import * as moment from 'moment-timezone';


@Component({ selector: 'app-digital-edit',templateUrl: 'digital-edit.component.html'})
export class AddEditdigitalComponent implements OnInit {
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
        private digitalService : DigitalService
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
           // refId: [{value: '', disabled: this.isAddMode ? false : true}, [Validators.required,Validators.maxLength(8)]],
           Environnement : ['',Validators.required],
           Incident: ['', Validators.required],
           Intervention: ['', Validators.required],
           Statut: ['',Validators.required],
            date: ['', Validators.required]
        });

        if (!this.isAddMode) {
            this.digitalService.findById(this.id)
                .pipe(first())
            .subscribe((foundDigital: any) => {
                // TODO : change any to model types
                console.info('foundDigital = ', foundDigital);
                if(foundDigital && foundDigital.result) {
                    foundDigital.result.date =  moment(foundDigital.result.date).format('YYYY-MM-DD')
                    this.form.patchValue(foundDigital.result);
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

            this.createDigital();
        } else {
           this.updateDigital();
        }
    }

    private createDigital() {
        console.info('created Digital = ', this.form.value);
        this.digitalService.addDigital(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Digital Incident added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateDigital() {
        const gabToUpdate = this.form.value;
        gabToUpdate.id = this.id;
        this.digitalService.update(gabToUpdate)
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