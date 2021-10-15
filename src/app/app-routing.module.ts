import { HomeComponent } from './components/home/home.component';
import { GameboardComponent } from './components/gameboard/gameboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/login/register.component';

const routes: Routes = [
  {path: '', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  // add path for login
  // {path: 'register', component: RegisterComponent), 
  {path: 'game', component: GameboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
 
}
