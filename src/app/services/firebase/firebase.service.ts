import { Injectable, NgZone } from '@angular/core';
import {AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser, IUserCredentails } from 'src/app/shared/models/user-interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  userData: any;

  constructor(private firebase: AngularFireAuth, private router: Router, private ngZone: NgZone, private toaster: ToastrService) {
    // this.firebase.authState.subscribe( user => {
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     console.log("hello from constructor");
    //   } else {
    //     localStorage.setItem('user', null);
    //     JSON.parse(localStorage.getItem('user'));
    //   }
    // });
    this.firebase.onAuthStateChanged(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("user", user);
    
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  async onSignUp(credentials: IUserCredentails) {
    let {username, password} = credentials
    this.firebase.createUserWithEmailAndPassword(username, password).then(async (result) => {
      await this.sendEmailVerification();
      this.toaster.success("Check email to validate");
      this.ngZone.run(() => {
        this.router.navigate(['dashboard'])
      });
    }).catch((error) => {
      let {code, message } = error;
      console.log(code);
      this.toaster.error(message);
    });
  }

  login(credentials: IUserCredentails) {
    let { username, password } = credentials
    this.firebase.signInWithEmailAndPassword(username, password).then(result => {
      localStorage.setItem('user', JSON.stringify(result.user));
      this.toaster.success("Success");
      this.ngZone.run(() => {
        this.router.navigate(['dashboard'])
      });
    }).then().catch((error) => {
      console.log(error.message);
    });
  }

  sendEmailVerification() {
    this.firebase.currentUser.then(user => {
      user.sendEmailVerification();
    })
  }

  setUserData(user) {
    //  TODO: create firestore to hold userdata
  }

  signOut() {
    this.firebase.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
