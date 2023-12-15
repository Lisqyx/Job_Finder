import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './tabs/home/home.component';
import { LoginComponent } from './tabs/login/login.component';
import { RegistrationComponent } from './tabs/registration/registration.component';
import { JobsComponent } from './tabs/jobs/jobs.component';
import { JobDetailsComponent } from './tabs/job-details/job-details.component';
import { CreateNewJobComponent } from './tabs/create-new-job/create-new-job.component';
import { JobListingComponent } from './tabs/job-listing/job-listing.component';
import { MyJobsComponent } from './tabs/my-jobs/my-jobs.component';
import { ProfileComponent } from './tabs/profile/profile.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegistrationComponent
  },
  {
    path:'jobs',
    component:JobsComponent
  },
  {
    path:'job-detail',
    component:JobDetailsComponent
  },
  {
    path:'job-detail/:id',
    component:JobDetailsComponent
  },
  {
    path:'new-job',
    component:CreateNewJobComponent
  },
  {
    path:'job-listing',
    component:JobListingComponent
  },
  {
    path:'my-jobs',
    component:MyJobsComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'**',
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
