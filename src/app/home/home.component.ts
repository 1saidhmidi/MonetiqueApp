import { Component } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';

import * as Highcharts from 'highcharts';
declare var require: any;

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;
    imageSrc = 'src/app/images/biat2.png' ;
    imageAlt = 'biat';
    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }
        public options: any = {
          Chart: {
            type: 'area',
            height: 700
          },
          title: {
            text: 'Evolution de la service Monitique'
          },
          credits: {
            enabled: false
          },
          xAxis: {
            categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
          series: [{
            name: 'DAB',
            data: [502, 635, 809, 947, 1402, 3634, 5268]
        }, {
            name: 'GAB',
            data: [163, 203, 276, 408, 547, 729, 628]
        }, {
            name: 'Autres',
            data: [18, 31, 54, 156, 339, 818, 1201]
        }]
        }
        ngOnInit() {
          Highcharts.chart('container', this.options);
        }
      
}