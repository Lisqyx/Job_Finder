import { Component } from '@angular/core';
import { JobService } from 'src/app/service/job.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginObj: any = {
    "Email": '',
    "Password": ''
  }

  isJobseeker: boolean = true;

  constructor(private jobService: JobService){}

  ngOnInit(): void {
    
  }

  onLogin() {
    const jobseekerData = this.jobService.getJobseekerUsers() || [];
    const employerData = this.jobService.getEmployerUsers() || [];

    const foundJobseeker = jobseekerData.find(user => user.Email === this.loginObj.Email && user.Password === this.loginObj.Password);
    const foundEmployer = employerData.find(user => user.Email === this.loginObj.Email && user.Password === this.loginObj.Password);


    if (foundJobseeker) {
      // Login as jobseeker
      console.log('Jobseeker login successful');
    } else if (foundEmployer) {
      // Login as employer
      console.log('Employer login successful');
    } else {
      // No match found
      console.log('Login failed');
    }
  }

}
