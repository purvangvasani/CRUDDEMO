import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { switchMap, debounceTime, tap, map } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EventService } from '../services/event.service';
import * as moment from 'moment';


@Component({
  selector: 'app-add-event',
  templateUrl: './add.component.html'
})

export class AddEventsComponent {

  public categories: Array<any> = [{ name: 'Category 1', value: 'category1' }, { name: 'Category 2', value: 'category2' }];
  public selectedProject: any = [];
  public projectLoading: any = false;
  public projectDropdownSettings: any = {
    text: "Select Category",
    classes: "myclass custom-class",
    primaryKey: "alpha3Code",
    labelKey: "name",
    noDataLabel: "Select Category...",
    enableSearchFilter: true,
    singleSelection: true,
    searchBy: ['name']
  }

  public statuses: Array<any> = [{ name: 'Draft', value: 'draft' }, { name: 'Published', value: 'published' }];
  public selectedName: any = [];
  public nameLoading: any = false;
  public nameDropdownSettings: any = {
    text: "Select Status",
    classes: "myclass custom-class",
    primaryKey: "alpha3Code",
    labelKey: "name",
    noDataLabel: "Select Status...",
    enableSearchFilter: true,
    singleSelection: true,
    searchBy: ['name']
  }

  public eventForm: FormGroup;
  public projectForm: FormGroup;
  public nameForm: FormGroup;

  public loading: any = false;
  public timesheetDetails: any = [];

  public dataForSearch: any;
  public eventIndex: any = null;

  public postData: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params: Params) => {
      this.eventIndex = params['index'];
      if (this.eventIndex) {
        this.getEvent();
      }
    });
  }

  ngOnInit() {
    this.buildEventForm();
  }

  getEvent = () => {
    let success = (data) => {
      this.loading = false;
      if (data && data.data) {
        this.postData = data.data.length ? data.data[0] : data.data;
        this.buildEventForm(this.postData);
      }
    }

    let failure = (error) => {
      this.loading = false;
      this.buildEventForm();
    }
    this.loading = true;

    let criterion = { _id: this.eventIndex };
    this.eventService.getBy(criterion, success, failure);
  }

  buildEventForm = (data?) => {
    this.eventForm = this.formBuilder.group({
      name: [(data && data.name) ? data && data.name : '', [Validators.required]],
      description: [(data && data.description) ? data.description : '', [Validators.required]],
      category: [(data && data.category) ? data.category : this.categories[0].value, [Validators.required]],
      status: [(data && data.status) ? data.status : this.statuses[0].value, [Validators.required]]
    });
  }

  save = () => {
    console.log(this.eventForm);
    console.log(this.eventForm.value);
    if (this.eventForm && this.eventForm.valid) {
      let data = this.eventForm.value;
      this.update(data);
    } else {
      this.validateAllFormFields(this.eventForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  update = (data) => {
    let success = (data) => {
      console.log(data);
      this.loading = false;
      if (data && data.success) {
        this.router.navigate(['/events']);
      }
    }
    let failure = (error) => {
      console.log(error);
      alert(error && error.message ? error.message : 'Unexpected Error!');
      this.loading = false;
    }
    this.loading = true;
    if (this.postData && this.postData._id) {
      data["_id"] = this.postData._id;
      this.eventService.update(data, success, failure)
    } else {
      this.eventService.add(data, success, failure)
    }
  }

}
