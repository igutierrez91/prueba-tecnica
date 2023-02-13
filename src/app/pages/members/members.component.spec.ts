import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberCardComponent } from 'src/app/components/member-card/member-card.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { OrderByPipe } from 'src/app/pipes/order-by.pipe';

import { MembersComponent } from './members.component';

describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersComponent, ModalComponent, MemberCardComponent, OrderByPipe],
      providers: [DatePipe, OrderByPipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
