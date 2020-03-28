import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { UncaughtPokemon } from '../../../models/uncaught-pokemon';
import { UncaughtPokemonService } from '../../uncaught-pokemon/uncaught-pokemon.server';
import { HandlerService } from '../../../handler.service';
@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  public editForm: FormGroup;
  public pokemon: UncaughtPokemon;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<EditModalComponent>,
		private uncaughtPokemonService: UncaughtPokemonService,
		public handlerService: HandlerService
  ) {}
  
  ngOnInit() {
    this.createForm();
    this.setUpFormData();
  }

  setUpFormData() {
    console.log(this.data);
    this.editForm.controls['dexNumber'].setValue(this.data.dexNumber);
		this.editForm.controls['name'].setValue(this.data.name);
		this.editForm.controls['area'].setValue(this.data.area);
  }

  createForm() {
    this.editForm = this.formBuilder.group({
      dexNumber: [ '', [ Validators.required ] ],
      name: [ '', [ Validators.required ] ],
      area: [ '', [ Validators.required ] ],
    });
  }

  onSubmit() {
    if(this.editForm.invalid) {
      return;
    }
    else {
      const id = this.data.id;
      this.data = this.editForm.getRawValue();
      this.uncaughtPokemonService.update(id, this.data).subscribe(() => {
        this.dialogRef.close();
      });
    }

  }
  
  validateField(fieldName: string) {
		const field = this.editForm.get(fieldName);
	
		return this.editForm && field && field.invalid && (field.dirty || field.touched);
	}
	
	  check(fieldName: string, validator: string) {
		return this.editForm.get(fieldName)['errors'][validator];
	}
}
