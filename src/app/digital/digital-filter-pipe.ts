
import {Pipe, PipeTransform} from '@angular/core';
import {Digital} from '../_models/digital';



@Pipe({

    name: 'digitalfilter'
})

export class DigitalFilterpipe implements PipeTransform{


transform(digitals: Digital[] ,  searchTerm: string) : Digital[] {

    if(!digitals || !searchTerm) {  

        return digitals;
    }else{
    return digitals.filter(digital => 
        digital.Incident && searchTerm && digital.Incident.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}

}