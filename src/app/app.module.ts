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
import { CreatePostComponent } from './components/create-post/create-post.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { PostComponent } from './components/post/post.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';

import { ProfileComponent } from './pages/profile/profile.component';

import { FriendRequestsComponent } from './components/friend-requests/friend-requests.component';
import { TagFriendsComponent } from './components/tag-friends/tag-friends.component';
import { NotificationCardComponent } from './components/notification-card/notification-card.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent }, // http://localhost:4200/,
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: ':profileUrl', component: ProfileComponent},
  { path: 'settings', component: SettingsComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'notFound', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    EditProfileComponent,
    EditSecurityComponent,
    HomeComponent,
    LoginComponent,
    LoginFormComponent,
    NavbarComponent,
    NotFoundComponent,
    RegisterComponent,
    RegisterFormComponent,
    SettingsComponent,
    FriendsComponent,
    PostComponent,
    AvatarComponent,
    FriendsListComponent,
    FriendRequestsComponent,
    TagFriendsComponent,
    NotificationCardComponent,
    ProfileComponent
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
