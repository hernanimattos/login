<template>

  <section class="]con">
    <nav
      class="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
      >
        <div class="navbar-start">
          <router-link
            class="navbar-item"
            :to="{ name: 'department', params: { id: '444'}}"
          >Departamentos</router-link>

          <a class="navbar-item">
            <router-link
              class="navbar-item"
              :to="{ name: 'employee'}"
            > Funcionários</router-link>

          </a>

        </div>

      </div>
    </nav>
  </section>

</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('auth');

import LField from '../ui-components/l-field';
export default {
  name: 'admin',
  data() {
    return {
      formFields: {
        email: '',
        password: ''
      },
      rules: {
        email: {
          required: true,
          message: 'Preencha o nome do usuário'
        },
        password: {
          required: true,
          message: 'Preencha o e-mail'
        }
      }
    };
  },
  methods: {
    ...mapActions(['auth']),
    authValidate() {
      if (this.validate()) {
        this.auth(this);
      }
    },

    validate() {
      return this.$children.some(field => {
        if (
          this.$data.rules[field.$attrs.prop] &&
          this.$data.rules[field.$attrs.prop].required
        ) {
          if (!this.$data.formFields[field.$attrs.prop]) {
            field.typeChange('is-danger');
            field.messageChange(this.$data.rules[field.$attrs.prop].message);
            return false;
          }
          return true;
        }
      });
    }
  },
  components: {
    LField
  }
};
</script>


