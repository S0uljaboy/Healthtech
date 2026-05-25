import { SnapStrategy } from './snap.strategy';

describe('SnapStrategy', () => {
  let strategy: SnapStrategy;

  beforeEach(() => {
    strategy = new SnapStrategy();
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should calculate score correctly', () => {
    const answers = [
      { score: 3 },
      { score: 2 },
      { score: 0 },
      { score: 1 }
    ];

    const result = strategy.calculateScore(answers as any);
    expect(result).toBe(6);
  });

  it('should handle empty answers', () => {
    const result = strategy.calculateScore([]);
    expect(result).toBe(0);
  });
});
