import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { KanbanComponent } from 'app/pages/kanban/kanban.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { AddTutorialComponent } from 'app/pages/tutorial/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from 'app/pages/tutorial/tutorial-details/tutorial-details.component';
import { TutorialsListComponent } from 'app/pages/tutorial/tutorials-list/tutorials-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    DragDropModule,
    MatExpansionModule,
    MatIconModule,
  ],
  declarations: [
    KanbanComponent,
    AddTutorialComponent,
    TutorialDetailsComponent,
    TutorialsListComponent
  ]
})

export class AdminLayoutModule { }
