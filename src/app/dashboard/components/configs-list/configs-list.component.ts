import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {TuiScrollable, TuiScrollbar} from '@taiga-ui/core';
import {DashboardService} from '../../dashboard.service';
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport, ScrollingModule} from '@angular/cdk/scrolling';
import {ConfigCardComponent} from './config-card/config-card.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-configs-list',
  imports: [
    TuiScrollbar,
    TuiScrollable,
    ConfigCardComponent,
    AsyncPipe,
    ScrollingModule
  ],
  templateUrl: './configs-list.component.html',
  styleUrl: './configs-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigsListComponent {
  private readonly dashboardService = inject(DashboardService);

  protected readonly configs$ = this.dashboardService.getConfigs();

}
