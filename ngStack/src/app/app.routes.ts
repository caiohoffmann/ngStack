import { Routes, RouterModule } from '@angular/router';
import { AppHeaderComponent } from './core/header/app.header';
import { CommentsComponent } from './core/comments/app.comments';
import { LoginComponent } from './core/login/login.component'
import { HomeComponent } from './core/home/home.component';


const routes: Routes = [
  { path: 'comments', component: CommentsComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/comments', pathMatch: 'full' },
  { path: 'home' , component: HomeComponent}
];
export const globalroute = RouterModule.forRoot(routes);