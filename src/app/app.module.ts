import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditSecurityComponent } from './components/edit-security/edit-security.component';

const appRoutes: Routes = [

  { path: '', component: HomeComponent}, // http://localhost:4200/,
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'settings', component: SettingsComponent},
  { path: '**', component: NotFoundComponent}

];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    LoginFormComponent,
    RegisterFormComponent,
    SettingsComponent,
    EditProfileComponent,
    EditSecurityComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
