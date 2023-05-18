import { FormControl, FormGroup } from "@angular/forms";

export default class validateForm {
    static validateAllForm(fg: FormGroup) {
        Object.keys(fg.controls).forEach(fields => {
            const control = fg.get(fields);
            if (control instanceof FormControl) {
                control.markAsDirty({ onlySelf: true });
            }
            else if (control instanceof FormGroup) {
                this.validateAllForm(control);
            }
        })
    }
}