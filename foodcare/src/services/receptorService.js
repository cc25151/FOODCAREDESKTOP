import { api } from './api';

export const receptorService = {
    // GET: /receptores/{id}
    obterPorId: async (id) => {
        const response = await api.get(`/receptores/${id}`);
        return response.data;
    },

    // POST: /receptores/cadastro
    cadastrar: async (dadosReceptor) => {
        const response = await api.post('/receptores/cadastro', dadosReceptor);
        return response.data;
    }
};