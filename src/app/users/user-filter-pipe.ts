
import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../_models/user';



@Pipe({

    name: 'userfilter'
})

export class UserFilterpipe implements PipeTransform{


transform(users: User[] ,  searchTerm: string) : User[] {

    if(!users || !searchTerm) {  

        return users;
    }else{
    return users.filter(user => 
        user.username.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
    
}

}