import { Component, Input } from '@angular/core';

@Component({
  selector: 'list-item',
  template: `
    <div class="list-item">{{ item | json }}</div>
  `,
})
export class ListItemComponent {
  @Input()
  item: any;
}
