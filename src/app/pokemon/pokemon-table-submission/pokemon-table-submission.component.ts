import { Component, OnInit } from '@angular/core';
import { RealtimeDatabaseService } from '../../services/realtime-database.service';
import { CanComponenDeactivate } from '../../guards/can-deactivate.guard';

@Component({
  selector: 'app-pokemon-table-submission',
  standalone: false,
  
  templateUrl: './pokemon-table-submission.component.html',
  styleUrl: './pokemon-table-submission.component.css'
})
export class PokemonTableSubmissionComponent implements OnInit, CanComponenDeactivate{
  submissions: any[] = [];
  selectedSubmission: any | null = null;
  isFormDirty: boolean = false;

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

  startEdit(submission: any) {
    this.selectedSubmission = { ...submission };
  }

  cancelEdit(){
    this.selectedSubmission = null;
  }

  async saveEdit(){
    if(!this.selectedSubmission)return;

    try{
      await this.dbService.updateFormSubmission(this.selectedSubmission.id, this.selectedSubmission);

      this.submissions = this.submissions.map((sub)=> sub.id === this.selectedSubmission.id ? this.selectedSubmission : sub);

      this.selectedSubmission = null;
    }catch(error){
      console.error('Error saving update', error);
    }
  }
  onInputChange(): void{
    this.isFormDirty = true;
  }

  canDeactivate(): boolean {
    if (this.isFormDirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }
}