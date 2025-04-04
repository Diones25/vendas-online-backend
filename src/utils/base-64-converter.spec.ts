import { authorizationToLoginPayload } from './base-64-converter';

describe('authorizationToLoginPayload', () => {
  it('should return undefined if the authorization string does not have three parts', () => {
    const result = authorizationToLoginPayload('invalid.token');
    expect(result).toBeUndefined();
  });

  it('should return undefined if the second part of the authorization string is empty', () => {
    const result = authorizationToLoginPayload('header..signature');
    expect(result).toBeUndefined();
  });

  it('should parse and return the payload if the authorization string is valid', () => {
    const payload = { username: 'testuser', role: 'admin' };
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const authorization = `header.${base64Payload}.signature`;

    const result = authorizationToLoginPayload(authorization);
    expect(result).toEqual(payload);
  });

  it('should throw an error if the payload is not a valid JSON', () => {
    const invalidBase64Payload = Buffer.from('invalid-json').toString('base64');
    const authorization = `header.${invalidBase64Payload}.signature`;

    expect(() => authorizationToLoginPayload(authorization)).toThrow(SyntaxError);
  });
});