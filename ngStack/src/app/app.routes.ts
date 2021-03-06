import { EditComponent } from './core/editUser/edit/edit.component';
import { SignUpComponent } from './core/login/signup.componet';
import { Routes, RouterModule } from '@angular/router';
import { AppHeaderComponent } from './core/header/app.header';
import { CommentsComponent } from './core/comments/app.comments';
import { LoginComponent } from './core/login/login.component'
import { HomeComponent } from './core/home/home.component';
import{AuthGuard} from './guards/auth.guard'


const routes: Routes = [
  { path: 'comments', component: CommentsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'posts/:idPost', component: CommentsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'edit', component: EditComponent,canActivate:[AuthGuard]}

];
export const globalroute = RouterModule.forRoot(routes);