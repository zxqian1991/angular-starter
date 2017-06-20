import {NgModule} from '@angular/core';
import { UnionBubbleDirective, UnionBubble1Directive } from './directives/bubble.directive';
import { UnionTestPipe, UnionTesttPipe } from './pipe/test.pipe';
import { UnionDateService } from './services/date.service';
@NgModule({
    bootstrap: [

    ],
    declarations: [
        // UnionBubble1Directive,
        // UnionBubbleDirective,
    ],
    exports: [
        // UnionBubble1Directive, // 这里有先后顺序
        // UnionBubbleDirective
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
        UnionDateService
    ]
})
export class UnionModule {
    constructor() {}
}