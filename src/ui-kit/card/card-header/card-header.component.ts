import {ChangeDetectionStrategy, Component, ContentChild, TemplateRef} from '@angular/core';
import {DescriptionDirective} from "@/directives/layout/description.directive";
import {NgIf} from "@angular/common";

//todo rename
@Component({
  selector: 'app-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss'],
  imports: [
    NgIf
  ],
  standalone: true
})
export class CardHeaderComponent {

  @ContentChild(DescriptionDirective)
  description: TemplateRef<any>;

}
