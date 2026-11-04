import { api } from './api';

export const doadorService = {
    // GET: /doadores/{idDoador}
    obterPorId: async (idDoador) => {
        const response = await api.get(`/doadores/${idDoador}`);
        return response.data;
    },

    // GET: /doadores/publico/{idDoador}
    obterPerfilPublico: async (idDoador) => {
        const response = await api.get(`/doadores/publico/${idDoador}`);
        return response.data;
    },

    // POST: /doadores/cadastro
    cadastrar: async (dadosDoador) => {
        const response = await api.post('/doadores/cadastro', dadosDoador);
        return response.data;
    }
};