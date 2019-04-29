import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// 3rd-party modules
import { AngularFireDatabaseModule } from 'angularfire2/database';

// components
import { ListItemComponent } from './components/list-item/list-item.component';

// services
import { MealsService } from './services/meals/meals.service';

@NgModule({
  declarations: [ListItemComponent],
  providers: [],
  imports: [CommonModule, RouterModule, AngularFireDatabaseModule],
  exports: [ListItemComponent],
})
export class SharedModule {
  static forRoout(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [MealsService],
    };
  }
}
