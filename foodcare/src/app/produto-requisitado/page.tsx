'use client';

import React, { Suspense } from "react";
import Topo from "@/components/Cabecalho";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MapPin,
  CheckCircle2,
  Clock,
  User,
  ArrowLeft,
  Calendar,
  PackageCheck,
  AlertCircle,
  Loader2
} from "lucide-react";

// ==================== COMPONENTE DE MAPA ====================

interface ComponenteMapaProps {
  lat?: string | null;
  lng?: string | null;
  endereco?: string;
  bairroCidade?: string;
  doadorNome: string;
}

const ComponenteMapa: React.FC<ComponenteMapaProps> = ({
                                                         lat,
                                                         lng,
                                                         endereco = "Ponto de Coleta",
                                                         bairroCidade = "Endereço cadastrado",
                                                         doadorNome,
                                                       }) => {
  // Se possuir lat e lng, utiliza coordenadas exatas no Google Maps
  const temCoordenadas = lat && lng && lat !== "undefined" && lng !== "undefined";
  const srcIframe = temCoordenadas
      ? `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`
      : `https://maps.google.com/maps?q=${encodeURIComponent(`${endereco}, ${bairroCidade}`)}&z=15&output=embed`;

  return (
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#bf211e]" />
          <h3 className="font-bold text-base text-[#2b2e23]">
            Localização de Retirada
          </h3>
        </div>

        <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-gray-300 bg-slate-100 shadow-inner">
          <iframe
              title="Mapa do Ponto de Retirada"
              width="100%"
              height="100%"
              className="w-full h-full border-0 filter grayscale-[15%] contrast-[105%]"
              loading="lazy"
              allowFullScreen
              src={srcIframe}
          ></iframe>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
            <div className="bg-[#bf211e] text-white px-3.5 py-1.5 rounded-full shadow-lg text-xs font-bold flex items-center gap-1.5 animate-bounce">
              <PackageCheck className="w-4 h-4" />
              <span>Ponto de Retirada</span>
            </div>
            <div className="w-3 h-3 bg-[#bf211e] rotate-45 -mt-1.5"></div>
          </div>

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
                  {temCoordenadas ? `Lat: ${lat} | Lng: ${lng}` : `${endereco} - ${bairroCidade}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

// ==================== CONTEÚDO PRINCIPAL DA TELA ====================

const ConteudoProdutoRequisitado = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extrai os parâmetros vindos do feed na URL
  const idDoacao = searchParams.get("idDoacao");
  const nomeAlimento = searchParams.get("nomeAlimento") || "Alimento Solicitado";
  const doadorNome = searchParams.get("doador") || "Doador FoodCare";
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
      <main className="flex-1 w-full flex flex-col items-center py-8 px-4 md:px-12">
        <div className="w-full max-w-[1000px] flex flex-col gap-6">

          <button
              onClick={() => router.push("/feed-receptor")}
              className="self-start flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#2b2e23] transition-colors cursor-pointer bg-white px-4 py-2 rounded-full border border-gray-200 shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Feed</span>
          </button>

          <div className="w-full bg-emerald-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="flex flex-col gap-1 text-center sm:text-left">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Solicitação Confirmada {idDoacao ? `#${idDoacao}` : ""}
              </span>
                <h1 className="font-serif font-bold text-2xl sm:text-3xl text-emerald-950">
                  Produto Requisitado com Sucesso!
                </h1>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            <div className="lg:col-span-5 flex flex-col gap-6">

              <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-xs flex flex-col gap-4">
                <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 flex items-center justify-center">
                  <img
                      src="/doacoes/embalados.png"
                      alt={nomeAlimento}
                      className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <h2 className="font-serif font-bold text-xl text-[#2b2e23]">
                    {nomeAlimento}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <Calendar className="w-4 h-4 text-[#bf211e]" />
                    <span>Status: <strong className="text-emerald-700">Pendente de Retirada</strong></span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs flex flex-col gap-4">
                <h3 className="font-bold text-base text-[#2b2e23] border-b border-gray-100 pb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#bf211e]" />
                  <span>Dados da Retirada</span>
                </h3>

                <div className="flex flex-col gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-400 block text-[11px]">Estabelecimento / Doador</span>
                    <strong className="text-[#2b2e23] text-base">{doadorNome}</strong>
                  </div>

                  <div className="flex items-start gap-2.5 pt-2 border-t border-gray-50">
                    <Clock className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-gray-500 block text-[11px]">Horário Sugerido</span>
                      <strong className="text-[#2b2e23]">Horário Comercial / A combinar</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-amber-800 mt-1">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Entre em contato com o doador para confirmar o melhor horário de retirada do alimento.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 p-6 shadow-xs flex flex-col">
              <ComponenteMapa
                  lat={lat}
                  lng={lng}
                  doadorNome={doadorNome}
              />
            </div>

          </div>

        </div>
      </main>
  );
};

// ==================== PÁGINA PRINCIPAL ====================

const TelaProdutoRequisitado = () => {
  return (
      <div className="flex min-h-screen w-full flex-col bg-[#f8f8f6] text-[#2b2e23] font-sans">
        <Topo />
        <Suspense
            fallback={
              <div className="flex-1 flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[#bf211e]" />
              </div>
            }
        >
          <ConteudoProdutoRequisitado />
        </Suspense>

        <footer className="w-full border-t bg-white px-6 md:px-12 py-8 mt-12 text-center text-xs text-gray-500">
          <p>© 2026 FoodCare - Conectando doadores e receptores em tempo real.</p>
        </footer>
      </div>
  );
};

export default TelaProdutoRequisitado;