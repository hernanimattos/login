import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import {
  Toast
} from 'buefy/dist/components/toast';

import {
  employers,
  departments
} from './mock';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: {
      namespaced: true,
      state: {
        employers,
        departments
      },
      mutations: {
        setEmployee(state, payload) {
          state.employers.push(payload);
        },
        updateEmployee(state, payload) {
          state.employers = payload
        }
      },
      actions: {
        auth({
          commit
        }, payload) {
          const {
            formFields,
            $router
          } = payload;
          const user = _.filter(employers, formFields);

          if (user.length > 0) {
            const {
              _id,
              admin,
              name
            } = user[0];

            localStorage.setItem(
              'userData',
              JSON.stringify({
                _id,
                admin,
                name
              })
            );

            $router.push({
              name: 'admin',
              params: {
                _id
              }
            });
          } else {
            Toast.open({
              duration: 5000,
              message: 'Usuário não encontrado',
              type: 'is-danger'
            });
          }
        },
        saveEmployee({
          commit
        }, payload) {
          commit('setEmployee', payload);
        },
        editEmployee({
          commit
        }, payload) {
          commit('updateEmployee', payload);
        }
      }
    }
  }
});
