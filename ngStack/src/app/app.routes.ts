import { SignUpComponent } from './core/login/signup.componet';
import { Routes, RouterModule } from '@angular/router';
import { AppHeaderComponent } from './core/header/app.header';
import { CommentsComponent } from './core/comments/app.comments';
import { LoginComponent } from './core/login/login.component';



const routes: Routes = [
  { path: 'comments', component: CommentsComponent },
  { path: 'login', component: LoginComponent },
  {path:'sign',component:SignUpComponent},
  {path:'**' ,redirectTo:''},
  { path: '', redirectTo: '/comments', pathMatch: 'full' }
 
];
export const globalroute = RouterModule.forRoot(routes);