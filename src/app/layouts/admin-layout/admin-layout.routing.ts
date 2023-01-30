import { Routes } from '@angular/router';

import { KanbanComponent } from 'app/pages/kanban/kanban.component';
import { AddTutorialComponent } from 'app/pages/tutorial/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from 'app/pages/tutorial/tutorial-details/tutorial-details.component';
import { TutorialsListComponent } from 'app/pages/tutorial/tutorials-list/tutorials-list.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'kanban', component: KanbanComponent },
    { path: '', redirectTo: 'kanban' },
    { path: 'acts', component: TutorialsListComponent },
    { path: 'acts/:id', component: TutorialDetailsComponent },
    { path: 'addAct', component: AddTutorialComponent }
];
