import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBalance]'
})
export class BalanceDirective implements OnChanges{
  @Input() amount!: number;
  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnChanges() {
    if (this.amount < 0) {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
    } else if (this.amount > 0) {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'green');
    }
  }
}
