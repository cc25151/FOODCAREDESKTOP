'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usuarioService } from "@/services/usuarioService";
import { geocodingService } from "@/services/geocodingService";
import Topo from "@/components/Cabecalho";
import {
  User,
  Edit3,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  LogOut,
} from "lucide-react";

// ==================== TIPOS E INTERFACES ====================

export interface PerfilUsuario {
  nome: string;
  email: string;
  documento: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  latitude?: number;
  longitude?: number;
  subtitulo?: string;
}

interface CampoPerfilProps {
  rotulo: string;
  nome: string;
  valor: string;
  modoEdicao: boolean;
  tipo?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// ==================== CAMPO DE FORMULÁRIO ====================

const CampoPerfil: React.FC<CampoPerfilProps> = ({
                                                   rotulo,
                                                   nome,
                                                   valor,
                                                   modoEdicao,
                                                   tipo = "text",
                                                   placeholder,
                                                   onChange,
                                                 }) => {
  return (
      <div className="w-full bg-[#f4f4f1] border border-gray-200/60 rounded-2xl px-5 py-3.5 flex flex-col gap-1 transition-all focus-within:border-[#2b2e23] focus-within:bg-white focus-within:shadow-xs">
        <label htmlFor={nome} className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          {rotulo}
        </label>

        {modoEdicao ? (
            <input
                id={nome}
                name={nome}
                type={tipo}
                value={valor}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full bg-transparent text-sm font-bold text-[#2b2e23] focus:outline-none placeholder:text-gray-300 placeholder:font-normal"
            />
        ) : (
            <div className="text-sm font-bold text-[#2b2e23] min-h-[20px] flex items-center">
              {valor || <span className="text-gray-400 font-semibold italic text-xs">Não informado</span>}
            </div>
        )}
      </div>
  );
};

// ==================== PÁGINA PRINCIPAL DE PERFIL ====================

const TelaPerfil = () => {
  const router = useRouter();

  const [perfil, setPerfil] = useState<PerfilUsuario>({
    nome: "",
    email: "",
    documento: "",
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    subtitulo: "Parceiro ativo no combate ao desperdício e na distribuição de esperança.",
  });

  const [modoEdicao, setModoEdicao] = useState(false);
  const [formData, setFormData] = useState<PerfilUsuario>(perfil);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  // Carrega os dados do perfil do backend
  useEffect(() => {
    const carregarPerfilAPI = async () => {
      setCarregando(true);
      try {
        const idUsuario = localStorage.getItem("idUsuario");
        if (!idUsuario) {
          router.push("/login");
          return;
        }

        const dados = await usuarioService.obterPorId(idUsuario);


        const cepFormatado = dados.cep && dados.cep.length === 8
            ? `${dados.cep.substring(0, 5)}-${dados.cep.substring(5)}`
            : dados.cep || "";

        const perfilFormatado: PerfilUsuario = {
          nome: dados.nome || "",
          email: dados.email || "",
          documento: dados.documento || "",
          cep: cepFormatado,
          rua: dados.rua || "",
          numero: dados.numero || "",
          bairro: dados.bairro || "",
          cidade: dados.cidade || "",
          latitude: dados.latitude,
          longitude: dados.longitude,
          subtitulo: "Parceiro ativo no combate ao desperdício e na distribuição de esperança.",
        };

        setPerfil(perfilFormatado);
        setFormData(perfilFormatado);
      } catch (error) {
        console.error("Erro ao carregar dados do perfil:", error);
        setMensagemErro("Não foi possível carregar as informações do perfil.");
      } finally {
        setCarregando(false);
      }
    };

    carregarPerfilAPI();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIniciarEdicao = () => {
    setFormData(perfil);
    setMensagemSucesso("");
    setMensagemErro("");
    setModoEdicao(true);
  };

  const handleCancelarEdicao = () => {
    setFormData(perfil);
    setModoEdicao(false);
    setMensagemErro("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("tipoUsuario");
    router.push("/login");
  };

  const handleSalvarPerfil = async (e: React.FormEvent) => {
    e.preventDefault();
    setSalvando(true);
    setMensagemSucesso("");
    setMensagemErro("");

    try {
      const idUsuario = localStorage.getItem("idUsuario");
      if (!idUsuario) {
        throw new Error("Sessão expirada. Faça login novamente.");
      }

      // 1. Monta a string de endereço para o Nominatim
      const enderecoCompleto = `${formData.rua}, ${formData.numero}, ${formData.bairro}, ${formData.cidade}, Brasil`;

      // 2. Busca a geolocalização no Nominatim
      const coordenadas = await geocodingService.buscarCoordenadas(enderecoCompleto);

      if (!coordenadas) {
        setMensagemErro("Não foi possível localizar o endereço digitado. Verifique os dados.");
        setSalvando(false);
        return;
      }

      // 3. Limpa a formatação do CEP para salvar apenas números (8 dígitos)
      const cepLimpo = formData.cep.replace(/\D/g, "");

      // 4. Monta a payload exata esperada pelo C# (CompletarPerfil)
      const dadosPerfil = {
        cep: cepLimpo,
        cidade: formData.cidade,
        bairro: formData.bairro,
        rua: formData.rua,
        numero: formData.numero,
        latitude: coordenadas.latitude,
        longitude: coordenadas.longitude,
      };

      await usuarioService.completarPerfil(idUsuario, dadosPerfil);

      // Atualiza os dados locais com as novas coordenadas retornadas
      const perfilAtualizado: PerfilUsuario = {
        ...formData,
        latitude: coordenadas.latitude,
        longitude: coordenadas.longitude,
      };

      setPerfil(perfilAtualizado);
      setModoEdicao(false);
      setMensagemSucesso("Perfil e localização atualizados com sucesso!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMensagemErro(err.message);
      } else {
        setMensagemErro("Erro ao salvar alterações do perfil.");
      }
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-[#f8f8f6]">
          <Topo />
          <main className="flex-1 flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3 text-gray-500">
              <Loader2 className="w-8 h-8 animate-spin text-[#bf211e]" />
              <p className="text-sm font-semibold">Carregando dados do perfil...</p>
            </div>
          </main>
        </div>
    );
  }

  return (
      <div className="flex min-h-screen w-full flex-col bg-[#f8f8f6] text-[#2b2e23] font-sans">
        <Topo />

        <main className="flex-1 w-full flex justify-center py-8 px-4 md:px-12">
          <div className="w-full max-w-[1296px] flex flex-col gap-6">

            <div className="flex items-center justify-between">
              <div className="text-gray-400 text-sm font-medium">
                Perfil Pessoal
              </div>

              <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-full transition-all cursor-pointer border border-red-200"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sair da conta</span>
              </button>
            </div>

            {mensagemSucesso && (
                <div className="w-full bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{mensagemSucesso}</span>
                  </div>
                  <button onClick={() => setMensagemSucesso("")} className="text-emerald-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
            )}

            {mensagemErro && (
                <div className="w-full bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <span>{mensagemErro}</span>
                  </div>
                  <button onClick={() => setMensagemErro("")} className="text-red-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
            )}

            <form onSubmit={handleSalvarPerfil} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4 lg:col-span-4 flex flex-col items-center gap-4">
                <div className="w-full aspect-4/3 max-w-[360px] bg-[#f0f2eb] border border-gray-200 rounded-3xl flex items-center justify-center shadow-xs">
                  <div className="w-32 h-32 rounded-full bg-[#dbdfd0] flex items-center justify-center text-[#2b2e23]">
                    <User className="w-20 h-20 text-[#2b2e23]" />
                  </div>
                </div>

                {perfil.latitude && perfil.longitude && (
                    <div className="w-full max-w-[360px] bg-white border border-gray-200 p-4 rounded-2xl text-xs text-gray-500 flex flex-col gap-1">
                      <span className="font-bold text-[#2b2e23]">Coordenadas Registradas:</span>
                      <span>Lat: {perfil.latitude} | Long: {perfil.longitude}</span>
                    </div>
                )}
              </div>

              <div className="md:col-span-8 lg:col-span-8 flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex flex-col">
                    <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#2b2e23]">
                      Perfil de {perfil.nome || "Usuário"}
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {perfil.subtitulo}
                    </p>
                  </div>

                  {!modoEdicao ? (
                      <button
                          type="button"
                          onClick={handleIniciarEdicao}
                          className="self-start px-5 py-2.5 bg-[#2b2e23] hover:bg-black text-white text-xs font-bold rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Editar Perfil</span>
                      </button>
                  ) : (
                      <div className="flex items-center gap-2 self-start">
                        <button
                            type="button"
                            onClick={handleCancelarEdicao}
                            disabled={salvando}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold rounded-full transition-all cursor-pointer"
                        >
                          Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={salvando}
                            className="px-5 py-2.5 bg-[#bf211e] hover:bg-[#a91d1a] text-white text-xs font-bold rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                        >
                          {salvando ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Obtendo Coordenadas...</span>
                              </>
                          ) : (
                              <>
                                <Save className="w-3.5 h-3.5" />
                                <span>Salvar Alterações</span>
                              </>
                          )}
                        </button>
                      </div>
                  )}
                </div>

                <div className="flex flex-col gap-3.5 mt-2">
                  <CampoPerfil
                      rotulo="NOME"
                      nome="nome"
                      valor={modoEdicao ? formData.nome : perfil.nome}
                      modoEdicao={false} // Desabilitado edição pois o endpoint altera apenas o endereço
                      onChange={handleChange}
                  />

                  <CampoPerfil
                      rotulo="E-MAIL"
                      nome="email"
                      tipo="email"
                      valor={modoEdicao ? formData.email : perfil.email}
                      modoEdicao={false}
                      onChange={handleChange}
                  />

                  <CampoPerfil
                      rotulo="CPF / CNPJ"
                      nome="documento"
                      valor={modoEdicao ? formData.documento : perfil.documento}
                      modoEdicao={false}
                      onChange={handleChange}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <CampoPerfil
                        rotulo="RUA"
                        nome="rua"
                        valor={modoEdicao ? formData.rua : perfil.rua}
                        modoEdicao={modoEdicao}
                        onChange={handleChange}
                        placeholder="Ex: Av. Paulista"
                    />

                    <CampoPerfil
                        rotulo="NÚMERO"
                        nome="numero"
                        valor={modoEdicao ? formData.numero : perfil.numero}
                        modoEdicao={modoEdicao}
                        onChange={handleChange}
                        placeholder="Ex: 1000"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <CampoPerfil
                        rotulo="BAIRRO"
                        nome="bairro"
                        valor={modoEdicao ? formData.bairro : perfil.bairro}
                        modoEdicao={modoEdicao}
                        onChange={handleChange}
                        placeholder="Ex: Bela Vista"
                    />

                    <CampoPerfil
                        rotulo="CIDADE"
                        nome="cidade"
                        valor={modoEdicao ? formData.cidade : perfil.cidade}
                        modoEdicao={modoEdicao}
                        onChange={handleChange}
                        placeholder="Ex: São Paulo"
                    />

                    <CampoPerfil
                        rotulo="CEP"
                        nome="cep"
                        valor={modoEdicao ? formData.cep : perfil.cep}
                        modoEdicao={modoEdicao}
                        onChange={handleChange}
                        placeholder="00000-000"
                    />
                  </div>

                </div>
              </div>
            </form>
          </div>
        </main>

        <footer className="w-full border-t border-gray-200 bg-white px-6 md:px-12 py-6 text-center text-xs text-gray-500">
          <p>© 2026 FoodCare - Painel de Controle do Usuário.</p>
        </footer>
      </div>
  );
};

export default TelaPerfil;