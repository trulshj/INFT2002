// @flow

import auth from '../src/auth';

describe('Functions work as needed', () => {
  test('hashPassword is consistent', () => {
    const salt = auth.makeSalt(10);
    const passwordHash1 = auth.hashPassword('hello123', salt);
    const passwordHash2 = auth.hashPassword('hello123', salt);

    expect(passwordHash1).toEqual(passwordHash2);
  });

  test('salt is different each time', () => {
    const salt1 = auth.makeSalt();
    const salt2 = auth.makeSalt();
    const salt3 = auth.makeSalt();

    expect(salt1 == salt2).toBeFalsy();
    expect(salt1 == salt3).toBeFalsy();
    expect(salt2 == salt3).toBeFalsy();
  });
});

describe('Functions fail as they should', () => {
  test('makeSalt() only accepts integers', () => {
    expect(() => {
      let salt = auth.makeSalt(3.14);
    }).toThrow();

    expect(() => {
      // $FlowExpectedError
      let salt = auth.makeSalt('Not an integer');
    }).toThrow();
  });

  test('hashPassword() needs both salt and password input', () => {
    expect(() => {
      // $FlowExpectedError
      auth.hashPassword('hello123');
    }).toThrow();

    expect(() => {
      // $FlowExpectedError
      auth.hashPassword();
    }).toThrow();
  });

  test('hashPassword() only accepts strings', () => {
    expect(() => {
      // $FlowExpectedError
      auth.hashPassword(12345, 'salt');
    }).toThrow();

    expect(() => {
      // $FlowExpectedError
      auth.hashPassword('12345', 12345);
    }).toThrow();

    expect(() => {
      // $FlowExpectedError
      auth.hashPassword(12345, 12345);
    }).toThrow();
  });
});
