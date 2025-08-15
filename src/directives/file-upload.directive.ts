import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, inject } from "@angular/core";

@Directive({
  selector: '[fileUpload]',
  standalone: true
})
export class FileUploadDirective {
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);

  @Output() fileSelected: EventEmitter<File[]> = new EventEmitter();

  @Input() accept: string = '';
  @Input() multiple: boolean = false;

  private readonly inputElement: HTMLInputElement;

  constructor() {
    this.inputElement = this.renderer.createElement('input');
    this.renderer.setAttribute(this.inputElement, 'type', 'file');
    this.renderer.setStyle(this.inputElement, 'display', 'none');
    this.renderer.appendChild(this.el.nativeElement, this.inputElement);
  }

  ngOnInit() {
    if (this.accept) {
      this.renderer.setAttribute(this.inputElement, 'accept', this.accept);
    }
    if (this.multiple) {
      this.renderer.setAttribute(this.inputElement, 'multiple', 'true');
    }
  }

  @HostListener('click') onClick() {
    this.inputElement.click();
  }

  @HostListener('change', ['$event.target.files']) onChange(files: FileList) {
    if (files && files.length > 0) {
      this.fileSelected.emit(Array.from(files));
    }
  }
}
