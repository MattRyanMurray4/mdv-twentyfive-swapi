import { Component, EventEmitter, Input, Output } from '@angular/core';
import { People } from '@swapi/api-interfaces';
@Component({
  selector: 'swapi-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent {
  @Input() peoples: People[] | null;
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
