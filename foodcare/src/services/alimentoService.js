import { api } from './api';

export const alimentoService = {
    // GET: /alimentos/feed/{idUsuario}
    obterFeedPorUsuario: async (idUsuario) => {
        const response = await api.get(`/alimentos/feed/${idUsuario}`);
        return response.data;
    },

    // GET: /alimentos/{categoria}
    obterPorCategoria: async (categoria) => {
        const response = await api.get(`/alimentos/${categoria}`);
        return response.data;
    },

    // GET: /alimentos/id/{idAlimento}
    obterPorId: async (idAlimento) => {
        const response = await api.get(`/alimentos/id/${idAlimento}`);
        return response.data;
    },

    // GET: /alimentos/doador/{idUsuario}
    obterPorDoador: async (idUsuario) => {
        const response = await api.get(`/alimentos/doador/${idUsuario}`);
        return response.data;
    },

    // POST: /alimentos/doador/{idUsuario}
    cadastrar: async (idUsuario, novoAlimento) => {
        const response = await api.post(`/alimentos/doador/${idUsuario}`, novoAlimento);
        return response.data;
    },

    // PATCH: /alimentos/alterar/{idAlimento}
    atualizarParcialmente: async (idAlimento, dadosAlterados) => {
        const response = await api.patch(`/alimentos/alterar/${idAlimento}`, dadosAlterados);
        return response.data;
    },

    // PUT: /alimentos/{id}
    atualizar: async (idAlimento, alimentoAlterado) => {
        const response = await api.put(`/alimentos/${idAlimento}`, alimentoAlterado);
        return response.data;
    },

    // DELETE: /alimentos/{id}
    remover: async (idAlimento) => {
        const response = await api.delete(`/alimentos/${idAlimento}`);
        return response.data;
    }
};