import { AsyncPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TuiFormatNumberPipe } from '@taiga-ui/core';
import { TuiTable } from '@taiga-ui/addon-table';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-desktop-dashboard',
  imports: [AsyncPipe, TuiFormatNumberPipe, TuiTable],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  private readonly dashboardService = inject(DashboardService);

  protected readonly configs$ = this.dashboardService.getConfigs();

  Object = Object;
}
