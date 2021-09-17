import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emptyPeople, People } from '@swapi/api-interfaces';
import { PeopleFacade } from '@swapi/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'swapi-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {
  people$: Observable<People[]> = this.peopleFacade.allPeople$;
  selectedPeople$: Observable<People> = this.peopleFacade.selectedPeople$;
  form: FormGroup;
  constructor(
    private peopleFacade: PeopleFacade,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.peopleFacade.loadPeoples();
    this.reset();
  }

  selectPeople(people: People) {
    this.peopleFacade.selectPeople(people.id);
    this.form.patchValue(people);
  }

  reset() {
    this.selectPeople(emptyPeople);
    this.form.reset();
  }

  deletePeople(people: People) {
    this.peopleFacade.deletePeople(people);
  }

  cancel() {
    this.reset();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: null,
      name: ['', Validators.required],
      height: [''],
      mass: [''],
      hair_color: [''],
      skin_color: [''],
      eye_color: [''],
      birth_year: [''],
      gender: [''],
    });
  }
}
