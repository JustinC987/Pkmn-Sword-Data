import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class Validation {
    validateField(fieldName: string, form: FormGroup) {
        const field = form.get(fieldName);
    
        return form && field && field.invalid && (field.dirty || field.touched);
      }
    
      check(fieldName: string, validator: string, form: FormGroup) {
        return form.get(fieldName)['errors'][validator];
      }
}