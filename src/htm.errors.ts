import { ErrorCode, ErrorType } from './lib/error/error.type';

const subdomain = 'HRM';

const HRMErrors = {
  USER_NOT_EXISTS: (): ErrorCode => ({
    code: '0001',
    title: 'Invalid product',
    subdomain,
    description: 'Invalid product',
    httpCode: 400,
    type: ErrorType.PAYLOAD_CONTENT_ERROR,
  }),
  USER_UPDATE_NOT_EXISTS: (): ErrorCode => ({
    code: '0002',
    title: 'Invalid product',
    subdomain,
    description: 'Invalid product',
    httpCode: 400,
    type: ErrorType.PAYLOAD_CONTENT_ERROR,
  }),
  ROLE_UPDATE_NOT_EXISTS: (): ErrorCode => ({
    code: '0003',
    title: 'Invalid role',
    subdomain,
    description: 'Invalid role',
    httpCode: 400,
    type: ErrorType.PAYLOAD_CONTENT_ERROR,
  }),
  ROLE_NOT_EXISTS: (): ErrorCode => ({
    code: '0004',
    title: 'Invalid role',
    subdomain,
    description: 'Invalid role',
    httpCode: 400,
    type: ErrorType.PAYLOAD_CONTENT_ERROR,
  }),
};

export default HRMErrors;
