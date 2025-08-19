import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';
import {TuiButton, tuiDialog, TuiDropdownService} from '@taiga-ui/core';
import {DialogAddGroupComponent} from './dialogs/dialog-add-group/dialog-add-group.component';
import {GroupsSelectComponent} from './groups-select/groups-select.component';

@Component({
  selector: 'app-manipulate-config-groups',
  imports: [
    TuiButton,
    GroupsSelectComponent
  ],
  templateUrl: './manipulate-config-groups.component.html',
  styleUrl: './manipulate-config-groups.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManipulateConfigGroupsComponent {
  private readonly dialogAddGroup = tuiDialog(DialogAddGroupComponent, {
    dismissible: true,
    label: 'Add group',
  });

  protected showDialogAddGroup(): void {
    this.dialogAddGroup().subscribe();
  }

  protected showDialogEditGroup(): void {
    this.dialogAddGroup().subscribe();
  }
}
