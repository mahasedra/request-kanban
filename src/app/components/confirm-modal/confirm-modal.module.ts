import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// MAT import
import { MatIconModule } from '@angular/material/icon';
import { ConfirmModalComponent } from './confirm-modal.component';
const material = [MatIconModule,];

@NgModule({
    declarations: [ConfirmModalComponent],
    imports: [CommonModule, FormsModule, RouterModule, ...material],
    exports: [ConfirmModalComponent],
})
export class ConfirmModalComponentModule { }