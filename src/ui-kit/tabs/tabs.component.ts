import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {TabType} from "@/ui-kit/tabs/types/type/tab.type";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [
    NgForOf
  ],
  standalone: true
})
export class TabsComponent implements OnInit {

  // @Input()
  // config: {
  //   autoSelect: boolean
  // } = {
  //   autoSelect: true
  // }

  @Input()
  className: string = 'solid_v1'

  @Input()
  tabs: TabType[] = [
    {
      name: 'All',
    }
  ]

  @Input()
  selectedTab?: string;

  protected selTab: string;

  // todo также
  // private data: { send: number; receive: number; rate: number };
  //
  // @Input()
  // set payload(value: typeof this.data) {
  //   this.data = {
  //     send: roundDown(value.send, 2),
  //   };
  // }
  //
  // get payload(): typeof this.data {
  //   return this.data;
  // }

  @Output()
  selectTabEvent: EventEmitter<string> = new EventEmitter();

  selectTab(tabName: string) {
    if (this.selTab === tabName) return

    this.selTab = tabName

    if (tabName === 'All') {
      this.selectTabEvent.emit(undefined)
    } else
      this.selectTabEvent.emit(tabName)
  }

  ngOnInit() {
    if (!this.selectedTab) this.selTab = this.tabs[0].name

    if (this.selTab === 'All') return this.selectTabEvent.emit(undefined)
    else
      this.selTab = this.selectedTab!
      this.selectTabEvent.emit(this.selectedTab)
  }
}
