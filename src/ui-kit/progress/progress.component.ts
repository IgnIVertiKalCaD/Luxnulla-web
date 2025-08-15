import {Component, Input} from '@angular/core';
import {SizeDirective} from "@/directives/size.directive";

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  imports: [
    SizeDirective
  ],
  standalone: true
})
export class ProgressComponent {

  @Input()
  className: string = '';

  @Input()
  value: string | number = '50';

  @Input()
  max: string = '100';

  @Input()
  height: string = '4px';

  @Input()
  width: string = '100%';


}
