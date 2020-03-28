import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {UncaughtPokemon} from '../../../models/uncaught-pokemon';
import { UncaughtPokemonService } from '../../uncaught-pokemon/uncaught-pokemon.server';
import { HandlerService } from 'src/app/handler.service';
import { CloudinaryService } from '../../../cloudinary/cloudinary.service';

@Component({
  selector: 'app-add-uncaught-modal',
  templateUrl: './add-uncaught-modal.component.html',
  styleUrls: ['./add-uncaught-modal.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AddUncaughtModalComponent implements OnInit {
  public form: FormGroup;
	public pkmn: UncaughtPokemon;

  constructor(private formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<AddUncaughtModalComponent>,
		private uncaughtPokemonService: UncaughtPokemonService,
    private handler: HandlerService,
    private cloudinaryService: CloudinaryService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
      this.createForm();
    }

    createForm() {
      this.form = this.formBuilder.group({
        dexNumber: [ '', [ Validators.required ] ],
        name: [ '', [ Validators.required ] ],
        area: [ '', [ Validators.required ] ],
        sprite: ['']
      });
    }

    

    onSubmit() {

      if (this.form.invalid) {
        return;
      }
      else {
        this.pkmn = this.form.getRawValue();
    
        this.uncaughtPokemonService.addPokemon(this.pkmn).subscribe();
    
        this.dialogRef.close();
      }
    }

    validateField(fieldName: string) {
      const field = this.form.get(fieldName);
  
      return this.form && field && field.invalid && (field.dirty || field.touched);
    }
  
    check(fieldName: string, validator: string) {
      return this.form.get(fieldName)['errors'][validator];
    }

    uploadImg(ev, target) {
      const files = ev.target.files;
      //this.pkmn = this.form.getRawValue();
      this.cloudinaryService.upload(files[0]).subscribe((result) => {
        this.form.controls['sprite'].setValue(result['public_id']);
      });
    }

}
