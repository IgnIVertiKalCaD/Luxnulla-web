import {NgForOf, NgIf} from "@angular/common";
import {CdkMenuTrigger} from "@angular/cdk/menu";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {SeparatorComponent} from "@/ui-kit/other/separator/separator.component";
import {IconComponent} from "@/components/icon/icon.component";

interface CalendarDate {
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isInRange: boolean;
}

@Component({
  selector: 'app-date-range-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    IconComponent,
    SeparatorComponent,
    CdkMenuTrigger
  ],
  templateUrl: './date-range-input.component.html',
  styleUrl: './date-range-input.component.scss'
})
export class DateRangeInputComponent {
  private elementRef = inject(ElementRef);

  constructor() {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();

    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  @ViewChild(CdkMenuTrigger)
  menuTrigger!: CdkMenuTrigger;

  @Output() dateRangeSelected =
    new EventEmitter<{ start: Date; end: Date }>();

  @Output() dateSelected =
    new EventEmitter<Date>();

  @Input()
  mode: 'single' | 'multi' = "multi";

  currentMonth: number;
  currentYear: number;
  weeks: CalendarDate[][] = [];

  startDate: Date | null = new Date();
  endDate: Date | null = null;

  isStartDate(date: Date): boolean {
    return !!this.startDate && this.isSameDate(date, this.startDate);
  }

  isEndDate(date: Date): boolean {
    return !!this.endDate && this.isSameDate(date, this.endDate);
  }

  generateCalendar(month: number, year: number) {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const calendarDays: CalendarDate[][] = [];
    let date = 1;
    let nextMonthDate = 1;

    for (let i = 0; i < 6; i++) {
      const week: CalendarDate[] = [];
      for (let j = 0; j < 7; j++) {
        let dayDate: Date;
        let isCurrentMonth = true;

        // Определяем дату для текущей ячейки
        if (i === 0 && j < (firstDayOfMonth || 7) - 1) {
          // Предыдущий месяц
          dayDate = new Date(year, month - 1, daysInPrevMonth - ((firstDayOfMonth || 7) - 2 - j));
          isCurrentMonth = false;
        } else if (date > daysInCurrentMonth) {
          // Следующий месяц
          dayDate = new Date(year, month + 1, nextMonthDate++);
          isCurrentMonth = false;
        } else {
          // Текущий месяц
          dayDate = new Date(year, month, date++);
        }

        const isSelected = this.isSelected(dayDate);
        const isInRange = this.isInRange(dayDate);

        week.push({
          date: dayDate,
          isCurrentMonth,
          isSelected,
          isInRange,
        });
      }
      calendarDays.push(week);
    }

    this.weeks = calendarDays;
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentYear--;
      this.currentMonth = 11;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentYear++;
      this.currentMonth = 0;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  selectDate(date: Date) {
    if(this.mode === 'single')  {
      this.startDate = date;

      this.generateCalendar(this.currentMonth, this.currentYear);

      return this.emitDateRange()
    }

    if (!this.startDate || (this.startDate && this.endDate)) {
      this.startDate = date;
      this.endDate = null;
    } else if (this.startDate && !this.endDate) {
      if (date >= this.startDate) {
        this.endDate = date;
      } else {
        this.endDate = this.startDate;
        this.startDate = date;
      }

      this.emitDateRange();
    }
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  isSelected(date: Date): boolean {
    const isStartDate = this.startDate && this.isSameDate(date, this.startDate);
    const isEndDate = this.endDate && this.isSameDate(date, this.endDate);
    return !!(isStartDate || isEndDate);
  }

  isInRange(date: Date): boolean {
    if (this.startDate && this.endDate) {
      return date > this.startDate && date < this.endDate;
    }
    return false;
  }

  get formattedDateRange(): string {
    const start = this.formatDateUserView(this.startDate ?? new Date());

    if(this.endDate) {
      const end = this.formatDateUserView(this.endDate);

      return `${start} - ${end}`;
    }

    if(this.mode === 'single') return start;

    return `${start} -`;
  }

  isSameDate(d1: Date, d2: Date): boolean {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  private formatDateUserView(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {month: 'short', day: 'numeric'};
    return date.toLocaleDateString('en-US', options);
  }

  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    return `${day}.${month}.${date.getFullYear()}`;
  }

  emitDateRange() {
    if(this.startDate && this.mode === "single") {
      this.dateSelected.emit(this.startDate);

      this.menuTrigger.close()
    }

    if (this.startDate && this.endDate) {
      this.dateRangeSelected.emit({start: this.startDate, end: this.endDate});

      this.menuTrigger.close()
    }
  }

  getMonthName(monthIndex: number): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
  }

  close() {
    this.menuTrigger.close()
  }
}
