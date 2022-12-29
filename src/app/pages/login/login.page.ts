import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'app/_services/auth.service';
import { ICredentials } from 'app/interfaces/ApiCredentials';
import { IApiTokenResponse } from 'app/interfaces/ApiResponse';


export enum API_LOGIN_ERROR {
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    NULL = 'NULL',
}

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loginForm!: FormGroup;
    submitting: boolean = false;
    public loginError: API_LOGIN_ERROR = API_LOGIN_ERROR.NULL;
    public API_LOGIN_ERROR: typeof API_LOGIN_ERROR = API_LOGIN_ERROR;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private matSnackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.initForm();
    }

    public get fg() {
        return this.loginForm.controls;
    }

    initForm() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
            password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
        });
    }

    async onLogin() {
        this.submitting = true;
        if (this.loginForm.valid) {
            try {
                const credentials: ICredentials = this.loginForm.value;
                const response: IApiTokenResponse = await this.authService.login(credentials.email, credentials.password);
                const { token } = response.data;
                this.router.navigate(['/workspace/home']);
                this.openSnackBar('Vous avez été connecté avec succès');
            } catch (e: any) {
                this.loginError = e;
                this.openSnackBar('Une erreur est survenue', 'danger');
            }
        }
        this.submitting = false;
    }

    openSnackBar(message: string, type?: 'info' | 'success' | 'danger') {
        return this.matSnackBar.open(message, 'X', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: `maizi_snackBar_${type ? type : 'success'}`,
            duration: 2500,
        });
    }
}
