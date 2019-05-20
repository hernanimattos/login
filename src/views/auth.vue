<template>
  <div class="columns is-centered">
    <section>
      <form @submit.prevent="authValidate">
        <l-field
          prop="email"
          label="E-mail"
        >
          <b-input v-model="formFields.email" />
        </l-field>
        <l-field
          prop="password"
          label="Senha"
        >
          <b-input v-model="formFields.password" />
        </l-field>

        <b-field>
          <button class="button is-pimary">Enviar</button>
        </b-field>
      </form>
    </section>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapState } = createNamespacedHelpers('auth');

import LField from '../ui-components/l-field';
export default {
  name: 'auth',
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
  computed: {
    ...mapState(['employers'])
  },
  methods: {
    ...mapActions(['auth']),
    authValidate() {
      if (this.validate()) {
        this.auth(this);
      }
      return;
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

<style>
.container-form {
  width: 50%;
}
</style>

