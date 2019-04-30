import {
  Component,
  Input,
  Output,
  OnChanges,
  ChangeDetectionStrategy,
  EventEmitter,
  SimpleChange,
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
            <button
              *ngIf="!exists"
              type="submit"
              class="button"
              (click)="createMeal()"
            >
              Create meal
            </button>
            <button
              *ngIf="exists"
              type="button"
              class="button"
              (click)="updateMeal()"
            >
              Save
            </button>
            <a class="button button--cancel" [routerLink]="['../']">Cancel</a>
          </div>
          <div class="meal-form__delete" *ngIf="exists">
            <div *ngIf="toggled">
              <p>Delete item?</p>
              <button class="confirm" type="button" (click)="removeMeal()">
                Yes
              </button>
              <button class="cancel" type="button" (click)="toggle()">
                No
              </button>
            </div>
            <button
              class="button button--delete"
              type="button"
              (click)="toggle()"
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  `,
})
export class MealFormComponent implements OnChanges {
  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array(['']),
  });

  exists = false;
  toggled = false;

  @Input() meal: Meal | {};

  @Output() create = new EventEmitter<Meal>();
  @Output() update = new EventEmitter<Meal>();
  @Output() remove = new EventEmitter<Meal>();

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: { meal: SimpleChange }): void {
    if (this.meal && (this.meal as Meal).name) {
      this.exists = true;
      const value = this.meal as Meal;

      this.form.patchValue(value);
      this.emptyIngredients();

      if (value.ingredients) {
        for (const item of value.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      }
    }
  }

  emptyIngredients() {
    while (this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }

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

  updateMeal() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeMeal() {
    this.remove.emit(this.form.value);
  }
  toggle() {
    this.toggled = !this.toggled;
  }
}
