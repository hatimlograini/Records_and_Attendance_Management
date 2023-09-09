import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/releve.service';

@Component({
  selector: 'app-add-releves',
  templateUrl: './add-releves.component.html',
  styleUrls: ['./add-releves.component.css']
})
export class AddRelevesComponent {

  errorMessage: string = '';
  releveForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.releveForm = this.formBuilder.group({
      COD_RLR: ['', [Validators.required, Validators.pattern(/^R\d{3}$/)]],
      COUNT_DOWN_ORDER: [''],
      DATE_REL: [''],
      NBR_TOTAL_ORDER: [''],
      ANN_TRN: [''],
      PER_TRN: [''],
      ORDRE_LECTURE_PAQUET: [''],
      TOURNEE_DEBUT: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      TOURNEE_FIN: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.releveForm.invalid) {
      this.errorMessage = 'Invalid form data.';
      return;
    }

    this.crudService.addReleve(this.releveForm.value)
      .subscribe(
        () => {
          console.log('Data added successfully');
          this.ngZone.run(() => this.router.navigateByUrl('view-releves'));
        },
        (err) => {
          console.log(err);
          if (err.error && err.error.message) {
            this.errorMessage = err.message;
          } else {
            this.errorMessage = 'An error occurred';
          }
        }
      );
  }
}
