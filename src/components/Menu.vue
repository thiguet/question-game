<template>
  <div>
    <v-navigation-drawer color="indigo" v-model="opened" dark app>
      <v-list dense>
        <router-link :key="index" v-for="(menu, index) in getAvaiableMenus()" :to="menu.path">
          <v-list-item @click="closeMenu" link>
            <v-list-item-action>
              <v-icon>{{menu.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{menu.name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link v-if="isLoggedIn" @click="logout" to="/l">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="opened = !opened" />
      <v-toolbar-title>{{activeMenu}}</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import menus from '@/router/routes';
import { currentUser, logout } from '@/_services/authServices';

export default {
  name: 'App',
  data: () => ({
    opened: false,
    menus,
  }),
  computed: {
    activeMenu() {
      return this.$route.name;
    },
    isLoggedIn() {
      return false;
    },
  },
  methods: {
    closeMenu() {
      this.opened = false;
    },
    logout() {
      logout();
    },
    getAvaiableMenus() {
      const { role } = currentUser;

      const avaiableMenus = menus.filter((m) => {
        const { meta } = m;
        const { authorize } = meta;

        return (authorize.length && authorize.includes(role)) || (!authorize.length);
      });

      return avaiableMenus;
    },
  },
};
</script>

<style scoped>
.v-application a {
    text-decoration: none;
}
</style>
