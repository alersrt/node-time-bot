const assert = require('assert');
const chai = require('chai');

/**
 * Simple case for testing of unit-test framework.
 */
describe('The first assertion', () => {
  it('Should be true', () => {
    let testedVariable = true;
    let expectedValue = true;
    chai.expect(testedVariable).equals(expectedValue);
  });

  it('Should be false', () => {
    let testedVariable = false;
    let expectedValue = true;
    assert.equal(testedVariable, expectedValue, 'tested variable does not have expected value');
  });

  it('Different values', () => {
    let testedVariable = false;
    let expectedValue = true;
    assert.notEqual(testedVariable, expectedValue);
  });
});