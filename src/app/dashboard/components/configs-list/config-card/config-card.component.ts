import {ChangeDetectionStrategy, Component, input, signal} from '@angular/core';
import {XrayClientConfig} from '../../../types/rdo/configs.rdo';
import {TuiCardCollapsed, TuiCardLarge, TuiCardRow, TuiHeader} from '@taiga-ui/layout';
import {TuiButton, TuiIcon, TuiLink, TuiTitle} from '@taiga-ui/core';
import {DecodeUrlPipe} from '../../../../constructor/pipes/decode-url.pipe';
import {TuiBadge, TuiChevron} from '@taiga-ui/kit';
import {TuiExpand} from '@taiga-ui/experimental';
import {TuiTableDirective, TuiTableTd, TuiTableTh} from '@taiga-ui/addon-table';

@Component({
  selector: 'app-config-card',
  imports: [
    TuiCardCollapsed,
    TuiCardLarge,
    TuiHeader,
    TuiTitle,
    DecodeUrlPipe,
    TuiLink,
    TuiCardRow,
    TuiIcon,
    TuiButton,
    TuiBadge,
    TuiChevron,
    TuiExpand,
    TuiTableDirective,
    TuiTableTh,
    TuiTableTd
  ],
  templateUrl: './config-card.component.html',
  styleUrl: './config-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigCardComponent {
  public readonly collapsed = signal(true);

  public readonly config = input.required<XrayClientConfig>()
  public readonly index = input.required<number>()
}
