<template>
  <v-row justify="center">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn color="red" dark v-on="on">Deletar Dados dos Jogadores</v-btn>
      </template>
      <span>Isso irá apagar todos os registros do jogo.</span>
    </v-tooltip>
  </v-row>
</template>

<script>
export default {
  name: 'Config',
};
</script>
