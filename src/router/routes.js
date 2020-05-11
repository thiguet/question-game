import Role from '@/layouts/roles';
import RoutePaths from '@/router/types';
import Question from '@/views/Question.vue';
import AddQuestion from '@/views/AddQuestion.vue';
import Ranking from '@/views/Ranking.vue';
import Config from '@/views/Config.vue';
import LoginAdmin from '@/views/LoginAdmin.vue';
import LoginPlay from '@/views/LoginPlay.vue';
import Loading from '@/views/Loading.vue';

export default [
  {
    path: RoutePaths.Question,
    name: 'Pergunta',
    component: Question,
    icon: 'mdi-arrow-right',
    showOnMenu: true,
    meta: {
      authorize: [
        Role.Student,
      ],
    },
  },
  {
    path: RoutePaths.AddQuestion,
    name: 'Nova Pergunta',
    component: AddQuestion,
    icon: 'mdi-plus',
    showOnMenu: true,
    meta: {
      authorize: [
        Role.Admin,
      ],
    },
  },
  {
    path: RoutePaths.Ranking,
    name: 'Pontuação',
    component: Ranking,
    icon: 'mdi-view-dashboard',
    showOnMenu: true,
    meta: {
      authorize: [
        Role.Student,
        Role.Admin,
      ],
    },
  },
  {
    path: RoutePaths.Config,
    name: 'Configurações',
    component: Config,
    icon: 'mdi-cog',
    showOnMenu: true,
    meta: {
      authorize: [
        Role.Admin,
      ],
    },
  },
  {
    path: RoutePaths.Loading,
    name: '',
    component: Loading,
    icon: 'mdi-loading',
    showOnMenu: false,
    meta: {
      authorize: [
        Role.Student,
      ],
    },
  },
  {
    path: RoutePaths.LoginPlay,
    name: 'Login',
    component: LoginPlay,
    icon: 'mdi-login',
    showOnMenu: true,
    meta: {
      authorize: [],
    },
  },
  {
    path: RoutePaths.Admin,
    name: 'ADM',
    component: LoginAdmin,
    icon: 'mdi-lock',
    showOnMenu: true,
    meta: {
      authorize: [],
    },
  },
];
