import formatNumber from '../src/utils/formatNumber';

describe('formatNumber', () => {
  it('should format numbers greater than or equal to a trillion as T', () => {
    expect(formatNumber(1_000_000_000_000)).toBe('1.0T');
    expect(formatNumber(2_500_000_000_000)).toBe('2.5T');
  });

  it('should format numbers greater than or equal to a billion as B', () => {
    expect(formatNumber(1000000000)).toBe('1.0B');
    expect(formatNumber(999999999)).toBe('1000.0M');
  });

  it('should format numbers greater than or equal to a million as M', () => {
    expect(formatNumber(1000000)).toBe('1.0M');
    expect(formatNumber(2500000)).toBe('2.5M');
    expect(formatNumber(5000000)).toBe('5.0M');
  });

  it('should return numbers less than 1000 as strings without formatting', () => {
    expect(formatNumber(500)).toBe('500');
    expect(formatNumber(999)).toBe('999');
  });
});