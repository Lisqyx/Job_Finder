import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobService {
 jobseekerUsers: any[] = [];
 employerUsers: any[] = [];

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
}
