'use client'

import React, { useRef, useEffect, CSSProperties, JSX, memo } from 'react'

import { init, getInstanceByDom } from 'echarts'

import { cn } from '@/utils'

import type { ECharts, SetOptionOpts } from 'echarts'

interface EChartProps {
  option: echarts.EChartsOption
  style?: CSSProperties
  settings?: SetOptionOpts
  loading?: boolean
  theme?: 'light' | 'dark'
  id: string
  notMerge?: boolean
  replaceMerge?: string[]
  lazyUpdate?: boolean
  className?: string
}

const EChart = ({
  option,
  style,
  settings,
  loading,
  theme,
  id,
  notMerge = false,
  replaceMerge = undefined,
  lazyUpdate = false,
  className = ''
}: EChartProps): JSX.Element => {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let chart: ECharts | undefined
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme)
    }

    function resizeChart() {
      chart?.resize()
    }
    window?.addEventListener('resize', resizeChart)

    return () => {
      chart?.dispose()
      window?.removeEventListener('resize', resizeChart)
    }
  }, [theme])

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)
      chart?.setOption(
        {
          backgroundColor: theme == 'dark' ? '#0f0d26' : '#fff',
          ...option,
          fontFamily: 'Golos Text',
          tooltip: {
            ...(option?.tooltip || {}),
            backgroundColor: theme == 'dark' ? '#131313' : '#fff'
          }
        },
        {
          ...settings,
          notMerge,
          replaceMerge,
          lazyUpdate
        }
      )
    }
  }, [option, settings, theme, notMerge, replaceMerge, lazyUpdate])

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)
      if (loading === true) {
        chart?.showLoading()
      } else {
        chart?.hideLoading()
      }
    }
  }, [loading, theme])

  return (
    <div
      id={id}
      ref={chartRef}
      style={{ width: '100%', height: '100%', margin: 'auto', ...style }}
      className={cn(className)}
    />
  )
}

export default memo(EChart)
