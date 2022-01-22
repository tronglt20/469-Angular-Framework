import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/modules/shared/models/register.model';
import { SharedService } from 'src/app/modules/shared/services/shared.services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  constructor(private service: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl(''),
    });
  }

  public validateControl = (controlName: string) => {
    return (
      this.registerForm.controls[controlName].invalid &&
      this.registerForm.controls[controlName].touched
    );
  };
  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  };

  public registerUser = (registerFormValue) => {
    const formValues = { ...registerFormValue };
    if (formValues.password !== formValues.confirm) {
      console.log("Wrong confirmation password")
      return;
    }
    const user: RegisterModel = {
      userName: formValues.userName,
      email: formValues.email,
      password: formValues.password,
    };
    this.service.post<RegisterModel>('accounts/register', user).subscribe({
      next: (result) => {
        console.log('register success');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  };
}
