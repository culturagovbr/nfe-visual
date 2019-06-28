import * as http from './http';

const buildData = (params) => {
  const bodyFormData = new FormData();

  Object.keys(params).forEach((key) => {
    bodyFormData.append(key, params[key]);
  });

  return bodyFormData;
};

export const syncCertificado = (params) => {
    const path = '/admin/certificado';
    return http.postRequest(path, buildData(params));
};

export const syncListarCertificado  = function() {
    return http.getRequest('/admin/certificados');
};

export const syncExcluirCertificado = (id) => {
    const path = '/admin/certificado';

    return http.deleteRequest(path, (id));
};
