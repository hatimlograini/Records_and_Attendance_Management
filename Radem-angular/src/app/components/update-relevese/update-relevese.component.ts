import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/releve.service';

@Component({
  selector: 'app-update-relevese',
  templateUrl: './update-relevese.component.html',
  styleUrls: ['./update-relevese.component.css']
})
export class UpdateReleveseComponent {
  errorMessage: string = '';
  getId: any;
  updateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudAPI: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudAPI.getReleve(this.getId).subscribe(res => {
      console.log(res['Releve']);
      this.updateForm.patchValue({
        COD_RLR: res['Releve']['COD_RLR'],
        DATE_REL: res['Releve']['DATE_REL'],
        NBR_TOTAL_ORDER: res['Releve']['NBR_TOTAL_ORDER'],
        ANN_TRN: res['Releve']['ANN_TRN'],
        PER_TRN: res['Releve']['PER_TRN'],
        ORDRE_LECTURE_PAQUET: res['Releve']['ORDRE_LECTURE_PAQUET'],
        TOURNEE_DEBUT: res['Releve']['TOURNEE_DEBUT'],
        TOURNEE_FIN: res['Releve']['TOURNEE_FIN'],
      });
      console.log('hatim test ' + res);
    });
    this.updateForm = this.formBuilder.group({
      COD_RLR: ['', [Validators.required, Validators.pattern(/^R\d{3}$/)]],
      DATE_REL: [''],
      NBR_TOTAL_ORDER: [''],
      ANN_TRN: [''],
      PER_TRN: [''],
      ORDRE_LECTURE_PAQUET: [''],
      TOURNEE_DEBUT: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      TOURNEE_FIN: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
    });
  }

  onUpdate() {
    if (this.updateForm.invalid) {
      this.errorMessage = 'Invalid form data.';
      return;
    }

    this.crudAPI.updateReleve(this.getId, this.updateForm.value).subscribe(
      (res) => {
        console.log('');
        const alertMessage = document.createElement('div');
        alertMessage.innerText = 'Data Updated successfully';
        alertMessage.style.padding = '10px';
        alertMessage.style.borderRadius = '5px';
        alertMessage.style.backgroundColor = '#4CAF50';
        alertMessage.style.color = 'white';
        alertMessage.style.fontWeight = 'bold';
        alertMessage.style.textAlign = 'center';
        alertMessage.style.position = 'fixed';
        alertMessage.style.top = '50%';
        alertMessage.style.left = '50%';
        alertMessage.style.transform = 'translate(-50%, -50%)';
        alertMessage.style.zIndex = '9999';
        document.body.appendChild(alertMessage);
        setTimeout(() => {
          alertMessage.remove();
        }, 3000);
        this.ngZone.run(() => {
          this.router.navigateByUrl('/view-releves');
        });
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
