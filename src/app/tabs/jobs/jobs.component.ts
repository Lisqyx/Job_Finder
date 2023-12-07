import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/service/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  JobList: any[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    const jobsData = localStorage.getItem('jobs');
    if (jobsData) {
      this.JobList = JSON.parse(jobsData);
    }
  }
  //Just a way for the bookmark fas-fa to work
  toggleBookmark(job: any): void {
    job.bookmarked = !job.bookmarked;
  }
  //DELETE THEM ALL!!!
  deleteJob(job: any): void {
    if (this.jobService.isEmployerByJobID(job)) {
      this.jobService.deleteJobByJobID(job.JobID);
      this.loadJobs();
    } else {
      console.error('User not authorized to delete this job.');
    }
  }
  //Is this the employer who created said job? if so, they will be able to delete it
  canDelete(job: any): boolean {
    return this.jobService.isEmployerByJobID(job);
  }
}
