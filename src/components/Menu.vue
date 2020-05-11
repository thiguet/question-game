<template>
  <div>
    <v-navigation-drawer color="indigo" v-model="opened" dark app>
      <v-list dense>
        <router-link :key="index" v-for="(menu, index) in getAvaiableMenus" :to="menu.path">
          <v-list-item @click="closeMenu" link>
            <v-list-item-action>
              <v-icon>{{menu.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{menu.name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link v-if="isLoggedIn" :to="LogoutRoute">
          <v-list-item @click="logout" link>
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
      <v-toolbar-title class="you-toolbar">{{activeMenu}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="you-toolbar" v-if="userName">Você: {{userName}}</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import RoutesPath from '@/router/types';
import { createNamespacedHelpers } from 'vuex';
import menus from '@/router/routes';

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('user');

export default {
  name: 'Menu',
  data: () => ({
    opened: false,
    menus,
    LogoutRoute: RoutesPath.Logout,
  }),
  computed: {
    ...mapState(['user']),
    ...mapGetters(['userName', 'role']),
    activeMenu() {
      return this.$route.name;
    },
    isLoggedIn() {
      return !!this.role;
    },
    getAvaiableMenus() {
      const { role } = this;
      const avaiableMenus = menus.filter((m) => {
        const { meta } = m;
        const { authorize } = meta;

        const menuHasAccessControl = authorize.length !== 0;
        const menuIsVisible = m.showOnMenu;
        const isUserPermitted = menuHasAccessControl && authorize.includes(role);

        if (!role) {
          return (menuIsVisible && !menuHasAccessControl);
        }
        if (menuHasAccessControl) {
          return menuIsVisible && isUserPermitted;
        }

        return false;
      });

      return avaiableMenus;
    },
  },
  methods: {
    ...mapActions({
      logoutAction: 'logout',
    }),
    closeMenu() {
      this.opened = false;
    },
    logout() {
      this.logoutAction();
    },
  },
};
</script>

<style scoped>
.v-application a {
  text-decoration: none;
}
.you-toolbar {
  font-size: 16px;
}
</style>
