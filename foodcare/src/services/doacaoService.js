import { api } from './api';

export const doacaoService = {
    // GET: /doacoes
    obterTodas: async () => {
        const response = await api.get('/doacoes');
        return response.data;
    },

    // GET: /doacoes/realizadas
    obterRealizadas: async () => {
        const response = await api.get('/doacoes/realizadas');
        return response.data;
    },

    // GET: /doacoes/pendentes
    obterPendentes: async () => {
        const response = await api.get('/doacoes/pendentes');
        return response.data;
    },

    // GET: /doacoes/doador/{idDoador}
    obterPorDoador: async (idDoador) => {
        const response = await api.get(`/doacoes/doador/${idDoador}`);
        return response.data;
    },

    // POST: /doacoes
    cadastrar: async (dadosDoacao) => {
        const response = await api.post('/doacoes', dadosDoacao);
        return response.data;
    },

    finalizar: async (idDoacao, idDoador, nota) => {
        const params = new URLSearchParams();
        if (idDoador) params.append('idDoador', idDoador);
        if (nota) params.append('nota', nota);

        const urlParams = params.toString();
        const endpoint = urlParams
            ? `/doacoes/${idDoacao}/finalizar?${urlParams}`
            : `/doacoes/${idDoacao}/finalizar`;

        const response = await api.patch(endpoint);
        return response.data;
    },
};