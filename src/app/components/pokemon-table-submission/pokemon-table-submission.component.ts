import { Component, OnInit } from '@angular/core';
import { RealtimeDatabaseService } from '../../services/realtime-database.service';

@Component({
  selector: 'app-pokemon-table-submission',
  standalone: false,
  
  templateUrl: './pokemon-table-submission.component.html',
  styleUrl: './pokemon-table-submission.component.css'
})
export class PokemonTableSubmissionComponent implements OnInit {
  submissions: any[] = [];

  constructor(private dbService: RealtimeDatabaseService) { }

  ngOnInit(): void {
    this.loadSubmissions();
  }

  async loadSubmissions() {
    try {
      const data = await this.dbService.getFormSubmissions();
      this.submissions = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  }

  deleteSubmission(id: string) {
    this.dbService.deleteFormSubmission(id).then(() => {
      this.submissions = this.submissions.filter(sub => sub.id !== id);
    });
  }
}