import { api } from './api';

export const categoriaService = {
    // GET: /categorias
    obterTodas: async () => {
        const response = await api.get('/categorias');
        return response.data;
    },

    // GET: /categorias/{nome}
    obterPorNome: async (nome) => {
        const response = await api.get(`/categorias/${nome}`);
        return response.data;
    }
};