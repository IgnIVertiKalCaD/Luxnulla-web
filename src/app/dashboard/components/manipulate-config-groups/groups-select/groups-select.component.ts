import { ChangeDetectionStrategy, Component } from '@angular/core';
import {TuiChevron, TuiDataListWrapperComponent, TuiSelectDirective, TuiTooltip} from '@taiga-ui/kit';
import {
  TuiIcon,
  TuiLabel,
  TuiTextfieldComponent,
  TuiTextfieldDropdownDirective,
  TuiTextfieldOptionsDirective
} from '@taiga-ui/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-groups-select',
  imports: [
    TuiDataListWrapperComponent,
    TuiTextfieldDropdownDirective,
    TuiSelectDirective,
    TuiTextfieldComponent,
    TuiLabel,
    TuiChevron,
    TuiTextfieldOptionsDirective,
    FormsModule,
    TuiIcon,
    TuiTooltip
  ],
  templateUrl: './groups-select.component.html',
  styleUrl: './groups-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsSelectComponent {
  protected readonly users = [
    'Dmitriy Demenskiy',
    'Alex Inkin',
    'Vladimir Potekhin',
    'Nikita Barsukov',
    'Maxim Ivanov',
    'German Panov',
  ];

  protected value: string | null = null;
}
