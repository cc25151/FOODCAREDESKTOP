'use client';

import React, { useState, ComponentType, SVGProps } from "react";
import Link from "next/link";
import Topo from "@/components/Cabecalho";
import Footer from "@/components/Rodape";
import { 
  Package, 
  PlusCircle, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
} from "lucide-react";

type IconeProps = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;


interface ItemNavegacao {
  rotulo: string;
  link: string;
}

interface CartaoPainel {
  status: string;
  classeStatus: string;
  Icone: IconeProps;
  titulo: string;
  descricao: string;
  rotuloAcao: string;
  link: string;
}

interface Doacao {
  id: number;
  titulo: string;
  descricao: string;
  quantidade: string;
  imagem: string;
}


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

const doacoesPendentesIniciais: Doacao[] = [
  {
    id: 1,
    titulo: "Marmita de Carne",
    descricao: "Arroz, feijão, purê de batata, carne moída refogada e salada verde (500g)",
    quantidade: "Qtd: 45 unidades",
    imagem: "/doacoes/marmita-carne.png",
  },
  {
    id: 2,
    titulo: "Cesta de Hortaliças",
    descricao: "Alface crespa, tomate italiano orgânico, cenoura fresca e brócolis do dia",
    quantidade: "Qtd: 12 cestas médias",
    imagem: "/doacoes/cesta-hortalicas.png",
  },
  {
    id: 3,
    titulo: "Pão Francês Assado",
    descricao: "Pães crocantes fresquinhos, assados na primeira fornada da manhã",
    quantidade: "Qtd: 120 pães",
    imagem: "/doacoes/pao-frances.png",
  },
  {
    id: 4,
    titulo: "Arroz com Feijão",
    descricao: "Marmitas congeladas higienizadas de arroz agulhinha e feijão carioca (400g)",
    quantidade: "Qtd: 60 unidades",
    imagem: "/doacoes/arroz-feijao.png",
  },
];


export const HomefeedDoador: React.FC = () => {
  const [doacoesFinalizadas, setDoacoesFinalizadas] = useState<number[]>([]);

  const aoFinalizarDoacao = (idDoacao: number) => {
    setDoacoesFinalizadas((atuais) =>
      atuais.includes(idDoacao) ? atuais : [...atuais, idDoacao]
    );
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
              Olá, Supermercado Pão de Ouro!
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
                  className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-md transition-shadow"
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {doacoesPendentesIniciais.map((doacao) => {
              const estaFinalizada = doacoesFinalizadas.includes(doacao.id);
              return (
                <article
                  key={doacao.id}
                  className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col sm:flex-row gap-5 items-stretch shadow-sm"
                >
                  <img
                    src={doacao.imagem}
                    alt={doacao.titulo}
                    className="w-full sm:w-40 h-44 sm:h-auto object-cover rounded-xl flex-shrink-0"
                  />

                  <div className="flex flex-col justify-between flex-1 gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-lg font-bold text-[#2b2e23] leading-snug">
                          {doacao.titulo}
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
                        {doacao.descricao}
                      </p>

                      <p className="text-xs sm:text-sm font-semibold text-[#2b2e23]">
                        {doacao.quantidade}
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={estaFinalizada}
                      onClick={() => aoFinalizarDoacao(doacao.id)}
                      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                        estaFinalizada
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-[#bf211e] hover:bg-[#a91d1a] text-white shadow-md"
                      }`}
                    >
                      {estaFinalizada ? (
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
        </section>
      </main>

      {/* RODAPÉ */}
      <Footer />
    </div>
  );
};