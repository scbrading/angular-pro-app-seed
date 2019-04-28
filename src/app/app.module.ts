import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { Store } from 'store';

// feature modules

// containers
import { AppComponent } from './containers/app/app.component';

// components

// routes
export const ROUTES: Routes = [];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    Store
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}

/*
<script src="https://www.gstatic.com/firebasejs/5.10.1/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDiECdTOgpGL2id0rJI9b9BIAGO4MS5ayY",
    authDomain: "fitness-app-907f6.firebaseapp.com",
    databaseURL: "https://fitness-app-907f6.firebaseio.com",
    projectId: "fitness-app-907f6",
    storageBucket: "fitness-app-907f6.appspot.com",
    messagingSenderId: "681049812071"
  };
  firebase.initializeApp(config);
</script>
 */
