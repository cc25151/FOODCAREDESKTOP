'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  User,
  Edit3,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

// ==================== TIPOS E INTERFACES ====================

export interface PerfilUsuario {
  nome: string;
  email: string;
  cpfCnpj: string;
  telefone: string;
  cep: string;
  endereco: string;
  senha?: string;
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

// ==================== CABEÇALHO ====================

const SecaoCabecalho = () => {
  return (
    <header className="w-full flex flex-col relative z-20">
      <div className="w-full h-[45px] bg-[#bf211e] flex justify-center items-center px-4 md:px-12">
        <div className="w-full max-w-[1296px] flex justify-between items-center text-white text-sm">
          <address className="flex items-center gap-6 not-italic">
            <a
              href="tel:+551931245500"
              className="flex items-center gap-2 text-xs sm:text-sm text-white hover:underline no-underline"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>(19) xxxxx-xxxx</span>
            </a>
            <a
              href="mailto:FoodCare@gmail.com"
              className="flex items-center gap-2 text-xs sm:text-sm text-white hover:underline no-underline"
            >
              <Mail className="w-4 h-4 text-white" />
              <span>FoodCare@gmail.com</span>
            </a>
          </address>
          <img
            className="h-5 w-auto object-contain"
            alt="Redes sociais FoodCare"
            src="/social.svg"
          />
        </div>
      </div>

      <div className="w-full bg-white border-b border-gray-100 shadow-xs flex justify-center items-center py-4 px-4 md:px-12">
        <div className="w-full max-w-[1296px] flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <img
              className="h-10 sm:h-12 w-auto object-contain"
              alt="Logo FoodCare"
              src="/logo-preta.png"
            />
            <span className="font-serif italic font-normal text-2xl text-[#474747] tracking-tight">
              FOODCARE
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-3">
            <Link
              href="/"
              className="px-5 py-2 text-[#2b2e23] rounded-full text-sm font-medium hover:bg-[#dbdfd0] transition-all"
            >
              Tela Inicial
            </Link>
            <Link
              href="/feed-doador"
              className="px-5 py-2 text-[#2b2e23] rounded-full text-sm font-medium hover:bg-[#dbdfd0] transition-all"
            >
              Feed Doador
            </Link>
            <Link
              href="/feed-receptor"
              className="px-5 py-2 text-[#2b2e23] rounded-full text-sm font-medium hover:bg-[#dbdfd0] transition-all"
            >
              Feed Receptor
            </Link>
          </nav>

          <Link
            href="/perfil"
            className="px-6 py-2.5 rounded-full border-[1.5px] border-[#2b2e23] bg-[#2b2e23] text-white text-sm font-bold hover:bg-black transition-all cursor-pointer text-center"
          >
            Minha Conta
          </Link>
        </div>
      </div>
    </header>
  );
};

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

export const TelaPerfil = () => {
  const [perfil, setPerfil] = useState<PerfilUsuario>({
    nome: "",
    email: "",
    cpfCnpj: "",
    telefone: "",
    cep: "",
    endereco: "",
    senha: "",
    subtitulo: "Parceiro ativo no combate ao desperdício e na distribuição de esperança.",
  });

  const [modoEdicao, setModoEdicao] = useState(false);
  const [formData, setFormData] = useState<PerfilUsuario>(perfil);
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  useEffect(() => {
    const carregarPerfilAPI = async () => {
      setCarregando(true);
      try {
      } catch (error) {
        console.error(error);
      } finally {
        setCarregando(false);
      }
    };

    carregarPerfilAPI();
  }, []);

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

  const handleSalvarPerfil = async (e: React.FormEvent) => {
    e.preventDefault();
    setSalvando(true);
    setMensagemSucesso("");
    setMensagemErro("");

    try {
      setPerfil(formData);
      setModoEdicao(false);
      setMensagemSucesso("Perfil atualizado com sucesso!");
    } catch (err: any) {
      setMensagemErro(err.message || "Erro ao salvar alterações.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f8f8f6] text-[#2b2e23] font-sans">
      <SecaoCabecalho />

      <main className="flex-1 w-full flex justify-center py-8 px-4 md:px-12">
        <div className="w-full max-w-[1296px] flex flex-col gap-6">
          
          <div className="text-gray-400 text-sm font-medium">
            Perfil Pessoal
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
            <div className="md:col-span-4 lg:col-span-4 flex flex-col items-center">
              <div className="w-full aspect-4/3 max-w-[360px] bg-[#f0f2eb] border border-gray-200 rounded-3xl flex items-center justify-center shadow-xs">
                <div className="w-32 h-32 rounded-full bg-[#dbdfd0] flex items-center justify-center text-[#2b2e23]">
                  <User className="w-20 h-20 text-[#2b2e23]" />
                </div>
              </div>
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
                          <span>Salvando...</span>
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
                  modoEdicao={modoEdicao}
                  onChange={handleChange}
                  placeholder="Seu nome completo ou Razão Social"
                />

                <CampoPerfil
                  rotulo="E-MAIL"
                  nome="email"
                  tipo="email"
                  valor={modoEdicao ? formData.email : perfil.email}
                  modoEdicao={modoEdicao}
                  onChange={handleChange}
                  placeholder="seuemail@dominio.com"
                />

                <CampoPerfil
                  rotulo="CPF / CNPJ"
                  nome="cpfCnpj"
                  valor={modoEdicao ? formData.cpfCnpj : perfil.cpfCnpj}
                  modoEdicao={modoEdicao}
                  onChange={handleChange}
                  placeholder="Informe o CPF ou CNPJ"
                />

                <CampoPerfil
                  rotulo="TELEFONE"
                  nome="telefone"
                  valor={modoEdicao ? formData.telefone : perfil.telefone}
                  modoEdicao={modoEdicao}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                />

                <CampoPerfil
                  rotulo="CEP"
                  nome="cep"
                  valor={modoEdicao ? formData.cep : perfil.cep}
                  modoEdicao={modoEdicao}
                  onChange={handleChange}
                  placeholder="00000-000"
                />

                <CampoPerfil
                  rotulo="ENDEREÇO"
                  nome="endereco"
                  valor={modoEdicao ? formData.endereco : perfil.endereco}
                  modoEdicao={modoEdicao}
                  onChange={handleChange}
                  placeholder="Rua, Número, Bairro, Cidade - UF"
                />

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