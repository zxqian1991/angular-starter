import {Pipe} from '@angular/core';
import {PipeTransform} from '@angular/core/src/change_detection/pipe_transform';

@Pipe({name: "unionTest"})
export class UnionTestPipe {
    transform(value : number, exponent : string) {
        console.log(exponent);
        return {
            a:102
        };
    }
}
@Pipe({name: "unionTestt"})
export class UnionTesttPipe {
    transform(value : any, exponent : string) {
        console.log(value);
        console.log(exponent);
        return value + "aksjdnaskjnk";
    }
}