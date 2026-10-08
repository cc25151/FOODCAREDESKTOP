'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Phone,
  Mail,
  User,
  Star,
  MessageSquareQuote,
  Building,
  Loader2,
  ArrowLeft,
} from "lucide-react";

// ==================== TIPOS E INTERFACES ====================

export interface DetalhePerfil {
  label: string;
  value: string;
}

export interface AvaliacaoReceptor {
  id: string;
  instituicao: string;
  avaliacao: string;
  data: string;
  texto: string;
}

export interface PerfilPublicoDoador {
  nome: string;
  subtitulo: string;
  mediaEstrelas: string;
  totalAvaliacoesTexto: string;
  detalhes: DetalhePerfil[];
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
              <span>(19) 98956-0311</span>
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

          <nav className="hidden md:flex items-center gap-3" aria-label="Navegação principal">
            <Link
              href="/"
              className="px-5 py-2 text-[#2b2e23] rounded-full text-sm font-medium hover:bg-[#dbdfd0] transition-all"
            >
              Tela Inicial
            </Link>
            <Link
              href="/minha-pagina"
              className="px-5 py-2 text-[#2b2e23] rounded-full text-sm font-medium hover:bg-[#dbdfd0] transition-all"
            >
              Feed Doador
            </Link>
            <Link
              href="/feed-doador"
              className="px-5 py-2 text-[#2b2e23] rounded-full text-sm font-medium hover:bg-[#dbdfd0] transition-all"
            >
              Feed Receptor
            </Link>
          </nav>

          <Link
            href="/feed-receptor"
            className="px-6 py-2.5 rounded-full border-[1.5px] border-[#2b2e23] text-sm font-bold hover:bg-[#2b2e23] hover:text-white transition-all cursor-pointer text-center"
          >
            Minha Conta
          </Link>
        </div>
      </div>
    </header>
  );
};

// ==================== DETALHES DO DOADOR ====================

interface SecaoPerfilDoadorProps {
  perfil: PerfilPublicoDoador;
}

const camposPadraoRotulos = [
  "NOME DO DOADOR",
  "LOCALIZAÇÃO",
  "TOTAL DE AVALIAÇÕES",
  "TIPO",
  "TEMPO NO APLICATIVO",
  "E-MAIL DE CONTATO",
  "DOAÇÕES REALIZADAS",
];

const SecaoPerfilDoador: React.FC<SecaoPerfilDoadorProps> = ({ perfil }) => {
  const listaDetalhes =
    perfil.detalhes && perfil.detalhes.length > 0
      ? perfil.detalhes
      : camposPadraoRotulos.map((rotulo) => ({ label: rotulo, value: "" }));

  return (
    <section aria-labelledby="supermarket-profile-title" className="w-full flex flex-col md:flex-row items-start gap-8 lg:gap-12">
      <aside aria-label="Resumo da avaliação do doador" className="w-full md:w-[320px] lg:w-[380px] shrink-0 flex flex-col items-center gap-6 p-8 bg-[#f8f8f6] rounded-3xl border border-gray-200/80 shadow-xs">
        <div className="w-40 h-40 rounded-full bg-[#dbdfd0] flex items-center justify-center overflow-hidden border border-gray-300/50">
          <User className="w-24 h-24 text-[#2b2e23]" />
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-200/60">
            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            <span className="font-serif font-bold text-2xl text-gray-900">
              {perfil.mediaEstrelas || "—"}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            {perfil.totalAvaliacoesTexto || "Aguardando avaliações"}
          </p>
        </div>
      </aside>

      <div className="flex-1 flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2">
          <h1 id="supermarket-profile-title" className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#2b2e23] tracking-tight">
            Perfil de {perfil.nome || "Doador"}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            {perfil.subtitulo}
          </p>
        </div>

        <dl className="flex flex-col gap-3.5">
          {listaDetalhes.map((detail) => (
            <div key={detail.label} className="w-full bg-[#f4f4f1] border border-gray-200/60 rounded-2xl px-5 py-3.5 flex flex-col gap-1 transition-all">
              <dt className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                {detail.label}
              </dt>
              <dd className="text-sm font-bold text-[#2b2e23]">
                {detail.value || <span className="text-gray-400 font-semibold italic text-xs">—</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

// ==================== AVALIAÇÕES DOS RECEPTORES ====================

interface SecaoAvaliacoesProps {
  avaliacoes: AvaliacaoReceptor[];
}

const SecaoAvaliacoesReceptores: React.FC<SecaoAvaliacoesProps> = ({ avaliacoes }) => {
  return (
    <section className="w-full flex flex-col gap-6 pt-6 border-t border-gray-200/80" aria-labelledby="recipient-reviews-title">
      <div className="flex items-center gap-3">
        <MessageSquareQuote className="w-7 h-7 text-[#bf211e]" />
        <h2 id="recipient-reviews-title" className="font-serif font-bold text-2xl sm:text-3xl text-[#2b2e23]">
          Últimas Avaliações de Receptores
        </h2>
      </div>

      {avaliacoes.length === 0 ? (
        <div className="w-full p-8 bg-[#f8f8f6] rounded-2xl border border-gray-200/80 text-center text-xs sm:text-sm text-gray-500">
          Nenhuma avaliação registrada até o momento.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {avaliacoes.map((review) => (
            <article key={review.id} className="flex flex-col gap-3 p-6 bg-[#f8f8f6] rounded-2xl border border-gray-200/80 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#dbdfd0] flex items-center justify-center shrink-0">
                    <Building className="w-5 h-5 text-[#2b2e23]" />
                  </div>
                  <h3 className="font-bold text-base text-[#2b2e23]">
                    {review.instituicao}
                  </h3>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100/80 border border-amber-200/60 rounded-lg">
                    <Star className="w-4 h-4 text-amber-600 fill-amber-500" />
                    <span className="font-bold text-amber-700 text-xs sm:text-sm">
                      {review.avaliacao}
                    </span>
                  </div>
                  <time className="text-xs sm:text-sm text-gray-500">
                    {review.data}
                  </time>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-0 sm:pl-13">
                "{review.texto}"
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

// ==================== RODAPÉ ====================

const SecaoRodape = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white px-6 md:px-12 py-8 mt-auto text-center text-xs text-gray-500">
      <div className="w-full max-w-[1296px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 FoodCare - Transparência e impacto social contra o desperdício.</p>
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-[#2b2e23] transition-colors">Tela Inicial</Link>
          <Link href="/minhas-doacoes" className="hover:text-[#2b2e23] transition-colors">Doações</Link>
        </div>
      </div>
    </footer>
  );
};

// ==================== PÁGINA PRINCIPAL ====================

export const PerfilDoador = () => {
  const router = useRouter();

  const [perfil, setPerfil] = useState<PerfilPublicoDoador>({
    nome: "",
    subtitulo: "Parceiro ativo no combate ao desperdício e na distribuição de esperança.",
    mediaEstrelas: "",
    totalAvaliacoesTexto: "",
    detalhes: [],
  });

  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoReceptor[]>([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const carregarPerfilPublicoAPI = async () => {
      setCarregando(true);
      try {
        // Chamada de API para buscar perfil do doador e suas avaliações
      } catch (error) {
        console.error(error);
      } finally {
        setCarregando(false);
      }
    };

    carregarPerfilPublicoAPI();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f8f8f6] text-[#2b2e23] font-sans">
      <SecaoCabecalho />

      <main className="flex-1 w-full flex justify-center py-8 px-4 md:px-12">
        <div className="w-full max-w-[1296px] flex flex-col gap-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 self-start px-4 py-2 bg-[#f4f4f1] hover:bg-[#dbdfd0] text-[#2b2e23] text-xs font-bold rounded-full transition-all cursor-pointer border border-gray-200/80 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>

          {carregando ? (
            <div className="w-full py-20 flex justify-center items-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#bf211e]" />
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              <SecaoPerfilDoador perfil={perfil} />
              <SecaoAvaliacoesReceptores avaliacoes={avaliacoes} />
            </div>
          )}
        </div>
      </main>

      <SecaoRodape />
    </div>
  );
};

export default PerfilDoador;