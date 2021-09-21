import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.firebaseService.login(form.value);
  }
}
