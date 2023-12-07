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

  setJobseekerUsers(data: any) {
    this.jobseekerUsers = data;
  }

  getJobseekerUsers() {
    return this.jobseekerUsers;
  }

  setEmployerUsers(data: any) {
    this.employerUsers = data;
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
  private loadJobseekerUsers() {
    const localData = localStorage.getItem('jobseekerUsers');
    this.jobseekerUsers = localData ? JSON.parse(localData) : [];
  }

  //Will load the data for employers so it will stay despite the page being refreshed, this was very frustrating
  private loadEmployerUsers() {
    const localData = localStorage.getItem('employerUsers');
    this.employerUsers = localData ? JSON.parse(localData) : [];
  }

  //Same as the other two
  private loadLoggedInUser() {
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
}

