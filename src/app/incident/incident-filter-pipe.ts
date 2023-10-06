
import {Pipe, PipeTransform} from '@angular/core';
import {Incident} from '../_models/incident';



@Pipe({

    name: 'incidentfilter'
})

export class IncidentFilterpipe implements PipeTransform{


transform(incidents: Incident[] ,  searchTerm: string) : Incident[] {

    if(!incidents || !searchTerm) {  

        return incidents;
    }else{
    return incidents.filter(incident => 
        incident.transactions && searchTerm && incident.transactions.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}

}