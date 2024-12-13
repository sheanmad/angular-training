import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
    getProfileData() {
        return {
            fullName: 'Shean Michael',
            jobTitle: 'Front-End Developer',
            profileImage: '/PEKORA.png',
            email: 'sheanmichaelyk@gmail.com',
            phoneNumber: '+62 895363391716',
            location: 'Tehcnocenter',
            
            aboutMe: `
            I'm a passionate software developer with experience in creating 
            web and mobile applications using modern technologies. I love solving complex 
            problems and continuously learning new skills.
            `,
        
            skills: [
                'Angular',
                'Laravel',
                'Kotlin',
                'Java',
                'HTML/CSS',
                'Spring',
                'Git'
            ],
        
            socialLinks: [
                { platform: 'LinkedIn', url: 'https://linkedin.com/in/sheanmichaelad' },
                { platform: 'GitHub', url: 'https://github.com/sheanmichaelad' }
            ]
        };
    }
}