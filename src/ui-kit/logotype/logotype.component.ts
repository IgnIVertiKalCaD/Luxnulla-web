import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-logotype',
  templateUrl: './logotype.component.html',
  styleUrls: ['./logotype.component.scss'],
  imports: [
    NgOptimizedImage
  ],
  standalone: true
})
export class LogotypeComponent {
}
