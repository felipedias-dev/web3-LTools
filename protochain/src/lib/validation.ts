/**
 * Validation class
 */
export class Validation {
  success: boolean;
  message: string;

  /**
   * Create a new Validation instance
   * @param success If the validation was successful
   * @param message The validation message, if validation failed
   */
  constructor(success: boolean = true, message: string = '') {
    this.success = success;
    this.message = message;
  }
}
