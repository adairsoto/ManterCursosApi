import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CursosapiService } from './cursosapi.service';
import { Admin } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser$: Observable<Admin>;

  constructor(private service: CursosapiService) { }

  ngOnInit() {
    this.currentUser$ = this.service.currentUser$;
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.service.loadCurrentUser(token).subscribe(() => {
        console.log('loaded user');
      }, error => {
        console.log(error);
      });
    }
  }

  logout() {
    this.service.logout();
  }
}


