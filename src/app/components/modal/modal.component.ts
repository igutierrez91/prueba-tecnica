import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  display$!: Observable<string>;
  ​
    constructor(
        private modalService: ModalService
    ) {}
  ​
    ngOnInit() {
      this.display$ = this.modalService.watch();
    }
  ​
    close() {
      this.modalService.close();
    }
}
