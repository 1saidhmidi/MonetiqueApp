export class  ArrayResponse<T> {

    code:Number;
    message:string;
    result: T[];
}

export class  Response<T> {

    code:Number;
    message:string;
    result: T;
}