import { Component } from '@angular/core';
import { JobService } from 'src/app/service/job.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  employerUsers: any[] = []
  employerObj:any = {
    "CompanyName": '',
    "Email": '',
    "MobileNo": '',
    "PhoneNo": '',
    "Password": '',
    "CompanyAddress": '',
    "CompanyDescription": '',
    "City": '',
    "State": '',
    "LogoURL": ''
  };

  jobseekerUsers: any[] = []
  jobseekerObj: any = {
    "FullName": "",
    "Email": "",
    "Password": "",
    "MobileNo": "",
    "ExperienceStatus": "",
    "ResumeURL":  ""
  };

  isJobseeker: boolean = true;

  constructor(private jobService: JobService){}

  ngOnInit(): void {

    const localEmployerData = localStorage.getItem('employerUsers');
    if (localEmployerData !== null) {
      this.jobService.setEmployerUsers(JSON.parse(localEmployerData));
    }

    const localData = localStorage.getItem('jobseekerUsers');
    if (localData !== null) {
      this.jobService.setJobseekerUsers(JSON.parse(localData));
  }
}
  
  onRegisterEmployer(){
    const existingEmployerData = this.jobService.getEmployerUsers() || [];
    existingEmployerData.push(this.employerObj);
    this.jobService.setEmployerUsers(existingEmployerData);
    localStorage.setItem('employerUsers', JSON.stringify(existingEmployerData));

    console.log('Employer data after registration:', existingEmployerData);

    this.employerObj = {
      "CompanyName": '',
      "Email": '',
      "MobileNo": '',
      "PhoneNo": '',
      "Password": '',
      "ConfirmPassword":"",
      "CompanyAddress": '',
      "CompanyDescription": '',
      "City": '',
      "State": '',
      "LogoURL": ''
    };
  };

  onRegisterJobSeeker(){
    const existingJobseekerData = this.jobService.getJobseekerUsers() || [];
    existingJobseekerData.push(this.jobseekerObj);
    this.jobService.setJobseekerUsers(existingJobseekerData);
    localStorage.setItem('jobseekerUsers', JSON.stringify(existingJobseekerData));

    console.log('Jobseeker data after registration:', existingJobseekerData);
    
    this.jobseekerObj = {
      "FullName": "",
      "Email": "",
      "Password": "",
      "ConfirmPassword":"",
      "MobileNo": "",
      "ExperienceStatus": "Select Experience Status",
      "ResumeURL":  ""
    };
  }
}
