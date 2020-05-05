import Role from '@/layouts/roles';
import Question from '@/views/Question.vue';
import AddQuestion from '@/views/AddQuestion.vue';
import Ranking from '@/views/Ranking.vue';
import Config from '@/views/Config.vue';
import LoginAdmin from '@/views/LoginAdmin.vue';
import LoginPlay from '@/views/LoginPlay.vue';

export default [
  {
    path: '/q',
    name: 'Pergunta',
    component: Question,
    icon: 'mdi-arrow-right',
    meta: {
      authorize: [
        Role.Student,
      ],
    },
  },
  {
    path: '/aq',
    name: 'Nova Pergunta',
    component: AddQuestion,
    icon: 'mdi-plus',
    meta: {
      authorize: [
        Role.Admin,
      ],
    },
  },
  {
    path: '/r',
    name: 'Pontuação',
    component: Ranking,
    icon: 'mdi-view-dashboard',
    meta: {
      authorize: [
        Role.Student,
        Role.Admin,
      ],
    },
  },
  {
    path: '/c',
    name: 'Configurações',
    component: Config,
    icon: 'mdi-cog',
    meta: {
      authorize: [
        Role.Admin,
      ],
    },
  },
  {
    path: '/l',
    name: 'Jogar',
    component: LoginPlay,
    icon: 'mdi-login',
    meta: {
      authorize: [],
    },
  },
  {
    path: '/a',
    name: 'ADM',
    component: LoginAdmin,
    icon: 'mdi-lock',
    meta: {
      authorize: [],
    },
  },
];
