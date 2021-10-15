import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UpdateComponent } from './components/update/update.component';
import { LoginComponent } from './components/login/login.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { FrontDoorComponent } from './components/front-door/front-door.component';

const routes: Routes = [
  {path: '', redirectTo: '/front-door', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'update/id:', component: UpdateComponent},
  {path: 'home', component: HomeComponent},
  {path: 'navbar', component: NavbarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'hero-card', component: HeroCardComponent},
  {path: 'front-door', component: FrontDoorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
 
}
