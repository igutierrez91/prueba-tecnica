import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BalanceDirective } from './balance.directive';

@Component({
  template: `<span [appBalance] [amount]="value"></span>`
})
class TestComponent {
  value!: number;
}

describe('appBalance', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let spanEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, BalanceDirective]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    spanEl = fixture.debugElement.query(By.css('span'));
  });

  it('color must be red if value is negative', () => {
    component.value = -1;
    fixture.detectChanges();
    expect(spanEl.nativeElement.style.color).toBe('red');
  });

  it('color must be red green if value is positive', () => {
    component.value = 1;
    fixture.detectChanges();
    expect(spanEl.nativeElement.style.color).toBe('green');
  });

  it('should not set color if value is 0', () => {
    component.value = 0;
    fixture.detectChanges();
    expect(spanEl.nativeElement.style.color).toBe('');
  });
});