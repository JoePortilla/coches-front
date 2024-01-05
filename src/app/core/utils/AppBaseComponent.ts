import {FormArray, FormGroup} from "@angular/forms";

/**
 * Class with generic validations
 */
export class AppBaseComponent {

  /**
   * Validate if a form field has been touched
   * @param form Form group
   * @param field Field of the form
   */
  public isTouchedField = (form: FormGroup, field: string): boolean => {
    return form?.get(field).touched === true && form?.get(field).invalid;
  }

  /**
   * Return all errors or validations present in the FormGroup.
   * For internal development and debug forms
   * @param form Form group to evaluate
   */
  public getAllErrorsForm(form: FormGroup | FormArray): { [key: string]: any; } | null {
    let hasError = false;
    const result = Object.keys(form.controls).reduce((acc, key) => {
      const control = form.get(key);
      const errors = (control instanceof FormGroup || control instanceof FormArray)
                     ? this.getAllErrorsForm(control)
                     : control.errors;
      if (errors) {
        acc[key] = errors;
        hasError = true;
      }
      return acc;
    }, {} as { [key: string]: any; });
    return hasError ? result : null;
  }
}
