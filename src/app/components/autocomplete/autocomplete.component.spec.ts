import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutocompleteComponent } from './autocomplete.component';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteComponent ],
      imports: [FormsModule,ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('suggest function  filter options correctly', () => {
    const component = new AutocompleteComponent();
    component.options = [{ label: 'Israel' }, { label: 'Fernando'}];
    component.value = 'Is';
    component.suggest();
    expect(component.suggestions).toEqual([{ label: 'Israel' }]);
  });
});
