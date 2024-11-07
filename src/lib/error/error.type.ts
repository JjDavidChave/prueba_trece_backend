import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const error = exception.getResponse() as ErrorCode;

    console.log(error);
    if (error?.httpCode) {
      response.status(error.httpCode).json(error);
    } else {
      response.status(500).json(error);
    }

    // response.status(status).json({
    //   statusCode: status,
    //   timestamp: new Date().toISOString(),
    //   path: request.url,
    // });
  }
}

enum ErrorType {
  LOGIC_ERROR = 'LOGIC_ERROR',
  EXTERNAL_RESOURCE_ERROR = 'EXTERNAL_RESOURCE_ERROR',
  PAYLOAD_CONTENT_ERROR = 'PAYLOAD_CONTENT_ERROR',
}

type ErrorSeverity = 'error' | 'warn' | 'info' | 'debug';
/**
 * error code information
 */
interface ErrorCode {
  code: string;
  title: string;
  description?: string;
  subdomain?: string;
  type?: ErrorType;
  details?: Record<string, any>;
  httpCode?: number;
  severity?: ErrorSeverity;
  logAsWarning?: boolean;
}

class ServiceError extends HttpException {
  /**
   * Unique id (microservice-subdomain-id)
   */
  id: string;

  /**
   * error code definition
   */
  error: ErrorCode;

  /**
   * error code definition
   */
  errorPayload: ErrorCode;

  /**
   * Log severity level (error, warning, info, debug)
   */
  severity?: ErrorSeverity;

  /**
   * Indicates the error must be log as a warning
   */
  logAsWarning?: boolean;

  constructor(payload: ErrorCode) {
    super(
      {
        id: `${payload.subdomain}-${payload.code}`,
        ...payload,
      },
      payload.httpCode,
    );
    // this.id = `${payload.subdomain}-${payload.code}`;
    // this.error = payload;
    // this.severity = payload.severity;
    // this.logAsWarning = payload.logAsWarning;
  }
}

export { ErrorCode, ErrorType, ServiceError };
