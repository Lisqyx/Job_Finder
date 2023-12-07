import { Component } from '@angular/core';
import { JobService } from './service/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private jobService: JobService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.jobService.isAuthenticated();
  }

  getUserName(): string {
    const user = this.jobService.getLoggedInUser();
    return user ? (user.Role === 'jobseeker' ? user.FullName : user.CompanyName) : '';
  }

  get loggedInUser() {
    return this.jobService.getLoggedInUser();
  }

  onLogout() {
    this.jobService.setLoggedInUser(null);
    this.router.navigate(['/login']);
  }
}
