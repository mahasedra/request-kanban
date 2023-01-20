import { Routes } from '@angular/router';

import { KanbanComponent } from 'app/pages/kanban/kanban.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'kanban',         component: KanbanComponent },
    { path: '', redirectTo: 'kanban'}
];
