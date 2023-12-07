import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from 'src/app/service/job.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loggedInUser: any;

  constructor(private jobService: JobService, private router: Router) {}
  //Will check the "role" if they are a job seeker or employer
  ngOnInit(): void {
    this.loggedInUser = this.jobService.getLoggedInUser();
    if (!this.loggedInUser) {
      this.router.navigate(['/login']);
    }
  }
}
