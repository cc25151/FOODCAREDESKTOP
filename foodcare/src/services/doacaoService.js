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
    cadastrar: async (novaDoacao) => {
        const response = await api.post('/doacoes', novaDoacao);
        return response.data;
    },

    // PATCH: /doacoes/{id}/finalizar?nota={nota}
    finalizar: async (idDoacao, nota) => {
        const response = await api.patch(`/doacoes/${idDoacao}/finalizar`, null, {
            params: { nota }
        });
        return response.data;
    }
};