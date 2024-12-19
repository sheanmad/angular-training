import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profiles.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: false,
  
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
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
