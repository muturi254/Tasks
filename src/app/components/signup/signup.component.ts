import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.firebaseService.onSignUp(form.value);
  }
}
