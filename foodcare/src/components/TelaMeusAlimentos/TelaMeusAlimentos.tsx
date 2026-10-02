'use client';

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Phone, Mail, ArrowLeft } from "lucide-react";

// ==================== TIPOS E INTERFACES ====================

type ContribuicaoAlimento = {
  nome: string;
  descricao: string;
  quantidade: string;
  dataValidade: string;
  imagem: string;
};

type ItemNavegacao = {
  rotulo: string;
  link: string;
  ativo?: boolean;
  isRouterLink?: boolean;
};

// ==================== DADOS E CONSTANTES ====================

const contribuicoesAlimentos: ContribuicaoAlimento[] = [
  {
    nome: "Marmita de Carne",
    descricao: "Arroz, feijão, purê de batata, carne moída refogada e salada verde (500g)",
    quantidade: "45 unidades",
    dataValidade: "12/03/2026",
    imagem: "/doacoes/marmita-carne.png",
  },
  {
    nome: "Cesta de Hortaliças",
    descricao: "Alface crespa, tomate italiano orgânico, cenoura fresca e brócolis do dia",
    quantidade: "12 cestas médias",
    dataValidade: "10/03/2026",
    imagem: "/doacoes/cesta-hortalicas.png",
  },
  {
    nome: "Pão Francês (50 unidades)",
    descricao: "Pães crocantes fresquinhos, assados na primeira fornada da manhã",
    quantidade: "3 lotes (150 pães)",
    dataValidade: "08/03/2026",
    imagem: "/doacoes/pao-frances.png",
  },
  {
    nome: "Arroz com Feijão",
    descricao: "Marmitas congeladas higienizadas de arroz agulhinha e feijão carioca (400g)",
    quantidade: "60 unidades",
    dataValidade: "05/03/2026",
    imagem: "/doacoes/arroz-feijao.png",
  },
  {
    nome: "Marmita de Frango",
    descricao: "Arroz, feijão, frango grelhado, batata frita e salada (300g)",
    quantidade: "30 unidades",
    dataValidade: "28/02/2026",
    imagem: "/doacoes/marmita-frango.png",
  },
  {
    nome: "Frutas Variadas",
    descricao: "Maçãs vermelhas, bananas nanicas, laranjas pera e mamão formosa higienizados",
    quantidade: "15 kg de frutas mistas",
    dataValidade: "22/02/2026",
    imagem: "/doacoes/frutas-variadas.png",
  },
];

const linksPaginas = ["Tela Inicial", "Sobre Nós", "Doações"];
const linksContato = ["Suporte 24h", "Parcerias", "Imprensa"];

const itensNavegacao: ItemNavegacao[] = [
  { rotulo: "Tela Inicial", link: "/", ativo: false, isRouterLink: true },
  { rotulo: "Feed Doador", link: "/feed-doador", ativo: true, isRouterLink: true },
  { rotulo: "Feed Receptor", link: "/feed-receptor", ativo: false, isRouterLink: true },
];

const detalhesContato = [
  {
    rotulo: "(19) 3124-5500",
    Icone: Phone,
    href: "tel:+551931245500",
  },
  {
    rotulo: "contato@foodcare.org",
    Icone: Mail,
    href: "mailto:contato@foodcare.org",
  },
];

// ==================== CABEÇALHO ====================

const SecaoCabecalho = () => {
  return (
    <header className="w-full flex flex-col relative z-20">
      <div className="w-full h-[45px] bg-[#bf211e] flex justify-center items-center px-4 md:px-12">
        <div className="w-full max-w-[1296px] flex justify-between items-center text-white text-sm">
          <address className="flex items-center gap-6 not-italic">
            {detalhesContato.map((contato) => (
              <a
                key={contato.rotulo}
                href={contato.href}
                className="flex items-center gap-2 text-xs sm:text-sm text-white hover:underline no-underline"
              >
                <contato.Icone className="w-4 h-4 text-white" />
                <span>{contato.rotulo}</span>
              </a>
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
            {itensNavegacao.map((item) => {
              const classeBotao = `px-5 py-2 text-[#2b2e23] rounded-full text-sm font-medium transition-all ${
                item.ativo
                  ? "bg-[#dbdfd0]"
                  : "bg-transparent hover:bg-[#dbdfd0]/50"
              }`;

              if (item.isRouterLink) {
                return (
                  <Link
                    key={item.rotulo}
                    href={item.link}
                    className={classeBotao}
                  >
                    {item.rotulo}
                  </Link>
                );
              }

              return (
                <a
                  key={item.rotulo}
                  href={item.link}
                  className={classeBotao}
                  aria-current={item.ativo ? "page" : undefined}
                >
                  {item.rotulo}
                </a>
              );
            })}
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
  );
};

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
          className="self-stretch [font-family:'Playfair_Display',Helvetica] font-bold text-3xl md:text-[42px] leading-[normal] text-[#2b2e23]"
        >
          Meus alimentos
        </h1>
        <p className="relative self-stretch text-gray-600 text-base md:text-lg">
          Acompanhe o histórico completo de todas as suas contribuições sociais e combates diretos ao desperdício.
        </p>
      </div>
    </section>
  );
};

// ==================== HISTÓRICO DE CONTRIBUIÇÕES ====================

const SecaoHistoricoContribuicoes = () => {
  return (
    <section
      aria-label="Histórico de contribuições de alimentos"
      className="gap-8 pt-10 pb-20 px-6 md:px-[150px] flex flex-col items-start relative self-stretch w-full"
    >
      <div className="gap-6 flex flex-col items-start relative self-stretch w-full">
        {contribuicoesAlimentos.map((alimento) => (
          <article
            key={alimento.nome}
            className="flex items-start gap-6 relative self-stretch w-full"
          >
            <div className="flex flex-col sm:flex-row items-start gap-5 p-5 relative flex-1 bg-white rounded-2xl border border-solid border-gray-200 shadow-sm">
              <img
                className="relative w-full sm:w-40 h-[190px] object-cover rounded-lg"
                alt={`Imagem de ${alimento.nome}`}
                src={alimento.imagem}
                loading="lazy"
              />
              <div className="flex flex-col min-h-[190px] items-start justify-between relative flex-1 w-full">
                <div className="flex flex-col items-start gap-1.5 relative self-stretch w-full">
                  <div className="items-center justify-between flex relative self-stretch w-full">
                    <h3 className="relative w-fit font-bold text-xl text-[#2b2e23] tracking-tight truncate">
                      {alimento.nome}
                    </h3>
                  </div>
                  <p className="relative self-stretch font-normal text-gray-500 text-sm leading-5 line-clamp-2">
                    {alimento.descricao}
                  </p>
                  <div className="flex-col items-start gap-1 pt-2 pb-0 flex relative self-stretch w-full">
                    <p className="relative w-fit text-[15px] leading-normal whitespace-nowrap">
                      <span className="font-semibold text-[#2b2e23]">
                        Quantidade:{" "}
                      </span>
                      <span className="text-gray-500">{alimento.quantidade}</span>
                    </p>
                    <p className="relative w-fit text-sm leading-normal">
                      <span className="font-semibold text-[#2b2e23]">
                        Data de validade:{" "}
                      </span>
                      <span className="text-gray-500">
                        {alimento.dataValidade}
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

// ==================== RODAPÉ ====================

const SecaoRodape = () => {
  return (
    <footer
      className="flex w-full flex-col items-start gap-10 border-t bg-[#f8f8f6] px-6 md:px-[150px] pt-[60px] pb-10"
      aria-label="Rodapé do site"
    >
      <div className="flex w-full flex-col md:flex-row items-start justify-between gap-8">
        <div className="relative flex w-full md:w-[400px] flex-col items-start gap-5">
          <Link
            className="inline-flex items-center gap-3 no-underline"
            href="/"
            aria-label="FoodCare - Página inicial"
          >
            <img
              className="h-[34px] w-[38px] object-contain"
              alt="Logo FoodCare"
              src="/logo-preta.png"
            />
            <span className="font-bold italic text-2xl text-[#2b2e23] [font-family:'Playfair_Display',Helvetica]">
              FOODCARE
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-[#2b2e23]">
            Conectando quem tem em abundância com quem precisa urgentemente. Uma ponte digital contra o desperdício de alimentos.
          </p>
        </div>
        <nav
          className="inline-flex items-start gap-16"
          aria-label="Links do rodapé"
        >
          <div className="relative flex w-[150px] flex-col items-start gap-4">
            <h2 className="font-bold text-base text-[#2b2e23]">
              Páginas
            </h2>
            {linksPaginas.map((link) => (
              <a
                key={link}
                className="text-sm text-gray-500 hover:text-gray-800 no-underline"
                href="#"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="relative flex w-[150px] flex-col items-start gap-4">
            <h2 className="font-bold text-base text-[#2b2e23]">
              Contato
            </h2>
            {linksContato.map((link) => (
              <a
                key={link}
                className="text-sm text-gray-500 hover:text-gray-800 no-underline"
                href="#"
              >
                {link}
              </a>
            ))}
          </div>
        </nav>
      </div>
      <hr className="w-full border-gray-200" />
      <div className="flex w-full flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>
          © 2026 FoodCare - Juntos contra o desperdício e a fome.
        </p>
        <img
          className="w-[121px] h-[27px] object-contain"
          alt="Redes sociais"
          src="/social.svg"
        />
      </div>
    </footer>
  );
};

// ==================== COMPONENTE PRINCIPAL ====================

export const MeusAlimentos = () => {
  return (
    <div
      className="flex min-h-screen w-full flex-col items-stretch bg-white text-[#2b2e23] font-sans"
      data-model-id="233:306"
    >
      <SecaoCabecalho />
      <main className="flex flex-1 flex-col">
        <SecaoIntroducao />
        <SecaoHistoricoContribuicoes />
      </main>
      <SecaoRodape />
    </div>
  );
};

export default MeusAlimentos;