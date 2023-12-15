import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//Storage, MOAR STORAGE
export class JobService {
  jobseekerUsers: any[] = [];
  employerUsers: any[] = [];
  loggedInUser: any;

  constructor() {
    this.loadLoggedInUser();
    this.loadJobseekerUsers();
    this.loadEmployerUsers();
  }

  setJobseekerUsers(data: any[]) {
    this.jobseekerUsers = data;
    localStorage.setItem('jobseekerUsers', JSON.stringify(data));
  }

  getJobseekerUsers() {
    return this.jobseekerUsers;
  }

  setEmployerUsers(data: any[]) {
    this.employerUsers = data;
    localStorage.setItem('employerUsers', JSON.stringify(data));
  }

  getEmployerUsers() {
    return this.employerUsers;
  }

  setLoggedInUser(user: any) {
    this.loggedInUser = user;
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }
  //Just to know which user to remember so if the page is refreshed, it will remember who was logged in
  getLoggedInUser() {
    return this.loggedInUser;
  }
  //Will check if the user is authenticated, if they are not then they will not go in homepage
  isAuthenticated(): boolean {
    return !!this.getLoggedInUser();
  }

  //Will load the data for jobseekers so it will stay despite the page being refreshed, this was very frustrating
  loadJobseekerUsers() {
    const localData = localStorage.getItem('jobseekerUsers');
    this.jobseekerUsers = localData ? JSON.parse(localData) : [];
  }

  //Will load the data for employers so it will stay despite the page being refreshed, this was very frustrating
  loadEmployerUsers() {
    const localData = localStorage.getItem('employerUsers');
    this.employerUsers = localData ? JSON.parse(localData) : [];
  }

  //Same as the other two
  loadLoggedInUser() {
    const userData = localStorage.getItem('loggedInUser');
    this.loggedInUser = userData ? JSON.parse(userData) : null;
  }
  //This will delete the job
  deleteJobByJobID(jobId: string): void {
    let jobs: any[] = JSON.parse(localStorage.getItem('jobs') || '[]');
  
    const filteredJobs = jobs.filter(job => job.JobID !== jobId);
  
    localStorage.setItem('jobs', JSON.stringify(filteredJobs));
  }
  
  //This will check if the employer is the person who created the card or the job so it can appear, else it will not
  isEmployerByJobID(job: any): boolean {
    return (
      this.isAuthenticated() &&
      this.loggedInUser.Role === 'employer' &&
      this.loggedInUser.CompanyName === job.CompanyName
    );
  }

  isEmployer(user: any): boolean {
    return user && user.Role === 'employer';
  }

  getJobDetails(jobId: string): any {
    const jobs: any[] = JSON.parse(localStorage.getItem('jobs') || '[]');
    return jobs.find(job => job.JobID === jobId);
  }

  applyForJob(job: any): void {
    const loggedInUser = this.getLoggedInUser();
    
    // Check if the user has already applied for this job
    if (!this.hasUserAppliedForJob(loggedInUser, job)) {
      const jobApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
      jobApplications.push({ jobId: job.JobID, applicant: loggedInUser });
      localStorage.setItem('jobApplications', JSON.stringify(jobApplications));
  
      // Update the 'applied' property of the job
      job.applied = true;
  
      // Save the jobs back to local storage
      localStorage.setItem('jobs', JSON.stringify(this.getJobs()));
    }
  }

  getJobs(): any[] {
    return JSON.parse(localStorage.getItem('jobs') || '[]');
  }

  getJobApplicants(jobId: string): any[] {
    const jobApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    const users = this.getJobseekerUsers(); // Assume jobseeker users are stored in localStorage
    return jobApplications
      .filter((application: { jobId: string, applicant: any }) => application.jobId === jobId)
      .map((application: { jobId: string, applicant: any }) => {
        const user = users.find(u => u.Username === application.applicant.Username);
        return { ...application.applicant, PhoneNumber: user?.PhoneNumber };
      });
  }

  isJobseeker(user: any): boolean {
    return user && user.Role === 'jobseeker';
  }

  hasUserAppliedForJob(user: any, job: any): boolean {
    const jobApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    return jobApplications.some(
      (application: { jobId: string, applicant: any }) =>
        application.jobId === job.JobID && application.applicant.Username === user.Username
    );
  }
}

