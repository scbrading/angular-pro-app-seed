import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

// store and auth service
import { Store } from 'store';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

// observables
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

// interface
export interface Meal {
  name: string;
  ingredients: string[];
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

@Injectable()
export class MealsService {
  meals$: Observable<Meal[]> = this.db
    .list(`meals/${this.uid}`)
    .do<Meal[]>(next => this.store.set('meals', next));

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal)
  }
}
