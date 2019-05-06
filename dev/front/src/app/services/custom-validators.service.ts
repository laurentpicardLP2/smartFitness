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
    loginUsername: 'L\'identifiant doir être renseigné',
    loginPassword: 'Le mot de passe doit être renseigné',
    fullname: 'Votre nom complet doit comporter entre 1 et 128 caractères.',
    usernameSame: 'Ce username existe déjà, veuillez en choisir un autre.',
    username: 'L\'identifiant doit être renseigné.',
    email: 'Email doit être un email valide (username@domain).',
    confirmEmail: 'Les adresses emails doivent correspondre.',
    password: 'Le mot de passe doit comporter entre 1 et 128 caractères, et contenir au moins un chiffre et un caractère spécial.',
    confirmPassword: 'Les mots de passe doivent correspondre.',
    cp: '5 caractères pour le code postal.',
    adresse: 'L\'adresse doit être renseignée.',
    city: 'La ville doit être renseignée.',
    country: 'Le pays doit être renseigné.',
    tel: 'Le numéro de téléphone doit être renseigné',
    telValid: 'Le numéro de téléphone doit être valide',
    dateOfBirth: 'La date de naissance doit être renseignée',
    capacityRoom: 'La capacité de la salle doit être comprise entre 4 et 100.',
    nbLast: 'La durée de d\'un type d\'abonnement doit être comprise entre 1 et 10',
    emailRequired: 'Veuillez renseigner votre email.',
    nameRoomSame: 'Ce nom de salle existe déjà, veuillez en choisir un autre.',
    nameRoom: 'Le nom de la salle doit être renseigné.',
    nameFacilityCategorySame: 'Ce nom de catégorie d\'équipement existe déjà, veuillez en choisir un autre.',
    nameFacilityCategory: 'Le nom de la catégorie d\'équipement doit être renseigné.',
    nameProductCategorySame: 'Ce nom de catégorie de produit existe déjà, veuillez en choisir un autre.',
    nameProductCategory: 'Le nom de la catégorie du produit doit être renseigné.',
    nameProductRefSame: 'Ce nom de produit existe déjà, veuillez en choisir une autre.',
    nameProductRef: 'Le nom du produit doit être renseigné.',
    priceProductRef: 'Le prix du produit doit être renseigné.',
    nameFacilitySame: 'Ce nom d\'équipement existe déjà, veuillez en choisir un autre.',
    nameFacility: 'Le nom de l\'équipement doit être renseigné.',
    nameSubscriptionSame: 'Ce type d\'abonnement existe déjà, veuillez en choisir un autre.',
    nameSubscription: 'Le type de l\'abonnement doit être renseigné.',
    priceSubscription: 'Le prix de l\'abonnement doit être renseigné.',
    typeLast: 'La nature de la durée de l\'abonnement doit être renseigné.',
    nameWatchSame: 'Ce nom de modèle existe déjà, veuillez en choisir un autre.',
    nameWatch: 'Le nom de modèle doit être renseigné.',
    priceWatch: 'Le prix du modèle doit être renseigné.',
    titleWatch: 'Le titre de l\'événement doit être renseigné.'
};