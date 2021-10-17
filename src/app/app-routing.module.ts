import { HomeComponent } from './components/home/home.component';
import { GameboardComponent } from './components/gameboard/gameboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontDoorComponent } from './components/front-door/front-door.component';
import { GamePlayComponent } from './components/game-play/game-play.component';

const routes: Routes = [
  {path: '', redirectTo: '/front-door', pathMatch: 'full'},
  {path: 'front-door', component: FrontDoorComponent},
  {path: 'home', component: HomeComponent},
  {path: 'game', component: GameboardComponent},
  {path: 'play', component: GamePlayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
 
}
