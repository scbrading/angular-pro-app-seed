import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

// interfaces
import { Meal } from '../../../shared/services/meals/meals.service';

@Component({
  selector: 'meal-form',
  styleUrls: ['meal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="meal-form">
      <form [formGroup]="form">
        <div class="meal-form__name">
          <label
            ><h3>Meal name</h3>
            <input
              formControlName="name"
              type="text"
              placeholder="e.g. English Breakfast"
            />
            <div class="error" *ngIf="required">Workout name is required</div>
          </label>
        </div>
        <div class="meal-form__food">
          <div class="meal-form__subtitle">
            <h3>Food</h3>
            <button
              type="button"
              class="meal-form__add"
              (click)="addIngredient()"
            >
              <img src="/img/add-white.svg" />
              Add food
            </button>
          </div>
          <div formArrayName="ingredients">
            <label *ngFor="let c of ingredients.controls; index as i">
              <input [formControlName]="i" placeholder="e.g. Eggs" />
              <span
                class="meal-form__remove"
                (click)="removeIngredient(i)"
              ></span>
            </label>
          </div>
        </div>
        <div class="meal-form__submit">
          <div>
            <button type="submit" class="button" (click)="createMeal()">
              Create meal
            </button>
            <a class="button button--cancel" [routerLink]="['../']">Cancel</a>
          </div>
        </div>
      </form>
    </div>
  `,
})
export class MealFormComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array(['']),
  });

  @Output() create = new EventEmitter<Meal>();

  constructor(private fb: FormBuilder) {}

  get required() {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    );
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }
}
