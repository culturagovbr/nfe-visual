<template>
  <v-app>
    <v-toolbar
        color="blue darken-3"
        dark
        app
        :clipped-left="$vuetify.breakpoint.mdAndUp"
        fixed
    >
    <v-toolbar-title style="width: 300px" class="ml-0 pl-3" to="/">
        <v-btn class="hidden-sm-and-down" flat>NF-E Visual</v-btn>
    </v-toolbar-title>
        <v-text-field
                append-icon="search"
                label="Search"
                solo-inverted
                flat
                class="mx-3"
                @keyup.enter="search(searchNota)"
                v-model="searchNota"
        ></v-text-field>
    <v-spacer></v-spacer>
      <v-menu
              transition="slide-y-transition"
              bottom
      >
        <v-btn
                slot="activator"
                :icon="$vuetify.breakpoint.smAndDown"
                class="pa-0"
                flat
        >
          <v-avatar
                  color="teal"
                  size="30px"
                  class="mr-1 left">
              <span class="white--text headline">{{ primeiraLetraNomeUsuario }}</span>
          </v-avatar>
            <span class="hidden-sm-and-down text-capitalize">{{ nomeUsuario }}</span>
          <v-icon
                  right
                  dark
                  class="ma-0 hidden-sm-and-down">arrow_drop_down</v-icon>
        </v-btn>

        <v-card style="width: 360px;">
          <v-list>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <v-avatar
                        color="blue darken-3"
                        size="35px"
                        class="mr-1 left">
                    <span class="white--text headline">{{ primeiraLetraNomeUsuario }}</span>
                </v-avatar>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title> {{ (this.usuarioGetter ? this.usuarioGetter.data.auth.usu_nome : '') }} </v-list-tile-title>
                <v-list-tile-sub-title>{{ (this.usuarioGetter ? this.usuarioGetter.data.auth.usu_identificacao : '' ) | cpf }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-divider/><v-divider/>
          <v-list>
            <v-list-tile :to="'/nfe/admin/certificado'" >
              <v-list-tile-action>
                <v-icon color="indigo">note_add</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>Cadastrar Certificado</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile  :to="'/nfe/admin/listar-certificados'">
              <v-list-tile-action>
                <v-icon color="indigo">list</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>Listar Certificados</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>

<!--    <p>{{(this.usuarioGetter ? this.usuarioGetter.data.auth.usu_identificacao : '111111111111' ) | cpf}}<br>-->
<!--    {{(this.usuarioGetter ? this.usuarioGetter.data.auth.usu_nome : '')}}</p>-->
    <!--v-menu
        :close-on-content-click="false"
        offset-y
    >
        <v-avatar
            color="indigo"
            slot="activator"
        >
            <v-icon dark>account_circle</v-icon>
        </v-avatar>
        <v-card style="width: 440px;">
            <v-list>
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <v-avatar
                            color="teal"
                            size="35px"
                            class="mr-1 left"
                        >
                            <span class="white--text headline">U</span>
                        </v-avatar>
                    </v-list-tile-avatar>
                    <v-list-tile-content v-if="(typeof this.usuarioGetter !== 'undefined' && Object.keys(this.usuarioGetter).length > 0)">
                        <v-list-tile-title >{{this.usuarioGetter.data.auth.usu_identificacao}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{this.usuarioGetter.data.auth.usu_nome}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-divider/>
        </v-card>
    </v-menu-->
    </v-toolbar>

    <v-content>
        <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  filters: {
    cpf(value) {
      return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    },
  },
  data() {
    return {
      searchNota: '',
    };
  },
  created() {
    this.syncUsuarioLocalAction();
  },
  computed: {
    ...mapGetters({
      usuarioGetter: 'usuario/usuarioGetter',
    }),
    usuario() {
      return (typeof this.usuarioGetter !== 'undefined' && Object.keys(this.usuarioGetter).length > 0) ? this.usuarioGetter : {};
    },
    primeiraLetraNomeUsuario() {
      return this.usuarioGetter.data.auth.usu_nome.substr(0, 1);
    },
    nomeUsuario() {
      return this.usuarioGetter.data.auth.usu_nome.split(' ')[0];
    },
  },
  methods: {
    ...mapActions({
      syncUsuarioLocalAction: 'usuario/syncUsuarioLocalAction',
    }),
    search() {
      this.$router.push(`/nfe/nota/${this.searchNota}`);
      this.searchNota = '';
    },
  },
};
</script>
