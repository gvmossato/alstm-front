<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="9">
        <h1>
          <span>Previsão do Índice </span>
          <span class="text-blue-grey-darken-2">S&P500 </span>
          <span>Utilizando </span>
          <span class="text-pink-accent-3">LSTM </span>
          <span>e </span>
          <span class="text-pink-accent-3">Mecanismos de Atenção </span>
        </h1>
      </v-col>
      <v-col class="d-flex align-center" cols="12" sm="3">
        <TrendCard :loaded="loaded" :trendUp="trendUp" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="chart-container" cols="12">
        <LineChart :loaded="loaded" :chartData="chartData" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import LineChart from '@/components/LineChart.vue'
import TrendCard from '@/components/TrendCard.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  components: {
    LineChart,
    TrendCard
  },

  data: () => ({
    loaded: false,
    dataFetched: [],
    trendUp: false,

    chartData: {
      labels: [],
      close: [],
      predClose: []
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

      this.chartData = {
        labels: this.dataFetched.map(({ value }) => value.date),
        close: this.dataFetched.map(({ value }) => value.close ?? null),
        predClose: this.dataFetched.map(({ value }) => value.pred_close)
      }
    },

    updateTrend() {
      if (!this.dataFetched?.length || !this.loaded) return

      const sorted = [...this.dataFetched].sort((a, b) => a.key - b.key)
      const lastClose = sorted.at(-2).value.close
      const lastPredClose = sorted.at(-1).value.pred_close

      this.trendUp = lastPredClose >= lastClose
    }
  }
}
</script>

<style scoped>
.v-container {
  width: 100vw;
}
</style>
