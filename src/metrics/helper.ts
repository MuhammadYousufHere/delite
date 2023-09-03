import { Counter, Gauge, Summary } from 'prom-client'

type LabelValues<T extends string> = Partial<Record<T, string | number>>
type MetricsCreator<T extends string> = (
  value: number,
  labels: LabelValues<T>
) => void
type TimerMetricsCreator<T extends string> = (
  labels: LabelValues<T>
) => () => number

export const metricsCreatorGen = () => {
  const counterCreator = <T extends string>(
    name: string,
    labelNames?: T[]
  ): MetricsCreator<T> => {
    const counter = new Counter({
      name,
      help: name,
      ...(labelNames && { labelNames })
    })
    return (value: number, labels: LabelValues<T>) => {
      counter.inc(labels, value)
    }
  }

  const guageCreator = <T extends string>(
    name: string,
    labelsNames?: T[]
  ): MetricsCreator<T> => {
    const guage = new Gauge({
      name,
      help: name,
      ...(labelsNames && labelsNames)
    })
    return (value: number, labels: LabelValues<T>) => {
      guage.set(labels, value)
    }
  }
  const timeCreator = <T extends string>(
    name: string,
    labelValues?: T[]
  ): TimerMetricsCreator<T> => {
    const summary = new Summary({
      name,
      help: name,
      ...(labelValues && labelValues)
    })
    return (labels: LabelValues<T>) => {
      const now = process.hrtime()
      return () => {
        const delta = process.hrtime(now)
        const value = delta[0] + delta[1] / 1e9
        summary.observe(labels, value)
        return value
      }
    }
  }

  return { guage: guageCreator, timer: timeCreator, counter: counterCreator }
}

export const metricsCreator = metricsCreatorGen()
