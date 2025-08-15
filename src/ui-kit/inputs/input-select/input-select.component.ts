import { AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, Input, OnDestroy, Output, QueryList, TemplateRef, ViewChild, ViewContainerRef, inject } from "@angular/core";
import { Overlay, OverlayRef, PositionStrategy } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subscription } from "rxjs";
import { InputSelectOptionComponent } from "@/ui-kit/inputs/input-select/input-select-option/input-select-option.component";
import { SizeDirective } from "@/directives/size.directive";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-input-select",
  templateUrl: "./input-select.component.html",
  styleUrls: ["./input-select.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputSelectComponent,
      multi: true,
    },
  ],
  animations: [
    trigger("overlayAnimation", [
      state("void", style({ opacity: 0, transform: "translateY(-10px)" })),
      transition("void => *", [animate("150ms ease-out")]),
    ]),
  ],
  imports: [SizeDirective, NgIf],
  standalone: true,
})
export class InputSelectComponent
  implements AfterViewInit, OnDestroy, ControlValueAccessor
{
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);


  @Input() placeholder: string = "Select an option";
  @Input() overlayHeight: string;
  @Input() overlayWidth: string;
  @Input() selectedViewValue: string;
  @Input() selectedValue: string;

  @Input() className: string = "solid_v1";

  @Input() height: string;
  @Input() width: string;
  @Input() padding: string | null = null;

  @ContentChildren(InputSelectOptionComponent)
  options: QueryList<InputSelectOptionComponent>;
  @ViewChild("trigger") trigger: ElementRef;
  @ViewChild("optionTemplate") optionTemplate: TemplateRef<any>;

  @Output() selectionChange = new EventEmitter<any>();

  isOpen = false;
  overlayRef: OverlayRef;
  subscriptions: Subscription[] = [];

  onChange = (_: any) => {};
  onTouched = () => {};

  ngAfterViewInit() {
    this.updateOptions();

    this.subscriptions.push(
      this.options.changes.subscribe(() => {
        this.updateOptions();
      }),
    );
  }

  private updateOptions() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions = [];

    this.options.forEach((option: InputSelectOptionComponent) => {
      const sub = option.onSelect.subscribe(() => {
        this.selectOption(option);
        this.close();
      });

      this.subscriptions.push(sub);
    });
  }

  open() {
    if (this.selectedValue !== undefined) {
      const selectedOption = this.options.find(
        (option) => option.value === this.selectedValue,
      );
      if (selectedOption) {
        this.updateSelection(selectedOption);
      }
    }

    const positionStrategy = this.getOverlayPosition();
    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      hasBackdrop: true,
      backdropClass: "cdk-overlay-transparent-backdrop",
    });

    const portal = new TemplatePortal(
      this.optionTemplate,
      this.viewContainerRef,
    );
    this.overlayRef.attach(portal);

    this.isOpen = true;
    this.overlayRef.backdropClick().subscribe(() => this.close());
  }

  close() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.isOpen = false;
    }
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  getOverlayPosition(): PositionStrategy {
    return this.overlay
      .position()
      .flexibleConnectedTo(this.trigger)
      .withPositions([
        {
          originX: "start",
          originY: "bottom",
          overlayX: "start",
          overlayY: "top",
          offsetY: 8,
        },
        {
          originX: "start",
          originY: "top",
          overlayX: "start",
          overlayY: "bottom",
          offsetY: -8,
        },
      ]);
  }

  selectOption(option: InputSelectOptionComponent) {
    this.selectedValue = option.value;
    this.selectedViewValue = option.viewValue || option.getLabel();

    this.onChange(this.selectedValue); // notify Angular form control
    this.onTouched(); // mark as touched
    this.selectionChange.emit(this.selectedValue);

    this.updateSelection(option);
  }

  private updateSelection(selectedOption: InputSelectOptionComponent) {
    this.options.forEach((option) => {
      option.selected = option === selectedOption;
    });
  }

  writeValue(value: any): void {
    this.selectedValue = value;
    this.selectedViewValue = value;

    if (this.options && this.options.length > 0) {
      const selectedOption = this.options.find(
        (option) => option.value === value,
      );

      if (selectedOption) {
        this.selectedViewValue =
          selectedOption.viewValue || selectedOption.getLabel();
        this.updateSelection(selectedOption);
      } else {
        this.options.forEach((option) => (option.selected = false));
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnDestroy() {
    this.close();
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
