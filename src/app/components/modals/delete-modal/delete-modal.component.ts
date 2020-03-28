import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { UncaughtPokemon } from '../../../models/uncaught-pokemon';
import { UncaughtPokemonService } from '../../uncaught-pokemon/uncaught-pokemon.server';
import { HandlerService } from '../../../handler.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
	public deleteForm: FormGroup;
	public pokemon: UncaughtPokemon;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<DeleteModalComponent>,
		private uncaughtPokemonService: UncaughtPokemonService,
		public handlerService: HandlerService
	) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
		this.deleteForm = this.formBuilder.group({
			delete: [ '', [ Validators.required ] ]
		});
	}

	onSubmit() {
		if(this.deleteForm.invalid) {
			return
		}
		else {
			this.handlerService.showLoader();

			this.uncaughtPokemonService.deletePokemon(this.data).subscribe(() => {
				this.handlerService.hideLoader();
				this.dialogRef.close();
			});
		}

	}

	validateField(fieldName: string) {
		const field = this.deleteForm.get(fieldName);
	
		return this.deleteForm && field && field.invalid && (field.dirty || field.touched);
	}
	
	  check(fieldName: string, validator: string) {
		return this.deleteForm.get(fieldName)['errors'][validator];
	}

}
