import { JobDetailsComponent } from './../job-details/job-details.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobService } from 'src/app/service/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  JobList: any[] = [];
  loggedInUser: any;

  constructor(public jobService: JobService, public modalService: NgbModal, public router: Router) {}

  ngOnInit(): void {
    this.loggedInUser = this.jobService.getLoggedInUser();
    this.loadJobs();
  }

  loadJobs(): void {
    const jobsData = localStorage.getItem('jobs');
    if (jobsData) {
      this.JobList = JSON.parse(jobsData);
      // If the logged-in user is an employer, filter jobs created by that employer
      if (this.jobService.isEmployer(this.loggedInUser)) {
        this.JobList = this.JobList.filter(job => job.CompanyName === this.loggedInUser.CompanyName);
      }
    }
  }

  applyForJob(job: any): void {
    // Implement the logic for applying to a job
    // For example, you can add the logged-in user to the job's applicants array
    const loggedInUser = this.jobService.getLoggedInUser();
  
    if (loggedInUser && this.jobService.isJobseeker(loggedInUser)) {
      job.applicants = job.applicants || [];
      job.applicants.push(loggedInUser); // Push the entire loggedInUser object
      localStorage.setItem('jobs', JSON.stringify(this.JobList));
    }
  }

  // Just a way for the bookmark fas-fa to work
  toggleBookmark(job: any): void {
    job.bookmarked = !job.bookmarked;
  }

  // DELETE THEM ALL!!!
  deleteJob(job: any): void {
    if (this.jobService.isEmployerByJobID(job)) {
      this.jobService.deleteJobByJobID(job.JobID);
      this.loadJobs();
    } else {
      console.error('User not authorized to delete this job.');
    }
  }

  // Is this the employer who created said job? if so, they will be able to delete it
  canDelete(job: any): boolean {
    return this.jobService.isEmployerByJobID(job);
  }

  // Filter jobs based on the logged-in employer
  getFilteredJobs(): any[] {
    if (this.jobService.isEmployer(this.loggedInUser)) {
      return this.JobList.filter(job => job.CompanyName === this.loggedInUser.CompanyName);
    }
    return this.JobList;
  }

  openJobDetailsModal(job: any) {
    const modalRef = this.modalService.open(JobDetailsComponent, { size: 'lg' });
    modalRef.componentInstance.jobDetails = job;
  }

  viewJobDetails(job: any): void {
    this.router.navigate(['/job-detail', job.JobID]);
  }

  canApply(job: any): boolean {
    const loggedInUser = this.jobService.getLoggedInUser();
    return (
      this.jobService.isJobseeker(loggedInUser) &&
      !this.jobService.hasUserAppliedForJob(loggedInUser, job)
    );
  }
}
