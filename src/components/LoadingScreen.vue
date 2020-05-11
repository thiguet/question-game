<template>
  <div>
    <v-row justify="center">
      <v-col class="title" cols="10" md="12" align="center">
        <span class="title">Aguarde o ADM iniciar o jogo:</span>
      </v-col>
    </v-row>
    <v-row justify="center">
        <v-progress-circular
              :width="10"
              :size="70"
              indeterminate color="indigo"></v-progress-circular>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'Menu',
  data: () => ({
  }),
};
</script>

<style scoped>
</style>
