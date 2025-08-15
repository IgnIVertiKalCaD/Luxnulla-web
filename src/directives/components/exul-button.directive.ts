import {Directive, HostBinding, Input} from "@angular/core";

@Directive({
  standalone: true,
  selector: "button[exulButton]",
})
export class ExulButtonDirective {
  @Input("exulVariant") variant: "contained" | "outlined" | "text" =
    "contained";
  @Input("exulColor") color: "primary" | "secondary" = "primary";

  @HostBinding("attr.type") type = "button";
  @HostBinding("class.exul-button") base = true;

  @HostBinding("class.exul-contained") get c1() {
    return this.variant === "contained";
  }

  @HostBinding("class.exul-outlined") get c2() {
    return this.variant === "outlined";
  }

  @HostBinding("class.exul-text") get c3() {
    return this.variant === "text";
  }

  @HostBinding("class.exul-primary") get c4() {
    return this.color === "primary";
  }

  @HostBinding("class.exul-secondary") get c5() {
    return this.color === "secondary";
  }
}
