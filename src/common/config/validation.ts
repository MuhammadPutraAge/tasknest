import {
  HttpException,
  HttpStatus,
  ValidationPipeOptions,
} from '@nestjs/common';

export const validationPipeOptions: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: (errors) => {
    const formattedErrors = errors.reduce<Record<string, string>>(
      (acc, err) => {
        if (err.constraints) {
          const firstMessage = Object.values(err.constraints)[0];
          acc[err.property] = firstMessage;
        }
        return acc;
      },
      {},
    );

    return new HttpException('Validation failed', HttpStatus.BAD_REQUEST, {
      cause: formattedErrors,
    });
  },
};
