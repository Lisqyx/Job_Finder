import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from 'src/app/service/job.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  loggedInUser: any;
  jobDetails: any;
  jobApplicants: any[] = [];

  constructor(public route: ActivatedRoute, public jobService: JobService) {}

  ngOnInit(): void {
    this.loggedInUser = this.jobService.getLoggedInUser();
    this.route.params.subscribe(params => {
      const jobId = params['id'];
      this.jobDetails = this.jobService.getJobDetails(jobId);
      this.jobApplicants = this.jobService.getJobApplicants(this.jobDetails.JobID);
    });
  }

  getJobApplicantsDetails(applicantIds: string[]): any[] {
    const users = this.jobService.getJobseekerUsers();
    return applicantIds.map(applicantId => {
      const user = users.find(u => u.ID === applicantId);
      return user ? { FullName: user.FullName, PhoneNo: user.PhoneNo } : null;
    });
  }
}
