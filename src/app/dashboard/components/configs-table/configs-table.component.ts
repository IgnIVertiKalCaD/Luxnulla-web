import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {TuiScrollable, TuiScrollbar} from "@taiga-ui/core";
import {
  TuiTable,
  TuiTableCell,
  TuiTableDirective,
  TuiTableHead,
  TuiTableTbody,
  TuiTableTd,
  TuiTableTh, TuiTableThGroup, TuiTableTr
} from "@taiga-ui/addon-table";
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {DecodeUrlPipe} from '../../../constructor/pipes/decode-url.pipe';
import {DashboardService} from '../../dashboard.service';

@Component({
  selector: 'app-configs-table',
    imports: [
      AsyncPipe, TuiTable, TuiScrollable,
      TuiScrollbar, CdkFixedSizeVirtualScroll,
      CdkVirtualForOf,
      CdkVirtualScrollViewport, DecodeUrlPipe
    ],
  templateUrl: './configs-table.component.html',
  styleUrl: './configs-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigsTableComponent {
  private readonly dashboardService = inject(DashboardService);

  protected readonly configs$ = this.dashboardService.getConfigs();

  protected readonly columns = ['name', 'protocol', 'transport', 'address']
}
