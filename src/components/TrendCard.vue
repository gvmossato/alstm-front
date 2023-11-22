<template>
  <v-container fluid v-if="loaded">
    <v-row>
      <v-col :class="`card ${cardData.class}`">
        <p>
          <b>{{ cardData.label }}</b>
        </p>
        <p>{{ cardData.text }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {
  name: 'TrendCard',

  props: {
    loaded: {
      type: Boolean,
      default: false,
      required: true
    },
    trendUp: {
      type: Boolean,
      default: false,
      required: true
    }
  },

  data: () => ({
    cardUp: {
      label: 'COMPRAR',
      text: 'Tendência de Subida!',
      class: 'upCard'
    },

    cardDown: {
      label: 'VENDER',
      text: 'Tendência de Queda!',
      class: 'downCard'
    }
  }),

  computed: {
    cardData() {
      return this.trendUp ? this.cardUp : this.cardDown
    }
  }
}
</script>

<style scoped>
.card {
  text-align: center;
  padding: 5px;
  color: white;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  justify-content: space-around;

  @media screen and (max-width: 600px) {
    display: flex;
  }
}
.upCard {
  background: linear-gradient(135deg, rgb(0, 192, 80) 0%, rgb(8, 68, 0) 100%);
}

.downCard {
  background: linear-gradient(135deg, rgb(192, 0, 0) 0%, rgb(68, 0, 0) 100%);
}
</style>
