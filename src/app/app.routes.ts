import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserDetailsComponent } from './user-details/user-details.component';

export const routes: Routes = [
    {
        path:'',
        component: UsersListComponent,
    },
    {
        path:'users',
        component: UsersListComponent,
    },
    { 
        path: 'user/:id', 
        component: UserDetailsComponent 
    },
    {
        path:'**',
        component: NotFoundComponent
    },
];
