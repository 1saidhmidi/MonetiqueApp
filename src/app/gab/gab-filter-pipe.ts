
import {Pipe, PipeTransform} from '@angular/core';
import {Gab} from '../_models/gab';



@Pipe({

    name: 'gabfilter'
})

export class GabFilterpipe implements PipeTransform{


transform(gabs: Gab[] ,  searchTerm: string) : Gab[] {

    if(!gabs || !searchTerm) {  

        return gabs;
    }else{
    return gabs.filter(gab => 
        gab.refId && searchTerm && gab.refId.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}

}