import { Directive, ElementRef } from '@angular/core';
@Directive({
    selector: "[union-bubble]"
})
export class UnionBubbleDirective {
    constructor(public el: ElementRef){
        console.log("i am 1")
    };
    ngOnInit(){

    }
}

@Directive({
    selector: "div[union-bubble-1]"
})
export class UnionBubble1Directive {
    constructor(public el: ElementRef){
        console.log("i am 2")
    };
    ngOnInit(){
        
    }
}