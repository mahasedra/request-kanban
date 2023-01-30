import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'app/models/tutorial.model';
import { TutorialService } from 'app/_services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {

  tutorial: Tutorial = {
    document_type: '',
    cost: 0,
    duration: 0,
  };
  submitted = false;

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    const data = {
      document_type: this.tutorial.document_type,
      cost: this.tutorial.cost,
      duration: this.tutorial.duration
    };

    this.tutorialService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      document_type: '',
      cost: 0,
      duration: 0,
    };
  }

}
