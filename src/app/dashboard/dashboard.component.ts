import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ConfigsListComponent} from './components/configs-list/configs-list.component';
import {ManipulateConfigGroupsComponent} from './components/manipulate-config-groups/manipulate-config-groups.component';

@Component({
  selector: 'app-desktop-dashboard',
  imports: [ConfigsListComponent, ManipulateConfigGroupsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
}
