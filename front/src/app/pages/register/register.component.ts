import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { nameValidator } from '../../guards/custom-validators';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerUserData = new FormGroup({
    identifiant: new FormControl('', [Validators.required, nameValidator]),
    password: new FormControl(),
    intro: new FormControl(),
    email: new FormControl(),
    phone: new FormControl()
  });

  constructor(private registrationService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    if (!this.registerUserData.valid) {
      Swal.fire('invalid or taken name, please choose another name')
      return false;
    } else {
      const user = this.registerUserData.value;
      this.registrationService.registerUser(user).subscribe(
        result => {
          const token = result['token'];
          localStorage.setItem('token', token);
          this.router.navigateByUrl('/dashboard/home');
        },
        err => {
          Swal.fire(err.error);
        });
    }
  }
}
