import * as types from './types';

export const state = {
  certificado: {},
  listarCertificado: [],
};

export const mutations = {
    [types.SYNC_CERTIFICADO] (state, params) {
      state.certificado = params;
      localStorage.setItem('certificado', JSON.stringify(params));
    },
    [types.SYNC_LISTAR_CERTIFICADO] (state, params) {
      state.listarCertificado = params;
    },
    [types.SYNC_EXCLUIR_CERTIFICADO] (state, certificadoId) {
        state.listarCertificado.find( (certificado, index) => {
            if (certificado._id === certificadoId){
                return state.listarCertificado.splice(index, 1);
            }
        });

    }
};
