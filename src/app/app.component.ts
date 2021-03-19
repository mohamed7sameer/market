// app.component.ts
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    trigger('myRouter',[
      transition('0 => 1, 0 => 2, 0 => 3, 0 => 4, 1 => 2, 1 => 3, 1 => 4, 2 => 3, 2 => 4, 3 => 4',[
        group([
          query(':enter',[
            style({
              transform: 'translateX(100%)',


            }),
            animate(500,style({
              transform: 'translateX(0px)',

            }))
          ]),
          query(':leave',[
            style({
              transform: 'translateX(0px)',

            }),
            animate(500,style({
              transform: 'translateX(-100%)',

            }))
          ])
        ])
      ]),

      transition('4 => 3, 4 => 2, 4 => 1, 4 => 0, 3 => 2, 3 => 1, 3 => 0, 2 => 1, 2 => 0, 1 => 0',[
        group([
          query(':enter',[
            style({
              transform: 'translateX(-100%)',


            }),
            animate(500,style({
              transform: 'translateX(0%)',

            }))
          ]),
          query(':leave',[
            style({
              transform: 'translateX(0%)',

            }),
            animate(500,style({
              transform: 'translateX(100%)',

            }))
          ])
        ])
      ]),



    ])
  ]
})
export class AppComponent {
  title = 'test1';
}
