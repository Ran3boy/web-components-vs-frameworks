import { BenchmarkItem, calculateFinalScore } from '../utils/calculateScore';

export const rawBenchmarkResults: BenchmarkItem[] = [
  {
    technology: "Web Components",
    loadTimeMs: 120,
    renderTimeMs: 35,
    bundleSizeKb: 18,
    dependenciesCount: 0,
    complexityScore: 6,
    reusabilityScore: 9,
    maintainabilityScore: 7,
    runtimeRequired: false,
  },
  {
    technology: "React",
    loadTimeMs: 160,
    renderTimeMs: 45,
    bundleSizeKb: 45,
    dependenciesCount: 2,
    complexityScore: 4,
    reusabilityScore: 8,
    maintainabilityScore: 9,
    runtimeRequired: true,
  },
  {
    technology: "Vue",
    loadTimeMs: 150,
    renderTimeMs: 42,
    bundleSizeKb: 40,
    dependenciesCount: 2,
    complexityScore: 4,
    reusabilityScore: 8,
    maintainabilityScore: 8,
    runtimeRequired: true,
  },
  {
    technology: "Angular",
    loadTimeMs: 220,
    renderTimeMs: 60,
    bundleSizeKb: 95,
    dependenciesCount: 5,
    complexityScore: 7,
    reusabilityScore: 8,
    maintainabilityScore: 8,
    runtimeRequired: true,
  }
];

export const benchmarkResults = rawBenchmarkResults.map(item => ({
  ...item,
  finalScore: calculateFinalScore(item)
}));