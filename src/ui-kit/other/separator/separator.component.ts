import { NgStyle } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-separator",
  templateUrl: "./separator.component.html",
  styleUrls: ["./separator.component.scss"],
  imports: [NgStyle],
  standalone: true,
})
export class SeparatorComponent {
  @Input()
  variant: "horizontal" | "vertical" = "horizontal";

  @Input()
  color: string = "white";
}
