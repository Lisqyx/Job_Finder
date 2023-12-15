import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from 'src/app/service/job.service';
//installed the unique ID Identifier for JOBID
import { v4 as uuidv4 } from 'uuid'; //


@Component({
  selector: 'app-create-new-job',
  templateUrl: './create-new-job.component.html',
  styleUrls: ['./create-new-job.component.scss']
})
export class CreateNewJobComponent implements OnInit {
  jobObj: any = {
    "JobID": "",
    "JobTitle": "",
    "CreatedDate": new Date(),
    "CompanyName": "",
    "JobCategory": "",
    "JobExperience": "",
    "Salary": "",
    "CompanyAddress": "",
    "JobDescription": "",
    "LogoURL": ""
  };

  constructor(private router: Router, private jobService: JobService) {}

  ngOnInit(): void {
    const loggedInUser = this.jobService.getLoggedInUser();
    if (loggedInUser && loggedInUser.Role === 'employer') {
      this.jobObj.CompanyName = loggedInUser.CompanyName;
    }
  }
  //Will Create the Job and give it a unique id so it can be different than the rest (only because I don't know how to make this primary key increment work)
  createJob() {
    let jobs: any[] = JSON.parse(localStorage.getItem('jobs') || '[]');
    this.jobObj.JobID = uuidv4();
    this.jobObj.applicants = []; // Initialize as an empty array for the applicants
    jobs.push(this.jobObj);
    localStorage.setItem('jobs', JSON.stringify(jobs));
    this.router.navigate(['/home']);
  }
}