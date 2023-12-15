import { Component } from '@angular/core';
import { JobService } from 'src/app/service/job.service';
import { v4 as uuidv4 } from 'uuid';

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
  
onRegisterEmployer() {
  const existingEmployerData = this.jobService.getEmployerUsers() || [];
  const uniqueID = uuidv4();
  this.employerObj.id = uniqueID; // Assign unique ID
  existingEmployerData.push(this.employerObj);
  this.jobService.setEmployerUsers(existingEmployerData);
  localStorage.setItem('employerUsers', JSON.stringify(existingEmployerData));

  console.log('Employer data after registration:', existingEmployerData);

    this.employerObj = {
      id: '',
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
  }

  onRegisterJobSeeker() {
    const existingJobseekerData = this.jobService.getJobseekerUsers() || [];
    const uniqueID = uuidv4();
    this.jobseekerObj.id = uniqueID; // Assign unique ID
    existingJobseekerData.push(this.jobseekerObj);
    this.jobService.setJobseekerUsers(existingJobseekerData);
    localStorage.setItem('jobseekerUsers', JSON.stringify(existingJobseekerData));

    console.log('Jobseeker data after registration:', existingJobseekerData);

    this.jobseekerObj = {
      id: '',
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
