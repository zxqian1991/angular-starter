import {NgModule} from '@angular/core';
import { UnionDateService } from './services/date.service';
import { UnionUtilService } from './services/util.service';
@NgModule({
    bootstrap: [

    ],
    declarations: [
        
    ],
    exports: [

    ],
    /**
   * Import Angular's modules.
   */
    imports: [
        
    ],
    /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
    providers: [
        UnionUtilService,
        UnionDateService
    ]
})
export class UnionModule {
    constructor() {}
}