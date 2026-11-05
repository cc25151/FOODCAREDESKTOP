'use client';

import React, { useState, useEffect, ComponentType, SVGProps } from "react";
import Link from "next/link";
import Topo from "@/components/Cabecalho";
import Footer from "@/components/Rodape";
import { doacaoService } from "@/services/doacaoService";
import {
  Package,
  PlusCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Loader2,
  PackageOpen,
  AlertCircle,
} from "lucide-react";

// ==================== TIPOS E INTERFACES ====================

type IconeProps = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;

interface CartaoPainel {
  status: string;
  classeStatus: string;
  Icone: IconeProps;
  titulo: string;
  descricao: string;
  rotuloAcao: string;
  link: string;
}

export interface DoacaoPendenteAPI {
  idDoacao: number;
  alimentoNome: string;
  descricao?: string;
  qntd?: string | number;
  quantidade?: string | number;
  dataDoacao?: string;
  horario?: string;
  status: string;
  idCategoria?: number;
  imagem?: string;
}

// ==================== MAPA DE IMAGENS POR CATEGORIA ====================

const MAPA_IMAGENS: Record<number, string> = {
  1: "/doacoes/marmita-carne.png",
  2: "/doacoes/padaria.png",
  3: "/doacoes/frutas.png",
  4: "/doacoes/embalados.png",
  9: "/doacoes/enlatados.png",
};

const obterImagemDoacao = (item: DoacaoPendenteAPI): string => {
  if (item.imagem) return item.imagem;
  if (item.idCategoria && MAPA_IMAGENS[item.idCategoria]) {
    return MAPA_IMAGENS[item.idCategoria];
  }
  return "/doacoes/embalados.png";
};

// ==================== CARTOES FIXOS DE NAVEGAÇÃO ====================

const cartoesPainel: CartaoPainel[] = [
  {
    status: "Retiradas Ativas",
    classeStatus: "text-[#bf211e] bg-red-50 border-red-200",
    Icone: Package as IconeProps,
    titulo: "Minhas Doações Cadastradas",
    descricao: "Monitore, atualize a quantidade e gerencie o histórico de todas as suas doações que estão atualmente aguardando retirada.",
    rotuloAcao: "Acessar lista",
    link: "/meus-alimentos",
  },
  {
    status: "Novo Lote",
    classeStatus: "text-emerald-700 bg-emerald-50 border-emerald-200",
    Icone: PlusCircle as IconeProps,
    titulo: "Cadastrar Novo Alimento",
    descricao: "Disponibilize sobras limpas, cestas excedentes ou produtos perto da validade diretamente para nossa rede de receptores.",
    rotuloAcao: "Ir para formulário",
    link: "/cadastrar-alimento",
  },
];

// ==================== COMPONENTE PRINCIPAL ====================

export default function HomeFeedDoador() {
  const [nomeDoador, setNomeDoador] = useState<string>("Doador FoodCare");
  const [doacoesPendentes, setDoacoesPendentes] = useState<DoacaoPendenteAPI[]>([]);
  const [doacoesFinalizadas, setDoacoesFinalizadas] = useState<number[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [finalizandoId, setFinalizandoId] = useState<number | null>(null);
  const [erro, setErro] = useState<string>("");

  useEffect(() => {
    async function carregarDadosDoador() {
      setCarregando(true);
      setErro("");

      try {
        const idUsuario = localStorage.getItem("idUsuario");
        const idDoador = localStorage.getItem("idDoador") || idUsuario;
        const nomeSalvo = localStorage.getItem("nomeUsuario");

        if (nomeSalvo) {
          setNomeDoador(nomeSalvo);
        }

        if (idDoador) {
          // Busca as doações associadas ao ID do doador na API C#
          const dados: DoacaoPendenteAPI[] = await doacaoService.obterPorDoador(Number(idDoador));

          // Filtra doações com status 'Pendente'
          const pendentes = (dados || []).filter(
              (item) => (item.status || "").toLowerCase() === "pendente"
          );

          setDoacoesPendentes(pendentes);
        }
      } catch (err: unknown) {
        console.error("Erro ao carregar doações pendentes do doador:", err);
        setErro("Não foi possível carregar suas doações pendentes.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDadosDoador();
  }, []);

  const handleFinalizarDoacao = async (idDoacao: number) => {
    setFinalizandoId(idDoacao);
    setErro("");

    try {
      const idUsuario = localStorage.getItem("idUsuario");
      const idDoador = localStorage.getItem("idDoador") || idUsuario;

      // Chama a API PATCH /doacoes/{id}/finalizar?idDoador={idDoador}
      await doacaoService.finalizar(
          idDoacao,
          idDoador ? Number(idDoador) : undefined
      );

      // Atualiza o estado local para marcar a doação como finalizada
      setDoacoesFinalizadas((atuais) => [...atuais, idDoacao]);
    } catch (err: unknown) {
      console.error("Erro ao finalizar doação:", err);
      setErro("Não foi possível finalizar a doação. Tente novamente.");
    } finally {
      setFinalizandoId(null);
    }
  };

  return (
      <div className="min-h-screen w-full bg-[#f8f8f6] text-[#2b2e23] font-sans flex flex-col justify-between overflow-x-hidden">
        <Topo />

        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-1 w-full max-w-[1296px] mx-auto px-4 md:px-12 py-8 md:py-12 flex flex-col gap-12">

          {/* VISÃO GERAL */}
          <section aria-labelledby="titulo-painel-doador" className="flex flex-col gap-8">
            <header className="flex flex-col gap-2">
              <h1
                  id="titulo-painel-doador"
                  className="font-serif text-3xl sm:text-4xl md:text-[42px] font-bold text-[#2b2e23] tracking-tight leading-tight"
              >
                Olá, {nomeDoador}!
              </h1>
              <p className="text-base sm:text-lg text-gray-600 font-medium">
                Seu painel corporativo de impacto social e combate direto ao desperdício.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {cartoesPainel.map((cartao) => {
                const IconeCartao = cartao.Icone;
                return (
                    <article
                        key={cartao.titulo}
                        className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-xs hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between w-full">
                          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                            <IconeCartao className="w-6 h-6 text-[#2b2e23]" />
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${cartao.classeStatus}`}>
                        {cartao.status}
                      </span>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold text-[#2b2e23]">
                          {cartao.titulo}
                        </h2>

                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {cartao.descricao}
                        </p>
                      </div>

                      <Link
                          href={cartao.link}
                          className="inline-flex items-center gap-2 text-sm font-bold text-[#2b2e23] hover:text-[#bf211e] transition-colors w-fit group"
                      >
                        <span>{cartao.rotuloAcao}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </article>
                );
              })}
            </div>
          </section>

          {/* DOAÇÕES PENDENTES */}
          <section aria-labelledby="titulo-doacoes-pendentes" className="flex flex-col gap-8">
            <header className="flex flex-col gap-2">
              <h2
                  id="titulo-doacoes-pendentes"
                  className="font-serif text-2xl sm:text-3xl font-bold text-[#2b2e23] tracking-tight"
              >
                Doações Atuais Pendentes de Retirada
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Lotes de alimentos aguardando confirmação de coleta por instituições locais parceiras.
              </p>
            </header>

            {erro && (
                <div className="w-full bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl flex items-center gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{erro}</span>
                </div>
            )}

            {/* ESTADO DE CARREGAMENTO */}
            {carregando ? (
                <div className="py-16 flex flex-col items-center justify-center gap-3 text-gray-500 w-full">
                  <Loader2 className="w-8 h-8 animate-spin text-[#bf211e]" />
                  <p className="text-sm font-semibold">Carregando suas doações pendentes...</p>
                </div>
            ) : doacoesPendentes.length === 0 ? (
                /* LISTA VAZIA */
                <div className="py-12 px-6 bg-white rounded-2xl border border-gray-200 flex flex-col items-center text-center gap-3 w-full">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                    <PackageOpen className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-[#2b2e23] text-base">Nenhuma doação pendente</h3>
                  <p className="text-xs text-gray-500 max-w-sm">
                    Você não possui lotes de alimentos aguardando retirada no momento.
                  </p>
                </div>
            ) : (
                /* GRID DE DOAÇÕES PENDENTES */
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                  {doacoesPendentes.map((doacao) => {
                    const estaFinalizada = doacoesFinalizadas.includes(doacao.idDoacao);
                    const emProcessamento = finalizandoId === doacao.idDoacao;
                    const quantidadeTexto = doacao.qntd || doacao.quantidade || "Quantidade não especificada";

                    return (
                        <article
                            key={doacao.idDoacao}
                            className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col sm:flex-row gap-5 items-stretch shadow-xs"
                        >
                          <img
                              src={obterImagemDoacao(doacao)}
                              alt={doacao.alimentoNome || "Alimento"}
                              className="w-full sm:w-40 h-44 sm:h-auto object-cover rounded-xl shrink-0 bg-gray-100"
                          />

                          <div className="flex flex-col justify-between flex-1 gap-4">
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center justify-between gap-2">
                                <h3 className="text-lg font-bold text-[#2b2e23] leading-snug">
                                  {doacao.alimentoNome}
                                </h3>
                                <span
                                    className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                                        estaFinalizada
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-amber-100 text-amber-700"
                                    }`}
                                >
                            {estaFinalizada ? "Finalizada" : "Pendente"}
                          </span>
                              </div>

                              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                                {doacao.descricao || "Aguardando confirmação de retirada pelo receptor."}
                              </p>

                              <p className="text-xs sm:text-sm font-semibold text-[#2b2e23]">
                                Qtd: {quantidadeTexto}
                              </p>
                            </div>

                            <button
                                type="button"
                                disabled={estaFinalizada || emProcessamento}
                                onClick={() => handleFinalizarDoacao(doacao.idDoacao)}
                                className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                                    estaFinalizada
                                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                        : "bg-[#bf211e] hover:bg-[#a91d1a] text-white shadow-xs disabled:opacity-60"
                                }`}
                            >
                              {emProcessamento ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Finalizando...</span>
                                  </>
                              ) : estaFinalizada ? (
                                  <>
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>Doação Finalizada</span>
                                  </>
                              ) : (
                                  <>
                                    <Clock className="w-4 h-4" />
                                    <span>Finalizar Doação</span>
                                  </>
                              )}
                            </button>
                          </div>
                        </article>
                    );
                  })}
                </div>
            )}
          </section>
        </main>

        {/* RODAPÉ */}
        <Footer />
      </div>
  );
}