<template>
  <v-app>
    <v-main>
      <SmartFrame/>
    </v-main>
  </v-app>
</template>

<script>
import SmartFrame from './components/SmartFrame';

export default {
  name: 'App',

  components: {
    SmartFrame,
  },

  data: () => ({
    //
  }),
};
</script>
