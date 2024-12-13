import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profiles.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-profile',
  standalone: false,
  
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{
  profileData: any;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileData = this.profileService.getProfileData();
  }

  // ngDoCheck(){}
  // ngAfterContentInit(){}
  // ngAfterContentChecked(){}
  
}
