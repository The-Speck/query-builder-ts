import { quickUUID } from '../../src/utils';

describe('it', () => {
  it('returns practical guarantee of unique ids with default argument', () => {
    const maxNum = 100000;
    const uniqueSet = new Set();
    for (let i = 0; i < maxNum; i++) {
      uniqueSet.add(quickUUID());
    }
    expect(uniqueSet.size).toBe(maxNum);
  });
  it('returns varying size depending on passed argument', () => {
    const uuid1 = quickUUID(1);
    const uuid2 = quickUUID(2);
    const uuid3 = quickUUID(3);

    expect(uuid1.length).toBeLessThan(uuid2.length);
    expect(uuid2.length).toBeLessThan(uuid3.length);
  });
});
