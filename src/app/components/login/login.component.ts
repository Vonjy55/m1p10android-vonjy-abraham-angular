import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    if(authService.isLoggedIn())
      router.navigate(['entrees'])


    let email:String[] = ['admin@mail.com'];
    let pswrd:String[] = ['123456'];

    this.route.queryParams.subscribe(params => {
        email = [params['email']] || [''];
        pswrd = [params['password']] || ['']
    });

    this.loginForm = this.formBuilder.group({
      email: email,
      password: pswrd,
    });

  }
  ngOnInit() {}
  loginUser() {
    this.authService.login(this.loginForm.value);
    console.log('logged in');

  }
}
