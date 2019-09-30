import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { CharacterComponent } from './character/character.component';
import { NavComponent } from './nav/nav.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'characters/:id', component: CharacterComponent },
  { path: 'edit/:id',      component: EditComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditComponent,
    CharacterComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    [
      RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
      )
    ],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
