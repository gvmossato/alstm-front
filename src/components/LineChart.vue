<template>
    <Line v-if="loaded" :data="chartData" :options="chartOptions" />
</template>

<script lang="ts">
import { Line } from 'vue-chartjs'
import 'chartjs-adapter-date-fns';
import {
  Chart as ChartJS,
  registerables,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  TimeScale // Importe TimeScale aqui
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  TimeScale,
  ...registerables,
)

export default {
  name: 'LineChart',

  components: {
    Line
  },

  props: {
    loaded: {
      type: Boolean,
      default: false,
      required: true
    },

    chartData: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },

  data: () => ({
    chartOptions: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            tooltipFormat: 'MMM dd, yyyy',
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom'
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      elements: {
        line: {
          tension: 0.4 // This is to set the smoothness of the line
        },
        point: {
          radius: 5 // To set the radius of the points
        }
      },
      animation: {
        duration: 1000, // general animation time
      }
    }
  })
}
</script>
