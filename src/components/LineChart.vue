<template>
  <apexchart
    v-if="loaded"
    type="area"
    :options="chartOptions"
    :series="chartSeries"
    :height="dynamicHeight"
  />
  <v-range-slider
    v-model="sliderRange"
    :max="chartData.labels.length"
    min="0"
    step="5"
    prepend-icon="mdi-calendar-expand-horizontal"
  />
</template>

<script lang="ts">
import ptbr from 'apexcharts/dist/locales/pt-br.json'
import VueApexCharts from 'vue3-apexcharts'

export default {
  name: 'LineChart',

  data: () => ({
    sliderRange: [0, 0],
    initialHorizon: 40
  }),

  components: {
    apexchart: VueApexCharts
  },

  props: {
    loaded: {
      type: Boolean,
      default: false,
      required: true
    },
    chartData: {
      type: Object,
      default: () => ({
        labels: [],
        close: [],
        predClose: []
      }),
      required: true
    }
  },

  watch: {
    chartData() {
      this.sliderRange = [
        this.chartData.labels.length - this.initialHorizon,
        this.chartData.labels.length
      ]
    }
  },

  computed: {
    dynamicHeight() {
      return window.innerHeight < 680 ? '350vh' : '600vh'
    },

    maxSliderValue() {
      return this.chartData.labels.length
    },

    filteredChartData() {
      return {
        labels: this.chartData.labels.slice(...this.sliderRange),
        close: this.chartData.close.slice(...this.sliderRange),
        predClose: this.chartData.predClose.slice(...this.sliderRange)
      }
    },

    chartSeries() {
      return [
        { name: 'Real', data: this.filteredChartData.close },
        { name: 'Previsto', data: this.filteredChartData.predClose }
      ]
    },

    chartOptions() {
      return {
        chart: {
          animations: {
            enabled: false
          },
          background: '#00000000',
          defaultLocale: 'pt-br',
          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 3,
            color: '#000',
            opacity: 0.35
          },
          fontFamily: 'Nunito',
          locales: [ptbr],
          type: 'area'
        },
        colors: ['#455A64', '#F50057'],
        dataLabels: { enabled: false },
        fill: {
          colors: ['#455A64', '#F50057'],
          opacity: 1.0,
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.1,
            opacityTo: 0.0
          }
        },
        forecastDataPoints: {
          count: 1,
          dashArray: 8
        },
        grid: {
          show: true,
          borderColor: '#90A4AE20',
          strokeDashArray: 8
        },
        legend: {
          show: true,
          position: 'bottom',
          fontSize: '14px',
          fontFamily: 'Nunito'
        },
        markers: {
          size: 0,
          strokeWidth: 0,
          fillOpacity: 1,
          shape: 'circle',
          showNullDataPoints: true,
          hover: {
            size: 8
          }
        },
        stroke: {
          curve: 'smooth',
          lineCap: 'round'
        },
        theme: {
          mode: 'dark'
        },
        xaxis: {
          type: 'datetime',
          categories: this.chartData.labels.slice(...this.sliderRange),
          labels: {
            datetimeUTC: true,
            datetimeFormatter: {
              year: 'yyyy',
              month: "MMM 'yy",
              day: 'dd MMM',
              hour: 'HH:mm'
            }
          },
          axisBorder: { show: false },
          axisTicks: { show: false },
          title: {
            text: 'Data'
          }
        },
        yaxis: {
          labels: {
            formatter: (v: Number) =>
              new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(v)
          },
          title: {
            text: 'Preço de Fechamento'
          }
        },
        tooltip: {
          enabled: true
        }
      }
    }
  }
}
</script>
