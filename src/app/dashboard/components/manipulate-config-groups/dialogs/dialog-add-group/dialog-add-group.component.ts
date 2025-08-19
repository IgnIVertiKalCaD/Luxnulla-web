import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  tuiCreateLuhnValidator,
  TuiInputCard,
  TuiInputCVC,
  TuiInputExpire,
} from '@taiga-ui/addon-commerce';
import {
  TuiAlertService, TuiAppearance, TuiButton,
  TuiError, TuiHintDirective, TuiIcon,
  TuiTextfield
} from '@taiga-ui/core';
import {TuiFieldErrorPipe, TuiTooltip} from '@taiga-ui/kit';
import {TuiForm} from '@taiga-ui/layout';

@Component({
  selector: 'app-dialog-add-group',
  imports: [
    ReactiveFormsModule,
    TuiTextfield,
    FormsModule,
    TuiIcon,
    TuiTooltip,
    TuiButton,
    TuiForm,
  ],
  templateUrl: './dialog-add-group.component.html',
  styleUrl: './dialog-add-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogAddGroupComponent {
  private readonly alerts = inject(TuiAlertService);

  protected readonly form = new FormGroup({
    name: new FormControl('',),
    payload: new FormControl(''),
  });
}
