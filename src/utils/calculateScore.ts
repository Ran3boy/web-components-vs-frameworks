export type BenchmarkItem = {
  technology: string;
  loadTimeMs: number;
  renderTimeMs: number;
  bundleSizeKb: number;
  dependenciesCount: number;
  complexityScore: number;
  reusabilityScore: number;
  maintainabilityScore: number;
  runtimeRequired: boolean;
};

export function calculateFinalScore(item: BenchmarkItem): number {
  const performanceScore = 10 - Math.min(10, (item.loadTimeMs + item.renderTimeMs) / 50);
  const bundleScore = 10 - Math.min(10, item.bundleSizeKb / 20);
  const dependencyScore = 10 - Math.min(10, item.dependenciesCount * 1.5);
  const simplicityScore = 10 - item.complexityScore;
  const qualityScore = (item.reusabilityScore + item.maintainabilityScore) / 2;

  const finalScore =
    performanceScore * 0.25 +
    bundleScore * 0.2 +
    dependencyScore * 0.15 +
    simplicityScore * 0.15 +
    qualityScore * 0.25;

  return Number(finalScore.toFixed(1));
}