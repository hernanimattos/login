<template>
  <div class="columns is-centered">
    <section>
      <form>
        <l-field
          prop="_id"
          label="Id"
        >
          <b-input v-model="formFields._id" />
        </l-field>
        <l-field
          prop="name"
          label="Nome"
        >
          <b-input v-model="formFields.name" />
        </l-field>
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
        <l-field
          prop="department"
          label="Departamento"
        >
          <b-input v-model="formFields.department" />
        </l-field>
        <l-field
          prop="admin"
          label="Admin"
        >
          <b-input v-model="formFields.admin" />
        </l-field>

        <b-field>
          <button
            class="button is-pimary"
            @click="editProfile"
          >Enviar</button>
        </b-field>

        <b-field>
          <button
            class="button is-pimary"
            @click="saveProfile"
          >Enviar</button>
        </b-field>
      </form>
    </section>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('auth');

import LField from '../ui-components/l-field';
export default {
  name: 'department',
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
    ...mapActions(['saveDepartment', 'EditDepartment']),

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

