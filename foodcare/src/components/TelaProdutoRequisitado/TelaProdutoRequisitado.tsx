'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Clock,
  User,
  ArrowLeft,
  Calendar,
  PackageCheck,
  AlertCircle
} from "lucide-react";

// ==================== TIPOS E DADOS DE EXEMPLO ====================

interface DetalhesSolicitacao {
  produtoNome: string;
  quantidade: string;
  doadorNome: string;
  endereco: string;
  bairroCidade: string;
  dataValidade: string;
  horarioRetirada: string;
  imagemProduto: string;
}

const solicitacaoExemplo: DetalhesSolicitacao = {
  produtoNome: "Marmita de Carne",
  quantidade: "1 unidade",
  doadorNome: "Restaurante Sabor Real",
  endereco: "Rua Barão de Jaguara, 1040",
  bairroCidade: "Centro - Campinas, SP",
  dataValidade: "12/03/2026",
  horarioRetirada: "Das 11h30 às 14h00",
  imagemProduto: "/doacoes/marmita-carne.png",
};

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
              <span>(19) 3124-5500</span>
            </a>
            <a
              href="mailto:contato@foodcare.org"
              className="flex items-center gap-2 text-xs sm:text-sm text-white hover:underline no-underline"
            >
              <Mail className="w-4 h-4 text-white" />
              <span>contato@foodcare.org</span>
            </a>
          </address>
          <img
            className="h-6 w-auto object-contain"
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
              className="px-5 py-2 text-[#2b2e23] rounded-full text-sm font-medium hover:bg-[#dbdfd0]/50 transition-all"
            >
              Tela Inicial
            </Link>
            <Link
              href="/feed-doador"
              className="px-5 py-2 text-[#2b2e23] rounded-full text-sm font-medium hover:bg-[#dbdfd0]/50 transition-all"
            >
              Feed Doador
            </Link>
            <Link
              href="/feed-receptor"
              className="px-5 py-2 text-[#2b2e23] rounded-full text-sm font-medium bg-[#dbdfd0] transition-all"
            >
              Feed Receptor
            </Link>
          </nav>

          <Link
            href="/login"
            className="px-6 py-2.5 rounded-full border-[1.5px] border-[#2b2e23] text-sm font-bold hover:bg-[#2b2e23] hover:text-white transition-all cursor-pointer text-center"
          >
            Minha Conta
          </Link>
        </div>
      </div>
    </header>
  );
};

// ==================== COMPONENTE DE MAPA ====================

interface ComponenteMapaProps {
  endereco: string;
  bairroCidade: string;
  doadorNome: string;
}

const ComponenteMapa: React.FC<ComponenteMapaProps> = ({
  endereco,
  bairroCidade,
  doadorNome,
}) => {
  const enderecoFormatado = encodeURIComponent(`${endereco}, ${bairroCidade}`);

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5 text-[#bf211e]" />
        <h3 className="font-bold text-base text-[#2b2e23]">
          Localização de Retirada
        </h3>
      </div>

      {/* Container reservado para o Mapa */}
      <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-gray-300 bg-slate-100 shadow-inner">
        <iframe
          title="Mapa do Ponto de Retirada"
          width="100%"
          height="100%"
          className="w-full h-full border-0 filter grayscale-[15%] contrast-[105%]"
          loading="lazy"
          allowFullScreen
          src={`https://maps.google.com/maps?q=${enderecoFormatado}&z=15&output=embed`}
        ></iframe>

        {/* Marcador flutuante no centro */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
          <div className="bg-[#bf211e] text-white px-3.5 py-1.5 rounded-full shadow-lg text-xs font-bold flex items-center gap-1.5 animate-bounce">
            <PackageCheck className="w-4 h-4" />
            <span>Ponto de Retirada</span>
          </div>
          <div className="w-3 h-3 bg-[#bf211e] rotate-45 -mt-1.5"></div>
        </div>

        {/* Card informativo de endereço sobre o mapa */}
        <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-gray-200 shadow-md flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-[#bf211e]/10 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-[#bf211e]" />
            </div>
            <div className="overflow-hidden text-left">
              <p className="text-xs font-bold text-[#2b2e23] truncate">
                {doadorNome}
              </p>
              <p className="text-[11px] text-gray-600 truncate">
                {endereco} - {bairroCidade}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== PÁGINA PRINCIPAL ====================

export const TelaProdutoRequisitado = () => {
  const router = useRouter();
  const [dados] = useState<DetalhesSolicitacao>(solicitacaoExemplo);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f8f8f6] text-[#2b2e23] font-sans">
      <SecaoCabecalho />

      <main className="flex-1 w-full flex flex-col items-center py-8 px-4 md:px-12">
        <div className="w-full max-w-[1000px] flex flex-col gap-6">
          
          {/* Botão de navegação */}
          <button
            onClick={() => router.push("/feed-receptor")}
            className="self-start flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#2b2e23] transition-colors cursor-pointer bg-white px-4 py-2 rounded-full border border-gray-200 shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Feed</span>
          </button>

          {/* Banner de Confirmação */}
          <div className="w-full bg-emerald-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="flex flex-col gap-1 text-center sm:text-left">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Solicitação Confirmada 
                </span>
                <h1 className="font-serif font-bold text-2xl sm:text-3xl text-emerald-950">
                  Produto Requisitado com Sucesso!
                </h1>
              </div>
            </div>
          </div>

          {/* Grid Principal (Detalhes + Mapa) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Esquerda: Informações do Produto e Doador */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Card do Produto */}
              <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-xs flex flex-col gap-4">
                <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                  <img
                    src={dados.imagemProduto}
                    alt={dados.produtoNome}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-3 right-3 bg-white/90 text-[#2b2e23] text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                    {dados.quantidade}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <h2 className="font-serif font-bold text-xl text-[#2b2e23]">
                    {dados.produtoNome}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <Calendar className="w-4 h-4 text-[#bf211e]" />
                    <span>Validade: <strong>{dados.dataValidade}</strong></span>
                  </div>
                </div>
              </div>

              {/* Card do Doador e Regras */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs flex flex-col gap-4">
                <h3 className="font-bold text-base text-[#2b2e23] border-b border-gray-100 pb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#bf211e]" />
                  <span>Dados da Retirada</span>
                </h3>

                <div className="flex flex-col gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-400 block text-[11px]">Estabelecimento / Doador</span>
                    <strong className="text-[#2b2e23] text-base">{dados.doadorNome}</strong>
                  </div>

                  <div className="flex items-start gap-2.5 pt-2 border-t border-gray-50">
                    <Clock className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-gray-500 block text-[11px]">Horário de Retirada</span>
                      <strong className="text-[#2b2e23]">{dados.horarioRetirada}</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-amber-800 mt-1">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Respeite o horário informado para garantir a disponibilidade do alimento no local.
                  </p>
                </div>
              </div>
            </div>

            {/* Direita: Estrutura do Mapa */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 p-6 shadow-xs flex flex-col">
              <ComponenteMapa
                endereco={dados.endereco}
                bairroCidade={dados.bairroCidade}
                doadorNome={dados.doadorNome}
              />
            </div>

          </div>

        </div>
      </main>

      {/* Rodapé */}
      <footer className="w-full border-t bg-white px-6 md:px-12 py-8 mt-12 text-center text-xs text-gray-500">
        <p>© 2026 FoodCare - Conectando doadores e receptores em tempo real.</p>
      </footer>
    </div>
  );
};

export default TelaProdutoRequisitado;