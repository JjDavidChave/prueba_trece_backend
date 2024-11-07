import {
  PipeTransform,
  Injectable,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  // errors = {
  //   any: {
  //     required: 'Este campo es obligatorio',
  //   },
  //   string: {
  //     min: 'La longitud mínima es {{limit}}',
  //     max: 'La longitud máxima es {{limit}}',
  //   },
  //   number: {
  //     min: 'El valor mínimo es {{limit}}',
  //     max: 'El valor máximo es {{limit}}',
  //   },
  //   date: {
  //     min: 'La fecha mínima es {{limit}}',
  //     max: 'La fecha máxima es {{limit}}',
  //   },
  // };

  transform(initialValue: any) {
    const { error, value } = this.schema.validate(initialValue, {
      abortEarly: false, // abort after the last validation error
      allowUnknown: true, // allow unknown keys that will be ignored
      stripUnknown: true, // remove unknown keys from the validated data
    });
    if (error) {
      const errorMessages = error.details.map((d) => ({
        message: d.message,
        field: d.context.label,
      }));
      // const errorMessages: object = this.prepareErrorFields(error);
      const joiError: any = {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        errorMessages,
        message: 'There are errors in the form',
      };

      throw new HttpException(joiError, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return value;
  }

  // prepareErrorFields(joiError: ValidationError) {
  //   const errorMessages = {};
  //   joiError.details.forEach((error) => {
  //     if (error.context.key) {
  //       const limit = this.getErrorLimit(error);
  //       const message = this.getErrorMessage(error.type, limit);

  //       this.assignErrorToField(errorMessages, error.path, message);
  //     }
  //   });

  //   return errorMessages;
  // }

  //   getErrorLimit(error) {
  //     let limit;

  //     switch (error.type) {
  //       case 'string.min':
  //       case 'string.max':
  //       case 'number.min':
  //       case 'number.max':
  //         limit = error.context.limit;
  //         break;
  //       case 'date.min':
  //       case 'date.max':
  //         limit = moment.utc(error.context.limit).format('DD-MM-YYYY HH:mm');
  //         break;
  //     }

  //     return limit;
  //   }

  // getErrorMessage(errorType: string, limit): string {
  //   const errorParts = errorType.split('.');
  //   const defaultMessage = 'El valor de este campo es incorrecto';
  //   let errorMessageNotDefined = false;
  //   let message = this.errors;

  //   for (let i = 0; i < errorParts.length && !errorMessageNotDefined; i++) {
  //     message = message[errorParts[i]] || defaultMessage;

  //     if (!this.errors[errorParts[i]]) {
  //       errorMessageNotDefined = true;
  //     }
  //   }

  //   return message.toString().replace('{{limit}}', limit);
  // }

  //   assignErrorToField(errorMessages, fieldPath: string, message: string) {
  //     const lastKeyIndex = fieldPath.length - 1;
  //     for (let i = 0; i < lastKeyIndex; ++i) {
  //       const keyErrorMsg = fieldPath[i];
  //       if (!(keyErrorMsg in errorMessages)) {
  //         errorMessages[keyErrorMsg] = {};
  //       }
  //       errorMessages = errorMessages[keyErrorMsg];
  //     }

  //     if (!errorMessages[fieldPath[lastKeyIndex]]) {
  //       errorMessages[fieldPath[lastKeyIndex]] = [message];
  //     } else {
  //       errorMessages[fieldPath[lastKeyIndex]].push(message);
  //     }
  //   }
}
