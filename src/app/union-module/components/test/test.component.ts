import { Component } from '@angular/core';

@Component({
    selector: "union-test",
    template: `<div class="qian"></div>`,
    styles: [`
        .qian {
            height: 400px;
            width: 600px;
            background-color: green;
            coloe: white;
        }
    `]
})
export class UnionTestComponent {
    constructor(){

    }
}

@Component({
    selector: "union-test-1",
    template: `<div class="qian"></div>`,
    styles: [`
        .qian {
            height: 400px;
            width: 600px;
            background-color: green;
            coloe: white;
        }
    `]
})
export class UnionTestComponent1 {
    constructor(){
        
    }
}