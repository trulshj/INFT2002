// @flow

import funcs from '../src/auth';
import hashPassword from '../src/auth';

describe('Functions work as needed', () => {
  test('hashPassword is consistent', () => {
    const salt = funcs.makeSalt(10);
    const passwordHash1 = funcs.hashPassword('hello123', salt);
    const passwordHash2 = funcs.hashPassword('hello123', salt);

    expect(passwordHash1).toEqual(passwordHash2);
  });

  test('salt is different each time', () => {
    const salt1 = funcs.makeSalt();
    const salt2 = funcs.makeSalt();
    const salt3 = funcs.makeSalt();

    expect(salt1 == salt2).toBeFalsy();
    expect(salt1 == salt3).toBeFalsy();
    expect(salt2 == salt3).toBeFalsy();
  });
});

describe('Functions fail as they should', () => {
  test('makeSalt() only accepts integers', () => {
    expect(() => {
      let salt = funcs.makeSalt(3.14);
    }).toThrow();

    expect(() => {
      // $FlowExpectedError
      let salt = funcs.makeSalt('Not an integer');
    }).toThrow();
  });

  test('hashPassword() needs both salt and password input', () => {
    expect(() => {
      // $FlowExpectedError
      funcs.hashPassword('hello123');
    }).toThrow();

    expect(() => {
      // $FlowExpectedError
      funcs.hashPassword();
    }).toThrow();
  });

  test('hashPassword() only accepts strings', () => {
    expect(() => {
      // $FlowExpectedError
      funcs.hashPassword(12345, 'salt');
    }).toThrow();

    expect(() => {
      // $FlowExpectedError
      funcs.hashPassword('12345', 12345);
    }).toThrow();

    expect(() => {
      // $FlowExpectedError
      funcs.hashPassword(12345, 12345);
    }).toThrow();
  });
});
