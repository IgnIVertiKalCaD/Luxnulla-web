import {animate, style, transition, trigger} from "@angular/animations";
import {SizeDirective} from "@/directives/size.directive";
import {Icon_leftDirective} from "@/directives/layout/icon_left.directive";
import {Icon_rightDirective} from "@/directives/layout/icon_right.directive";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewEncapsulation, inject } from "@angular/core";
import {InputDirective} from "@/directives/layout/input.directive";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('showingErrorAnimation', [
      transition(':enter', [
        style({opacity: 0}),
        animate('200ms ease', style({opacity: 1})),
      ]),
      transition(':leave', [
        animate('200ms ease', style({opacity: 0}))
      ])
    ]),
  ],
  imports: [
    SizeDirective,
  ]
})
export class TextFieldComponent implements AfterViewInit, OnChanges {
  private readonly cdr = inject(ChangeDetectorRef);

  @ContentChild(Icon_leftDirective)
  icon_left: TemplateRef<any>;

  @ContentChild(Icon_rightDirective)
  icon_right: TemplateRef<any>;

  @ContentChild(InputDirective)
  input!: InputDirective;

  @Input()
  className: string = 'solid_v1';

  //компромис
  @Input()
  styles: {
    padding: string | null
  } = {
    padding: null
  }

  @Input() height: string;

  @Input() width: string;

  @Input() updateTrigger: any;

  @Output()
  clickEventIconLeft: EventEmitter<any> = new EventEmitter()

  @Output()
  clickEventIconRight: EventEmitter<any> = new EventEmitter()

  isFocused: boolean = false;

  control: FormControl = new FormControl;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['updateTrigger']) {
      this.cdr.markForCheck();
    }
  }

  ngAfterViewInit() {
    const input = this.input.el.nativeElement as HTMLInputElement

    input.addEventListener('focus', () => {
      this.isFocused = true

      this.cdr.detectChanges()
    });
    input.addEventListener('blur', () => {
      this.isFocused = false

      this.cdr.detectChanges()
    });

    if(this.input.ngControl)
    this.control = this.input.control
  }

}
