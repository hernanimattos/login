<template>
  <div class="container">
    <div class="is-centered">
      <section>
        <form @submit.prevent="">

          <div class="columns">
            <div class="column">

              <l-field
                prop="_id"
                label="Id"
              >
                <b-input
                  v-model="formFields._id"
                  placeholder="Não esqueça o Id"
                />
              </l-field>
            </div>
            <div class="column">

              <l-field
                prop="department"
                label="Departamento"
              >
                <b-select
                  placeholder="Selecione o departamento"
                  expanded
                  v-model="formFields.department"
                >
                  <option
                    value=""
                    selected
                  >Selecione</option>
                  <option
                    v-for="department in departments"
                    :value="department.name"
                    :key="department._id"
                  >{{department.name}}</option>
                </b-select>
              </l-field>

            </div>
            <div
              class="column"
              v-if="userData.admin"
            >

              <l-field
                prop="admin"
                label="Admin"
              >
                <b-select
                  placeholder="Selecione o departmento"
                  v-model="formFields.admin"
                  expanded
                >
                  <option
                    value=""
                    selected
                  >Selecione</option>
                  <option value="1">Sim</option>
                  <option value="0">Não</option>
                </b-select>

              </l-field>

            </div>
          </div>
          <div class="columns">
            <div class="column">
              <l-field
                prop="name"
                label="Nome"
              >
                <b-input
                  placeholder="Nome"
                  v-model="formFields.name"
                />
              </l-field>
            </div>
            <div class="column">

              <l-field
                prop="password"
                label="Senha"
              >
                <b-input
                  type="password"
                  placeholder="Senha"
                  v-model="formFields.password"
                />
              </l-field>
            </div>
            <div class="column">
              <l-field
                prop="email"
                label="E-mail"
              >
                <b-input
                  type="email"
                  placeholder="E-mail"
                  v-model="formFields.email"
                />
              </l-field>

            </div>
          </div>
          <div class="columns">
            <div class="column">

              <b-field v-if="!userData.admin">
                <button
                  class="button is-primary"
                  @click="edit"
                >Editar</button>
              </b-field>

              <b-field v-else>
                <button
                  class="button is-primary"
                  @click="formFields"
                >Salvar</button>
              </b-field>

            </div>
          </div>
        </form>

        <div
          class="table-employee"
          v-if="userData.admin"
        >
          <b-table
            :data="employers"
            :columns="columns"
            :selected.sync="rowSelected"
            focusable
          />
        </div>

      </section>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapState } = createNamespacedHelpers('auth');
import { Toast } from 'buefy/dist/components/toast';

import LField from '../ui-components/l-field';
import _ from 'lodash';
import { version } from 'punycode';
export default {
  name: 'employe',
  data() {
    return {
      rowSelected: {},
      userData: JSON.parse(localStorage.getItem('userData')),
      columns: [
        {
          field: '_id',
          label: 'ID'
        },
        {
          field: 'name',
          label: 'Nome'
        },
        {
          field: 'department',
          label: 'Departamento'
        },
        {
          field: 'email',
          label: 'E-mail'
        }
      ],
      formFields: {
        _id: '',
        name: '',
        password: '',
        department: '',
        email: '',
        admin: ''
      },
      rules: {
        _id: {
          required: true,
          message: 'Defina um id'
        },
        name: {
          required: true,
          message: 'Preencha o nome do usuário'
        },
        department: {
          required: true,
          message: 'Escolha o departamento'
        },
        password: {
          required: true,
          message: 'Escolha uma senha'
        }
      }
    };
  },
  watch: {
    rowSelected: {
      handler(value) {
        this.formFields = value;
      }
    }
  },
  computed: {
    ...mapState(['employers', 'departments'])
  },
  methods: {
    ...mapActions(['saveEmployee', 'editEmployee']),
    edit() {
      if (this.validateForm()) {
        this.editEmployee(this.employers);
      }
    },

    validateSave() {
      const { formFields } = this.$data;
      const { _id: id } = formFields;

      if (!this.findEmployeeById(id) && this.validateForm()) {
        this.saveEmployee(formFields);
      } else {
        Toast.open({
          duration: 5000,
          message: 'N',
          type: 'is-danger'
        });
        return false;
      }
    },

    chargeUserNotAdmin() {
      const user = _.filter(this.employers, this.userData);
      const { admin } = user[0];

      if (!admin) {
        this.formFields = user[0];
      }
    },
    findEmployeeById(id) {
      return this.employers.some(employee => employee._id == id);
    },
    validateForm() {
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
  created() {
    this.chargeUserNotAdmin();
  },
  components: {
    LField
  }
};
</script>

<style>
.table-employee {
  margin-top: 2rem;
}
</style>

