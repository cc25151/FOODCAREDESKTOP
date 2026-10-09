'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Topo from "@/components/Cabecalho";
import Footer from "@/components/Rodape";
import {
  ArrowLeft,
  Edit3,
  X,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// ==================== TIPOS E INTERFACES ====================

export type ContribuicaoAlimento = {
  id: string;
  nome: string;
  descricao: string;
  quantidade: number;
  dataValidade: string;
  imagem: string;
};


interface ModalEditarAlimentoProps {
  alimento: ContribuicaoAlimento | null;
  onClose: () => void;
  onSalvar: (alimentoAtualizado: ContribuicaoAlimento) => Promise<void>;
}

// ==================== FUNÇÕES AUXILIARES ====================

const formatarDataExibicao = (dataISO: string): string => {
  if (!dataISO) return "";
  const partes = dataISO.split("-");
  if (partes.length === 3) {
    const [ano, mes, dia] = partes;
    return `${dia}/${mes}/${ano}`;
  }
  return dataISO;
};

// ==================== DADOS E CONSTANTES ====================

const contribuicoesIniciais: ContribuicaoAlimento[] = [
  {
    id: "1",
    nome: "Marmita de Carne",
    descricao: "Arroz, feijão, purê de batata, carne moída refogada e salada verde (500g)",
    quantidade: 45,
    dataValidade: "2026-03-12",
    imagem: "/doacoes/marmita-carne.png",
  },
  {
    id: "2",
    nome: "Cesta de Hortaliças",
    descricao: "Alface crespa, tomate italiano orgânico, cenoura fresca e brócolis do dia",
    quantidade: 12,
    dataValidade: "2026-03-10",
    imagem: "/doacoes/cesta-hortalicas.png",
  },
  {
    id: "3",
    nome: "Pão Francês (50 unidades)",
    descricao: "Pães crocantes fresquinhos, assados na primeira fornada da manhã",
    quantidade: 150,
    dataValidade: "2026-03-08",
    imagem: "/doacoes/pao-frances.png",
  },
  {
    id: "4",
    nome: "Arroz com Feijão",
    descricao: "Marmitas congeladas higienizadas de arroz agulhinha e feijão carioca (400g)",
    quantidade: 60,
    dataValidade: "2026-03-05",
    imagem: "/doacoes/arroz-feijao.png",
  },
  {
    id: "5",
    nome: "Marmita de Frango",
    descricao: "Arroz, feijão, frango grelhado, batata frita e salada (300g)",
    quantidade: 30,
    dataValidade: "2026-02-28",
    imagem: "/doacoes/marmita-frango.png",
  },
  {
    id: "6",
    nome: "Frutas Variadas",
    descricao: "Maçãs vermelhas, bananas nanicas, laranjas pera e mamão formosa higienizados",
    quantidade: 15,
    dataValidade: "2026-02-22",
    imagem: "/doacoes/frutas-variadas.png",
  },
];

// ==================== INTRODUÇÃO ====================

const SecaoIntroducao = () => {
  const router = useRouter();

  return (
    <section
      aria-labelledby="titulo-meus-alimentos"
      className="flex flex-col items-start gap-4 px-6 md:px-[150px] py-10 relative self-stretch w-full bg-[#f8f8f6]"
    >
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm font-medium text-[#2b2e23] hover:text-[#bf211e] transition-colors cursor-pointer"
        aria-label="Voltar para a página anterior"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar</span>
      </button>

      <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
        <h1
          id="titulo-meus-alimentos"
          className="self-stretch font-serif font-bold text-3xl md:text-[42px] leading-[normal] text-[#2b2e23]"
        >
          Meus alimentos
        </h1>
        <p className="relative self-stretch text-gray-600 text-base md:text-lg">
          Acompanhe e gerencie o histórico completo de todas as suas contribuições sociais e combates diretos ao desperdício.
        </p>
      </div>
    </section>
  );
};

// ==================== MODAL DE EDIÇÃO DE ALIMENTO ====================

const ModalEditarAlimento: React.FC<ModalEditarAlimentoProps> = ({
  alimento,
  onClose,
  onSalvar,
}) => {
  const [formData, setFormData] = useState<ContribuicaoAlimento | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (alimento) {
      setFormData({ ...alimento });
      setErro("");
    }
  }, [alimento]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !salvando) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, salvando]);

  if (!alimento || !formData) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => {
      if (!prev) return null;
      if (type === "number") {
        const num = parseInt(value, 10);
        return { ...prev, [name]: isNaN(num) ? 0 : num };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSalvando(true);
    setErro("");

    try {
      await onSalvar(formData);
      onClose();
    } catch (err: any) {
      setErro(err.message || "Erro ao salvar alterações do alimento.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-modal-edicao"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden my-8 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-[#f8f8f6]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#dbdfd0] flex items-center justify-center text-[#2b2e23]">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="titulo-modal-edicao"
                className="font-serif font-bold text-xl text-[#2b2e23]"
              >
                Editar Alimento
              </h2>
              <p className="text-xs text-gray-500">{alimento.nome}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={salvando}
            className="p-2 text-gray-400 hover:text-[#2b2e23] hover:bg-gray-200/50 rounded-full transition-all cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {erro && (
            <div className="w-full bg-red-50 border border-red-200 text-red-800 p-3.5 rounded-2xl flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{erro}</span>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label
              htmlFor="descricao"
              className="text-xs font-bold text-gray-500 uppercase tracking-wider"
            >
              Descrição do Alimento
            </label>
            <textarea
              id="descricao"
              name="descricao"
              rows={3}
              value={formData.descricao}
              onChange={handleChange}
              required
              className="w-full bg-[#f4f4f1] border border-gray-200/80 rounded-2xl px-4 py-3 text-sm text-[#2b2e23] font-medium focus:outline-none focus:border-[#2b2e23] focus:bg-white transition-all resize-none"
              placeholder="Descreva o alimento..."
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="quantidade"
              className="text-xs font-bold text-gray-500 uppercase tracking-wider"
            >
              Quantidade (Unidades / Lotes)
            </label>
            <input
              id="quantidade"
              name="quantidade"
              type="number"
              min="1"
              step="1"
              value={formData.quantidade}
              onChange={handleChange}
              required
              className="w-full bg-[#f4f4f1] border border-gray-200/80 rounded-2xl px-4 py-3 text-sm text-[#2b2e23] font-medium focus:outline-none focus:border-[#2b2e23] focus:bg-white transition-all"
              placeholder="Informe a quantidade numérica"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="dataValidade"
              className="text-xs font-bold text-gray-500 uppercase tracking-wider"
            >
              Data de Validade
            </label>
            <input
              id="dataValidade"
              name="dataValidade"
              type="date"
              value={formData.dataValidade}
              onChange={handleChange}
              required
              className="w-full bg-[#f4f4f1] border border-gray-200/80 rounded-2xl px-4 py-3 text-sm text-[#2b2e23] font-medium focus:outline-none focus:border-[#2b2e23] focus:bg-white transition-all cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={salvando}
              className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold rounded-full transition-all cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={salvando}
              className="px-6 py-2.5 bg-[#bf211e] hover:bg-[#a91d1a] text-white text-xs font-bold rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50"
            >
              {salvando ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Salvar Alterações</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==================== HISTÓRICO DE CONTRIBUIÇÕES ====================

interface SecaoHistoricoProps {
  alimentos: ContribuicaoAlimento[];
  onEditarClick: (alimento: ContribuicaoAlimento) => void;
}

const SecaoHistoricoContribuicoes: React.FC<SecaoHistoricoProps> = ({
  alimentos,
  onEditarClick,
}) => {
  return (
    <section
      aria-label="Histórico de contribuições de alimentos"
      className="gap-8 pt-10 pb-20 px-6 md:px-[150px] flex flex-col items-start relative self-stretch w-full"
    >
      <div className="gap-6 flex flex-col items-start relative self-stretch w-full">
        {alimentos.map((alimento) => (
          <article
            key={alimento.id}
            className="flex items-start gap-6 relative self-stretch w-full"
          >
            <div className="flex flex-col sm:flex-row items-start gap-5 p-5 relative flex-1 bg-white rounded-2xl border border-solid border-gray-200 shadow-xs">
              <img
                className="relative w-full sm:w-40 h-[190px] object-cover rounded-lg"
                alt={`Imagem de ${alimento.nome}`}
                src={alimento.imagem}
                loading="lazy"
              />
              <div className="flex flex-col min-h-[190px] items-start justify-between relative flex-1 w-full">
                <div className="flex flex-col items-start gap-1.5 relative self-stretch w-full">
                  <div className="items-center justify-between flex relative self-stretch w-full gap-4">
                    <h3 className="relative w-fit font-bold text-xl text-[#2b2e23] tracking-tight truncate">
                      {alimento.nome}
                    </h3>
                    <button
                      type="button"
                      onClick={() => onEditarClick(alimento)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#f4f4f1] hover:bg-[#2b2e23] hover:text-white text-[#2b2e23] rounded-full text-xs font-bold transition-all cursor-pointer border border-gray-200 shrink-0"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Editar</span>
                    </button>
                  </div>

                  <p className="relative self-stretch font-normal text-gray-500 text-sm leading-5 line-clamp-2">
                    {alimento.descricao}
                  </p>

                  <div className="flex-col items-start gap-1 pt-2 pb-0 flex relative self-stretch w-full">
                    <p className="relative w-fit text-[15px] leading-normal whitespace-nowrap">
                      <span className="font-semibold text-[#2b2e23]">
                        Quantidade:{" "}
                      </span>
                      <span className="text-gray-500">{alimento.quantidade} unidades</span>
                    </p>
                    <p className="relative w-fit text-sm leading-normal">
                      <span className="font-semibold text-[#2b2e23]">
                        Data de validade:{" "}
                      </span>
                      <span className="text-gray-500">
                        {formatarDataExibicao(alimento.dataValidade)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};


// ==================== COMPONENTE PRINCIPAL ====================

export const MeusAlimentos = () => {
  const [alimentos, setAlimentos] = useState<ContribuicaoAlimento[]>(contribuicoesIniciais);
  const [alimentoSelecionado, setAlimentoSelecionado] = useState<ContribuicaoAlimento | null>(null);
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  const handleAbrirEdicao = (alimento: ContribuicaoAlimento) => {
    setAlimentoSelecionado(alimento);
    setMensagemSucesso("");
  };

  const handleFecharEdicao = () => {
    setAlimentoSelecionado(null);
  };

  const handleSalvarEdicao = async (alimentoAtualizado: ContribuicaoAlimento) => {
    // integrar com a api

    setAlimentos((prev) =>
      prev.map((item) =>
        item.id === alimentoAtualizado.id ? alimentoAtualizado : item
      )
    );

    setMensagemSucesso("Alimento atualizado com sucesso!");
    setTimeout(() => setMensagemSucesso(""), 4000);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-stretch bg-white text-[#2b2e23] font-sans">
      <Topo />
      
      <main className="flex flex-1 flex-col">
        <SecaoIntroducao />

        {mensagemSucesso && (
          <div className="px-6 md:px-[150px] pt-6 w-full">
            <div className="w-full bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{mensagemSucesso}</span>
              </div>
              <button
                onClick={() => setMensagemSucesso("")}
                className="text-emerald-700 hover:text-emerald-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <SecaoHistoricoContribuicoes
          alimentos={alimentos}
          onEditarClick={handleAbrirEdicao}
        />
      </main>

      <Footer />

      <ModalEditarAlimento
        alimento={alimentoSelecionado}
        onClose={handleFecharEdicao}
        onSalvar={handleSalvarEdicao}
      />
    </div>
  );
};

export default MeusAlimentos;