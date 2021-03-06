import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Custom Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { GameboardComponent } from './components/gameboard/gameboard.component';
import { DummyunitComponent } from './components/dummyunit/dummyunit.component';
import { SquareComponent } from './components/gameboard/square.component';
import { IngameCardHeroComponent } from './components/ingame-card-hero/ingame-card-hero.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { LoginComponent } from './components/login/login.component';
import { FrontDoorComponent } from './components/front-door/front-door.component';
import { DeckBuilderComponent } from './components/deck-builder/deck-builder.component';


// Angular Material Components
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GameboardSquareComponent } from './components/gameboard-square/gameboard-square.component';
import { GamePlayComponent } from './components/game-play/game-play.component';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeroCardComponent,
    RegisterComponent,
    LoginComponent,
    FrontDoorComponent,
    IngameCardHeroComponent,
    GameboardComponent,
    DummyunitComponent,
    SquareComponent,
    GameboardSquareComponent,
    DeckBuilderComponent,
    GamePlayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule, 
    MatIconModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    FormsModule,
    MatChipsModule,
    DragDropModule,
    ReactiveFormsModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
