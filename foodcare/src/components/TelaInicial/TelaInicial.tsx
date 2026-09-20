'use client';

import Link from "next/link";
import { Phone, Mail } from "lucide-react";

const opcoesParticipacao = [
  {
    titulo: "Instituição",
    descricao:
      "Seja uma instituição colaborativa com nossa causa e ajude milhares de pessoas",
    imagem: "/tela-inicial/icon.png",
  },
  {
    titulo: "Restaurante",
    descricao:
      "Divulgue seu trabalho fornecendo alimentos para os mais necessitados",
    imagem: "/tela-inicial/vector.svg",
  },
  {
    titulo: "Receptor",
    descricao:
      "Cadastre-se como receptor e receba doações de alimentos disponíveis",
    imagem: "/tela-inicial/image.svg",
  },
  {
    titulo: "Doador-Receptor",
    descricao:
      "Participe do projeto sendo um distribuidor de alimentos recebidos",
    imagem: "/tela-inicial/icon4.png",
  },
];

const detalhesContato = [
  {
    rotulo: "(19) xxxxx-xxxxx",
    Icone: Phone,
  },
  {
    rotulo: "FoodCare@gmail.com",
    Icone: Mail,
  },
];

export const TelaInicial = () => {
  const rolarParaParticipacao = (): void => {
    document.getElementById("participacao")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="w-full min-h-screen bg-white text-[#2b2e23] font-sans overflow-x-hidden">
      {/* HEADER */}
      <header className="w-full flex flex-col relative z-20">
        <div className="w-full h-[45px] bg-[#bf211e] flex justify-center items-center px-4 md:px-12">
          <div className="w-full max-w-[1296px] flex justify-between items-center text-white text-sm">
            <address className="flex items-center gap-6 not-italic">
              {detalhesContato.map((contato) => (
                <div
                  key={contato.rotulo}
                  className="flex items-center gap-2 text-xs sm:text-sm select-text"
                >
                  <contato.Icone className="w-4 h-4 text-white" />
                  <span>{contato.rotulo}</span>
                </div>
              ))}
            </address>
            <img
              className="h-6 w-auto object-contain"
              alt="Redes sociais FoodCare"
              src="/social.svg"
            />
          </div>
        </div>

        <div className="w-full bg-white border-b border-gray-100 shadow-sm flex justify-center items-center py-4 px-4 md:px-12">
          <div className="w-full max-w-[1296px] flex justify-between items-center">
            <a href="#inicio" className="flex items-center gap-3">
              <img
                className="h-10 sm:h-12 w-auto object-contain"
                alt="Logo FoodCare"
                src="/logo-preta.png"
              />
              <span className="font-serif italic font-normal text-2xl text-[#474747] tracking-tight">
                FOODCARE
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-3" aria-label="Navegação principal">
              <a
                href="#inicio"
                className="px-5 py-2 bg-[#dbdfd0] text-[#2b2e23] rounded-full text-sm font-medium hover:bg-opacity-80 transition-all"
              >
                Tela Inicial
              </a>
              <a
                href="#sobre"
                className="px-5 py-2 bg-[#dbdfd0] text-[#2b2e23] rounded-full text-sm font-medium hover:bg-opacity-80 transition-all"
              >
                Minha Página
              </a>
              <a
                href="#participacao"
                className="px-5 py-2 bg-[#dbdfd0] text-[#2b2e23] rounded-full text-sm font-medium hover:bg-opacity-80 transition-all"
              >
                Minhas Doações
              </a>
            </nav>

            <Link
              href="/login"
              className="px-6 py-2.5 rounded-full border-[1.5px] border-[#2b2e23] text-sm font-bold hover:bg-[#2b2e23] hover:text-white transition-all cursor-pointer text-center inline-block"
            >
              Minha Conta
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        id="inicio"
        className="w-full relative min-h-[500px] sm:min-h-[600px] lg:min-h-[680px] bg-cover bg-center flex items-center justify-center px-4"
        style={{ backgroundImage: "url('/tela-inicial/bg-hero.png')" }}
      >
        <div className="max-w-[800px] text-center flex flex-col items-center justify-center py-16 z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#2b2e23] tracking-tight leading-tight mb-3">
            Alimentar é<br />Transformar
          </h1>
          <p className="text-base sm:text-lg text-[#2b2e23]/80 font-medium mb-8">
            Onde sobra, a gente faz chegar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
            <button
              type="button"
              onClick={rolarParaParticipacao}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#bf211e] text-white rounded-full font-medium text-sm hover:bg-red-700 shadow-md transition-all cursor-pointer"
            >
              Seja um doador
            </button>
            <button
              type="button"
              onClick={rolarParaParticipacao}
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent border-[1.5px] border-[#2b2e23] text-[#2b2e23] rounded-full font-medium text-sm hover:bg-[#2b2e23] hover:text-white transition-all cursor-pointer"
            >
              Seja um receptor
            </button>
          </div>
        </div>
      </section>

      {/* PARTICIPAÇÃO */}
      <section
        id="participacao"
        className="w-full bg-[#f8f9fa] py-20 flex justify-center px-4 md:px-8"
      >
        <div className="w-full max-w-[1296px] flex flex-col items-center gap-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2b2e23] text-center">
            Como você pode participar
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {opcoesParticipacao.map((opcao) => (
              <article
                key={opcao.titulo}
                className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 rounded-full bg-[#f0f1ec] flex items-center justify-center mb-6">
                  <img
                    className="w-8 h-8 object-contain"
                    alt={opcao.titulo}
                    src={opcao.imagem}
                  />
                </div>
                <h3 className="text-xl font-bold text-[#2b2e23] mb-3">
                  {opcao.titulo}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {opcao.descricao}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section
        id="sobre"
        className="w-full bg-white py-20 flex justify-center px-4 md:px-8"
      >
        <div className="w-full max-w-[1296px] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <div className="relative w-full lg:w-1/2 max-w-[560px] h-[400px] sm:h-[460px] rounded-3xl overflow-hidden shadow-lg border border-gray-100 group">
            <img
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              alt="Alimentos preparados para distribuição"
              src="/tela-inicial/image-111.png"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 bg-[#bf211e] text-white p-4 sm:p-5 rounded-2xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-white/80 font-semibold block mb-0.5">
                  Fale Conosco
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                  Participe na causa
                </h3>
              </div>

              <address className="flex flex-col gap-1.5 not-italic border-t sm:border-t-0 sm:border-l border-white/20 pt-2 sm:pt-0 sm:pl-4">
                {detalhesContato.map((contato) => (
                  <div
                    key={contato.rotulo}
                    className="flex items-center gap-2 select-text"
                  >
                    <contato.Icone className="w-3.5 h-3.5 text-white flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">{contato.rotulo}</span>
                  </div>
                ))}
              </address>
            </div>
          </div>

          <div className="flex flex-col items-start gap-6 w-full lg:w-1/2 max-w-[580px]">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2b2e23]">
              Comida que gera esperança
            </h2>
            <p className="text-base sm:text-lg font-medium text-[#2b2e23] leading-relaxed">
              A FoodCare consiste em uma plataforma digital que conecta
              doadores de alimentos a pessoas e instituições que necessitam,
              promovendo o reaproveitamento de alimentos de forma organizada e
              eficiente.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              O objetivo da FoodCare é reduzir o desperdício de alimentos e
              facilitar sua redistribuição, utilizando recursos tecnológicos
              para priorizar doações com base em critérios como validade,
              proximidade e demanda. Dessa forma, busca-se contribuir para a
              segurança alimentar e gerar impacto social positivo.
            </p>
            <button
              type="button"
              onClick={rolarParaParticipacao}
              className="mt-2 px-8 py-3.5 rounded-full border-[1.5px] border-[#2b2e23] font-bold text-sm hover:bg-[#2b2e23] hover:text-white transition-all cursor-pointer"
            >
              Acompanhe nosso trabalho
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};