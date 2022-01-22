import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { LoginModel } from 'src/app/modules/shared/models/login.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public validateControl = (controlName: string) => {
    return (
      this.loginForm.controls[controlName].invalid &&
      this.loginForm.controls[controlName].touched
    );
  };
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  onSubmit = (registerFormValue) => {
    const formValues = { ...registerFormValue };
    const user: LoginModel = {
      email: formValues.email,
      password: formValues.password,
    };
    this.authenticationService
      .login(user)
      .pipe(first())
      .subscribe({
        next: (result) => {
          console.log('success');
          this.router.navigate(["/home"]);
        },
        error: (error) => {
          console.log(error);
        },
      });
  };
}
