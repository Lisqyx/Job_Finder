import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './tabs/login/login.component';
import { RegistrationComponent } from './tabs/registration/registration.component';
import { HomeComponent } from './tabs/home/home.component';
import { JobsComponent } from './tabs/jobs/jobs.component';
import { JobDetailsComponent } from './tabs/job-details/job-details.component';
import { CreateNewJobComponent } from './tabs/create-new-job/create-new-job.component';
import { JobListingComponent } from './tabs/job-listing/job-listing.component';
import { MyJobsComponent } from './tabs/my-jobs/my-jobs.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './tabs/profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    JobsComponent,
    JobDetailsComponent,
    CreateNewJobComponent,
    JobListingComponent,
    MyJobsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
