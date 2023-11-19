<template>
  <main>
    <div style="display: flex">
      <h1>Previsão do Índice S&P 500 Utilizando Redes LSTM e Mecanismos de Atenção</h1>
      <div v-if="loaded" :class="trendUp ? 'green' : 'red'">
        Tendência de {{ trendUp ? 'Subida' : 'Queda' }}!
        <br/>
        <b>{{ trendUp ? 'COMPRAR' : 'VENDER' }}</b>
      </div>

    </div>
    <LineChart :loaded="loaded" :chartData="chartData" />
  </main>
</template>

<script lang="ts">
import axios from 'axios'
import LineChart from '@/components/LineChart.vue'

export default {
  name: 'HomeView',
  components: {
    LineChart
  },

  data: () => ({
    loaded: false,
    dataFetched: null,
    trendUp: null,

    chartData: {
      labels: [],
      datasets: [
        {
          label: 'Close',
          borderColor: '#f87979',
          backgroundColor: 'transparent',
          data: []
        },
        {
          label: 'Predicted Close',
          borderColor: '#0545f8',
          backgroundColor: 'transparent',
          data: []
        }
      ]
    }
  }),

  watch: {
    dataFetched() {
      this.updateChartData()
      this.updateTrend()
    }
  },

  async mounted() {
    await this.fetchData()
  },

  methods: {
    async fetchData() {
      this.loaded = false

      const url = import.meta.env.VITE_CLOUDANT_URL
      const auth = btoa(
        `${import.meta.env.VITE_CLOUDANT_USERNAME}:${import.meta.env.VITE_CLOUDANT_API_KEY}`
      )

      try {
        const { data } = await axios.get(url, { headers: { Authorization: `Basic ${auth}` } })
        this.dataFetched = data.rows
      } catch (e) {
        console.error(e)
      } finally {
        this.loaded = true
      }
    },

    updateChartData() {
      if (!this.dataFetched?.length || !this.loaded) return

      const labels = this.dataFetched.map(({ value }) => value.date)
      const close = this.dataFetched.map(({ value }) => value.close)
      const predClose = this.dataFetched.map(({ value }) => value.pred_close)

      this.chartData = {
        labels: labels,
        datasets: [
          { ...this.chartData.datasets[0], data: close },
          { ...this.chartData.datasets[1], data: predClose }
        ]
      }
    },

    updateTrend() {
      if (!this.dataFetched?.length || !this.loaded) return

      this.dataFetched.sort((a, b) => a.key - b.key)

      lastClose = this.dataFetched.at(-2).value.close
      lastPredClose = this.dataFetched.at(-1).value.pred_close
      this.trendUp = lastPredClose >= lastClose
    }
  }
}
</script>

<style scoped>
  .green {
    width: 300px;
    text-align: center;
    margin: auto;
    padding: 10px;
    background: linear-gradient(135deg, rgb(0, 192, 80) 0%, rgb(8, 68, 0) 100%);
    color: white;
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  }

  .red {
    width: 300px;
    text-align: center;
    margin: auto;
    padding: 10px;
    background: linear-gradient(135deg, rgb(192, 0, 0) 0%, rgb(68, 0, 0) 100%);
    color: white;
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    margin-left: 30px;
  }
</style>
