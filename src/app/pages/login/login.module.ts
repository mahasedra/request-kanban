import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login.page';
// Material imports
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
const material = [MatProgressBarModule, MatSnackBarModule];

const routes: Routes = [{ path: '', component: LoginPage }];
@NgModule({
    imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule.forChild(routes), ...material],
    declarations: [LoginPage],
    exports: [RouterModule],
})
export class LoginPageModule {}
