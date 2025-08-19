import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ConfigsTableComponent} from './components/configs-table/configs-table.component';
import {ManipulateConfigGroupsComponent} from './components/manipulate-config-groups/manipulate-config-groups.component';

@Component({
  selector: 'app-desktop-dashboard',
  imports: [ConfigsTableComponent, ManipulateConfigGroupsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
}
