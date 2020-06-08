import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonComponent } from './components/button/button.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './pages/landing/landing.component';
import { TitleComponent } from './components/title/title.component';
import { BioComponent } from './pages/bio/bio.component';
import { MainComponent } from './pages/main/main.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ToolboxComponent } from './pages/toolbox/toolbox.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

// Angular material imports
// ***

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    NavbarComponent,
    FooterComponent,
    LandingComponent,
    TitleComponent,
    BioComponent,
    MainComponent,
    ProjectsComponent,
    ToolboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
