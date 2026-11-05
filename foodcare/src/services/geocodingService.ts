import axios from 'axios';

export interface Coordenadas {
    latitude: number;
    longitude: number;
}

export const geocodingService = {
    buscarCoordenadas: async (enderecoCompleto: string): Promise<Coordenadas | null> => {
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: enderecoCompleto,
                format: 'json',
                limit: 1,
            },
            headers: {
                // Cabeçalho exigido pela política de uso do Nominatim
                'User-Agent': 'FoodCareApp/1.0 (contato@foodcare.com.br)',
            },
        });

        if (response.data && response.data.length > 0) {
            return {
                latitude: parseFloat(response.data[0].lat),
                longitude: parseFloat(response.data[0].lon),
            };
        }
        return null;
    } catch (error) {
        console.error("Erro ao converter endereço em coordenadas:", error);
        return null;
    }
},
};