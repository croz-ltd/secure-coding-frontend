import {ValidationErrorsResponse} from "../api/types";

export type ValidationError<T> = {
  field: keyof T,
  error: {
    type: "custom",
    message: string
  }
}

export function mapValidationErrorResponse<T>(errorResponse: ValidationErrorsResponse<T>): ValidationError<T>[] {
  const validationErrors: ValidationError<T>[] = [];

  let key: keyof ValidationErrorsResponse<T>;
  for (key in errorResponse) {
    const errorMessages = errorResponse[key];

    for (const errorMessage of errorMessages) {
      validationErrors.push({
        field: key,
        error: {
          type: "custom",
          message: errorMessage
        }
      })
    }
  }

  return validationErrors;
}
