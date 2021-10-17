import { HomeComponent } from './components/home/home.component';
import { GameboardComponent } from './components/gameboard/gameboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { FrontDoorComponent } from './components/front-door/front-door.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: '', redirectTo: '/front-door', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'hero-card', component: HeroCardComponent},
  {path: 'front-door', component: FrontDoorComponent},
  {path: 'home', component: HomeComponent},
  {path: 'game', component: GameboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
 
}
