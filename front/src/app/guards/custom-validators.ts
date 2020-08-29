import { AbstractControl } from '@angular/forms';

export function nameValidator(control: AbstractControl) {
    if (!control.value.startsWith('lattara') || !control.value.includes('admin')) {
        return { nameValid: false };
    }
    return null;
}
