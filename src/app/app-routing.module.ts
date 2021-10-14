import { GameComponent } from './components/game/game.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/login/register.component';

const routes: Routes = [
  {path: '', component: RegisterComponent},
  // add path for login
  // {path: 'register', component: RegisterComponent), 
  {path: 'game', component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
 
}
