import { api } from './api';

export const usuarioService = {
    // POST: /login
    login: async (dadosLogin) => {
        const response = await api.post('/login', dadosLogin);
        return response.data;
    },

    // POST: /usuarios/cadastro
    cadastrar: async (dadosUsuario) => {
        const response = await api.post('/usuarios/cadastro', dadosUsuario);
        return response.data;
    },

    // GET: /usuarios
    obterTodos: async () => {
        const response = await api.get('/usuarios');
        return response.data;
    },

    // GET: /usuarios/{id}
    obterPorId: async (id) => {
        const response = await api.get(`/usuarios/${id}`);
        return response.data;
    },

    // PATCH: /usuarios/completar-perfil/{id}
    completarPerfil: async (id, dadosPerfil) => {
        const response = await api.patch(`/usuarios/completar-perfil/${id}`, dadosPerfil);
        return response.data;
    },

    // DELETE: /usuarios/{id}
    remover: async (id) => {
        const response = await api.delete(`/usuarios/${id}`);
        return response.data;
    }
};