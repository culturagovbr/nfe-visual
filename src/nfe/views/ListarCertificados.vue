<template>
    <div>
        <div v-if="loading">
            <carregando :text="'Lista de certificados'"/>
        </div>
        <v-container v-else>
            <v-card>
                <v-container fluid>
                    <v-layout
                            row
                            wrap>
                        <v-flex xs6>
                            <h2 class="mr-3 blue--text">Lista de Certificados</h2>
                        </v-flex>
                        <v-flex
                                xs5
                                offset-xs1
                                class=" text-xs-right">
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>

            <v-data-table
                    :headers="headers"
                    :items="listarCertificadoGetter"
                    class="elevation-1"
                    :pagination.sync="pagination"
            >
                <template v-slot:items="props">
                    <td class="text-xs-left">{{ props.item.razaosocial }}</td>
                    <td class="text-xs-left">{{ props.item.cnpj | cnpj }}</td>
                    <td class="text-xs-center">{{ props.item.tpAmb }}</td>
                    <td class="text-xs-left">{{ props.item.path }}</td>
                    <td class="justify-center layout px-0">
                        <v-icon
                                small
                                @click="dialogExcluir = true; itemIdParaExclusao = props.item._id;"
                        >
                            delete
                        </v-icon>
                    </td>
                </template>
            </v-data-table>
        </v-container>
        <!--dialog excluir-->
        <v-dialog
                v-model="dialogExcluir"
                :max-width="options.width"
                @keydown.esc="cancel"
                v-bind:style="{ zIndex: options.zIndex }"
        >
            <v-card>
                <v-toolbar dark :color="options.color" dense flat>
                    <v-toolbar-title class="white--text">Deletar</v-toolbar-title>
                </v-toolbar>
                <v-card-text>Deseja excluir o certificado? </v-card-text>
                <v-card-actions class="pt-0">
                    <v-spacer></v-spacer>
                    <v-btn color="grey" flat="flat" @click="dialogExcluir = false">Cancelar</v-btn>
                    <v-btn color="primary darken-1" flat="flat" @click="deletarItem">Sim</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import carregando from '@/components/carregando';

    export default {
        name: 'ListarCertificados',
        components : {
            carregando
        },
        data(){
            return {
                options: {
                    color: 'red',
                    width: 290,
                    zIndex: 200
                },
                itemIdParaExclusao: null,
                loading: true,
                pagination:{rowsPerPage: 10},
                dialogExcluir: false,
                items: [
                    { id: '1', label: 'Produção 1' },
                    { id: '2', label: 'Homologação 2' },
                ],
                headers: [
                    {
                        text: 'Razão Social',
                        align: 'left',
                        value: 'razaosocial',
                    },
                    {
                        text: 'CNPJ',
                        align: 'left',
                        value: 'cnpj',
                    },
                    {
                        text: 'Ambiente',
                        align: 'center',
                        value: 'tpAmb',
                    },
                    {
                        text: 'Certificado',
                        align: 'left',
                        value: 'path',
                    },
                    {
                        text: 'Ações',
                        align: 'center',
                    },
                ],
                data: []
            }
        },
        filters: {
            cpf: function (value) {
                return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            },
            cnpj: function (value) {
                return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
            }
        },
        watch: {
            listarCertificadoGetter() {
                this.loading = false;
            },
        },
        created(){
            this.listarCertificadoAction();
        },
        computed: {
            ...mapGetters({
                listarCertificadoGetter: 'certificado/listarCertificadoGetter',
            })
        },
        methods: {
            ...mapActions({
                listarCertificadoAction: 'certificado/listarCertificadoAction',
                excluirCertificadoAction: 'certificado/excluirCertificadoAction',
            }),
            deletarItem () {
                this.dialogExcluir = false;
                this.excluirCertificadoAction(this.itemIdParaExclusao);

            },
        }
    }
</script>
