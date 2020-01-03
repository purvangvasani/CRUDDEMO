import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-manage-pokemons',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})

export class ManagePokemonsComponent {

  public eventForm: FormGroup;

  public loading: any = false;
  public timesheetDetails: any = [];

  public dataForSearch: any;
  public eventIndex: any = null;

  public postData: any = null;

  public apiErrorMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private PokemonService: PokemonService,
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
      } else {
        this.apiErrorMessage = data && data.message ? data.message : 'Unexpected Error!';
        let that = this;
        setTimeout(() => {
          that.apiErrorMessage = null;
        }, 5000);
      }
    }

    let failure = (error) => {
      this.loading = false;
      this.apiErrorMessage = error && error.message ? error.message : 'Unexpected Error!';
      let that = this;
      setTimeout(() => {
        that.apiErrorMessage = null;
      }, 5000);
      this.buildEventForm();
    }
    this.loading = true;

    let criterion = { _id: this.eventIndex };
    this.PokemonService.getBy(criterion, success, failure);
  }

  buildEventForm = (data?) => {
    this.eventForm = this.formBuilder.group({
      name: [(data && data.name) ? data && data.name : '', [Validators.required]],
      description: [(data && data.description) ? data.description : '', [Validators.required]],
      height: [(data && data.height) ? data && data.height : 1, [Validators.required]],
      weight: [(data && data.weight) ? data.weight : 1, [Validators.required]],
      imageName: [(data && data.imageName) ? data.imageName : '', [Validators.required]],
      imagePath: [(data && data.imagePath) ? data.imagePath : '', [Validators.required]],
      file: [(data && data.file) ? data.file : '']
    });
  }

  save = () => {
    console.log(this.eventForm);
    console.log(this.eventForm.value);
    let isImageValid = (this.postData && this.postData._id) ? true : this.checkImageValidity();
    if (this.eventForm && this.eventForm.valid && isImageValid) {
      let data = this.eventForm.value;
      if (!this.postData || !this.postData._id) {
        this.patchImageIno(this.selectedFile.file.name, this.selectedFile.src, this.selectedFile.file);
        data['imageName'] = this.selectedFile.file.name;
        data['imagePath'] = this.selectedFile.src;
        data['file'] = this.selectedFile.file;
      }
      data['reqType'] = 'file';
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
        this.router.navigate(['/pokemons']);
      } else {
        this.apiErrorMessage = data && data.message ? data.message : 'Unexpected Error!';
        let that = this;
        setTimeout(() => {
          that.apiErrorMessage = null;
        }, 5000);
      }
    }
    let failure = (error) => {
      console.log(error);
      this.apiErrorMessage = error && error.message ? error.message : 'Unexpected Error!';
      let that = this;
      setTimeout(() => {
        that.apiErrorMessage = null;
      }, 5000);
      this.loading = false;
    }
    this.loading = true;
    if (this.postData && this.postData._id) {
      data["_id"] = this.postData._id;
      this.PokemonService.update(data, success, failure)
    } else {
      this.PokemonService.add(data, success, failure)
    }
  }

  cancel = () => {
    this.router.navigate(['/pokemons']);
  }












  selectedFile: ImageSnippet;
  imageErrorMsg: any = null;
  isImageError: any = false;
  imageTouchedFlag: any = false;

  processFile(imageInput: any) {
    if (!imageInput || !imageInput.files || !imageInput.files.length) {
      this.showImageError('Ivalid file...');
      return;
    }

    var mimeType = imageInput.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.showImageError('Ivalid file...');
      return;
    }

    if ((imageInput.files[0].zize / 1024) > 100) {
      this.showImageError('Ivalid file, file size is greater than 100 KB.');
      return;
    }

    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      if (
        this.selectedFile &&
        this.selectedFile.src &&
        this.selectedFile.file &&
        this.selectedFile.file.name
      ) {
        this.patchImageIno(this.selectedFile.file.name, this.selectedFile.src, this.selectedFile.file);
      } else {
        this.showImageError('Ivalid file...');
      }
    });

    reader.readAsDataURL(file);
  }

  patchImageIno = (name, path, file) => {
    this.eventForm.patchValue({
      imageName: name,
      imagePath: path,
      file: file
    });
  }

  checkImageValidity = () => {
    let isValid = false;
    this.imageTouchedFlag = true;
    if (
      this.selectedFile &&
      this.selectedFile.src &&
      this.selectedFile.file &&
      this.selectedFile.file.name
    ) {
      isValid = true;
    } else {
      this.showImageError('Ivalid file...', true);
    }
    return isValid;
  }

  showImageError = (msg, valid?) => {
    this.imageErrorMsg = null;
    this.imageErrorMsg = msg || 'Invalid file...';
    this.isImageError = valid || false;
    let that = this;
    setTimeout(() => {
      that.imageErrorMsg = null;
    }, 10000);
  }

  imageTouched = () => {
    if (!this.imageTouchedFlag)
      this.imageTouchedFlag = true
  }
}



class ImageSnippet {
  constructor(public src: string, public file: File) { }
}
