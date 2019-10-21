import { Routes, RouterModule } from '@angular/router';
import { AppHeaderComponent } from './core/header/app.header';
import { CommentsComponent } from './core/comments/app.comments';
import { LoginComponent } from './core/login/login.component'


const routes: Routes = [
  { path: 'comments', component: CommentsComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/comments', pathMatch: 'full' }
];
export const globalroute = RouterModule.forRoot(routes);