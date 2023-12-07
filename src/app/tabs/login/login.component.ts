import { Component } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(private jobService: JobService, private router: Router){}

  ngOnInit(): void {}
  //onLogin click Function
  onLogin() {
    const jobseekerData = this.jobService.getJobseekerUsers() || [];
    const employerData = this.jobService.getEmployerUsers() || [];
    //testing console logs to see what the hell is wrong
    console.log('Login Obj:', this.loginObj);
    console.log('Jobseeker Data:', jobseekerData);
    console.log('Employer Data:', employerData);
  
    const foundJobseeker = jobseekerData.find(user => user.Email === this.loginObj.Email && user.Password === this.loginObj.Password);
    const foundEmployer = employerData.find(user => user.Email === this.loginObj.Email && user.Password === this.loginObj.Password);
    //testing console logs to see what the hell is wrong
    console.log('Found Jobseeker:', foundJobseeker);
    console.log('Found Employer:', foundEmployer);
  
    if (foundJobseeker) {
      // Will log as the jobseeker
      console.log('Jobseeker login successful');
      this.jobService.setLoggedInUser({ ...foundJobseeker, Role: 'jobseeker' });
      this.router.navigate(['/home']);
    } else if (foundEmployer) {
      // Will log as an employer
      console.log('Employer login successful');
      this.jobService.setLoggedInUser({ ...foundEmployer, Role: 'employer' });
      this.router.navigate(['/home']);
    } else {
      // Why you no register yet
      console.log('Login failed');
      alert('Login failed. Please check your email and password and try again.');
    }
  }
}