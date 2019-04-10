import { CustomerService } from './customer.service';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

@Injectable({
  providedIn: 'root'
})


/**
 * Custom validator functions for reactive form validation
 */
export class CustomValidators {
  
    /**
     * Validates that child controls in the form group are equal
     */
    static childrenEqual: ValidatorFn = (formGroup: FormGroup) => {
        const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {});
        const isValid = otherControlNames.every(controlName => formGroup.get(controlName).value === formGroup.get(firstControlName).value);
        return isValid ? null : { childrenNotEqual: true };
    }

}

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
 */
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.parent.invalid && control.touched;
    }
}



/**
 * Collection of reusable RegExps
 */
export const regExps: { [key: string]: RegExp } = {
   password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
};

/**
 * Collection of reusable error messages
 */
export const errorMessages: { [key: string]: string } = {
    fullname: 'Votre nom complet doit comporter entre 1 et 128 caractères.',
    usernameSame: 'Ce username existe déjà, veuillez en choisir un autre.',
    username: 'L\'identifiant doit être renseigné.',
    email: 'Email doit être un email valide (username@domain).',
    confirmEmail: 'Les adresses emails doivent correspondre.',
    password: 'Le mot de passe doit comporter entre 1 et 128 caractères, et contenor au moins un chiffre et un caractère spécial.',
    confirmPassword: 'Les mots de passe doivent correspondre.',
    domesticCp: '5 caractères pour le code postal.',
    deliveryCp: '5 caractères pour le code postal.',
    nameRoom: 'Ce nom de salle existe déjà, veuillez en choisir un autre.',
    capacityRoom: 'La capacité de la salle doit être comprise entre 4 et 100.',
    nameFacilityCategory: 'Ce nom de catégorie d\'équipement existe déjà.',
    nameFacility: 'Ce nom d\'équipement existe déjà.',
    nameSubscription: 'Ce type d\'abonnement existe déjà',
    nbLast: 'La durée de d\'un type d\'abonnement doit être comprise entre 1 et 10',
    nameWatch: 'Ce nom de modèle existe déjà, veuillez en choisir un autre.'
};