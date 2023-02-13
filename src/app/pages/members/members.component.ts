import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Member } from 'src/app/models/member';
import { ExpensesService } from 'src/app/services/expenses.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  members!: Member[];
  memberForm: any;

  constructor(private expensesService: ExpensesService,  private fb: FormBuilder, private modalService: ModalService,
  private datePipe:DatePipe) {
    
  }
  
  
  ngOnInit(): void {
    this.getMembers();
  }

  addMember() {
    this.modalService.open();
    this.createMemberForm();
  }

  createMemberForm() {
    this.memberForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
    })
  }

  sendMember() {
    const value = this.memberForm.value;
    this.expensesService.postMember({
      name: value.name,
      registerDate: this.datePipe.transform(Date.now(),'dd/MM/yyyy') || '',
      id: Math.max(...this.members.map( m => m.id)) + 1
    });
    this.modalService.close();
    this.getMembers();
  }

  getMembers() {
    this.expensesService.getAllMembers().subscribe((data) => {
      console.log(data)
      this.members = data;
    })
  }




}
