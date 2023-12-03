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
    EmployerID: '',
    CompanyName: '',
    Email: '',
    MobileNo: '',
    PhoneNo: '',
    Password: '',
    CompanyAddress: '',
    CompanyDescription: '',
    City: '',
    State: '',
    LogoURL: ''
  };

  jobseekerUsers: any[] = []
  jobseekerObj: any = {
    "JobSeekerID" : 0,
    "FullName": "",
    "Email": "",
    "MobileNo": "",
    "ExperienceStatus": "",
    "ResumeURL":  ""
  }

  isJobseeker: boolean = true;

  constructor(){}

  ngOnInit(): void {}
  
  onRegisterEmployer(){
    this.employerUsers.push(this.employerObj);
    localStorage.setItem('employerUsers',JSON.stringify(this.employerUsers))
  }

  onRegisterJobSeeker(){
    this.jobseekerUsers.push(this.jobseekerObj);
    localStorage.setItem('jobseekerUsers',JSON.stringify(this.jobseekerUsers))
  }
}
