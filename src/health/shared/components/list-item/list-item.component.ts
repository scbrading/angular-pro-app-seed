import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter,
} from '@angular/core';

import { Meal } from '../../services/meals/meals.service';

@Component({
  selector: 'list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['list-item.component.scss'],
  template: `
    <div class="list-item">
      <a [routerLink]="getRoute(item)">
        <p class="list-item__name">{{ item.name }}</p>
        <p class="list-item__ingredients">
          <span>{{ item.ingredients }}</span>
        </p>
      </a>

      <div class="list-item__delete" *ngIf="toggled">
        <p>Delete item?</p>
        <button class="confirm" type="button" (click)="removeItem()">
          Yes
        </button>
        <button class="cancel" type="button" (click)="toggle()">
          No
        </button>
      </div>
      <button class="trash" type="button" (click)="toggle()">
        <img src="/img/remove.svg" />
      </button>
    </div>
  `,
})
export class ListItemComponent {
  toggled = false;

  @Input()
  item: Meal;

  @Output()
  remove: EventEmitter<any> = new EventEmitter<any>();

  toggle() {
    this.toggled = !this.toggled;
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  getRoute(item: Meal) {
    return ['../meals', item.$key];
  }
}
