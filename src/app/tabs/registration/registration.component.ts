import { Component } from '@angular/core';
import { JobService } from 'src/app/service/job.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  employerUsers: any[] = []
  employerObj:any = {
    CompanyName: '',
    Email: '',
    MobileNo: '',
    PhoneNo: '',
    Password: '',
    CompanyAddress: '',
    CompanyDescription: '',
    City: '',
    State: '',
    LogoURL: ''
  };

  constructor(){}

  ngOnInit(): void {}
  
  onRegister(){
    this.employerUsers.push(this.employerObj);
    localStorage.setItem('employerUsers',JSON.stringify(this.employerUsers))
  }
}
