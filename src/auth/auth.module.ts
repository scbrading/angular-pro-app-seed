import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// 3rd-party modules
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// shared modules
import { SharedModule } from './shared/shared.module';

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyDiECdTOgpGL2id0rJI9b9BIAGO4MS5ayY",
  authDomain: "fitness-app-907f6.firebaseapp.com",
  databaseURL: "https://fitness-app-907f6.firebaseio.com",
  projectId: "fitness-app-907f6",
  storageBucket: "fitness-app-907f6.appspot.com",
  messagingSenderId: "681049812071"
};

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', loadChildren: './login/login.module#LoginModule' },
      {
        path: 'register',
        loadChildren: './register/register.module#RegisterModule',
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ],
  declarations: [],
  providers: [],
})
export class AuthModule {}
