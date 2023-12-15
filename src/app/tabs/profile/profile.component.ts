import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/service/job.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loggedInUser: any = {};

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.loggedInUser = this.jobService.getLoggedInUser() || {};
  }

  updateProfile() {
    const updatedUser = { ...this.loggedInUser };
  
    // Update in the loggedInUser
    this.jobService.setLoggedInUser(updatedUser);
  
    // Update in the respective array
    if (this.jobService.isEmployer(updatedUser)) {
      const employerUsers = this.jobService.getEmployerUsers() || [];
      const updatedEmployerUsers = employerUsers.map((employer) =>
        employer.id === updatedUser.id ? { ...employer, ...updatedUser } : employer
      );
      this.jobService.setEmployerUsers(updatedEmployerUsers);
      localStorage.setItem('employerUsers', JSON.stringify(updatedEmployerUsers));
    } else {
      const jobseekerUsers = this.jobService.getJobseekerUsers() || [];
      const updatedJobseekerUsers = jobseekerUsers.map((jobseeker) =>
        jobseeker.id === updatedUser.id ? { ...jobseeker, ...updatedUser } : jobseeker
      );
      this.jobService.setJobseekerUsers(updatedJobseekerUsers);
      localStorage.setItem('jobseekerUsers', JSON.stringify(updatedJobseekerUsers));
    }
  
    console.log('Profile updated successfully:', updatedUser);
  }
}
