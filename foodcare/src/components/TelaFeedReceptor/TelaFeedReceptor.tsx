'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Phone,
  Mail,
  Search,
  X,
  MapPin,
  Utensils,
  ChevronRight,
} from "lucide-react";

// ==================== TIPOS E INTERFACES ====================

export type Alimento = {
  id: string;
  nome: string;
  descricaoCurta: string;
  descricaoDetalhada: string;
  quantidade: string;
  dataValidade: string;
  doadorNome: string;
  distancia: string;
  imagem: string;
  mapaImagem?: string;
};

type ItemNavegacao = {
  rotulo: string;
  link: string;
  ativo?: boolean;
  isRouterLink?: boolean;
};

// ==================== DADOS MOCK (PRONTO PARA API) ====================

const alimentosMock: Alimento[] = [
  {
    id: "1",
    nome: "Marmita de Carne",
    descricaoCurta: "Arroz, feijão, purê, carne e salada (500g)",
    descricaoDetalhada:
      "Marmita reforçada contendo Arroz agulhinha soltinho (150g), Feijão carioca temperado com alho e louro (100g), Purê de batata cremoso com manteiga (100g), Carne bovina de panela desfiada e suculenta (120g) e Salada fresca de alface com tomate (30g). Embalagem selada e higienizada.",
    quantidade: "15 unidades",
    dataValidade: "12/03/2026",
    doadorNome: "Restaurante Sabor Real",
    distancia: "1.2 km de distância",
    imagem: "/doacoes/marmita-carne.png",
    mapaImagem: "https://maps.googleapis.com/maps/api/staticmap?center=-22.9068,-47.0616&zoom=14&size=600x250&maptype=roadmap&markers=color:red%7Clabel:D%7C-22.9068,-47.0616&key=",
  },
  {
    id: "2",
    nome: "Marmita de Frango",
    descricaoCurta: "Arroz, feijão, frango, batata frita e salada (300g)",
    descricaoDetalhada:
      "Filé de frango grelhado marinado no limão e ervas finas (100g), acompanhado de Arroz branco (100g), Feijão fresco (50g) e porção de Batata frita crocante (50g). Tudo preparado na manhã de hoje sob rigorosas normas de higiene.",
    quantidade: "20 unidades",
    dataValidade: "12/03/2026",
    doadorNome: "Marmitaria da Dona Ana",
    distancia: "2.4 km de distância",
    imagem: "/doacoes/marmita-frango.png",
    mapaImagem: "https://maps.googleapis.com/maps/api/staticmap?center=-22.9000,-47.0600&zoom=14&size=600x250&maptype=roadmap&markers=color:red%7Clabel:D%7C-22.9000,-47.0600&key=",
  },
  {
    id: "3",
    nome: "Marmita de Strogonoff",
    descricaoCurta: "Strogonoff de frango com batata palha (500g)",
    descricaoDetalhada:
      "Strogonoff cremoso de peito de frango com creme de leite fresco e champignon (250g), acompanhado de Arroz branco bem soltinho (200g) e Batata palha crocante embalada separadamente para não murchar (50g).",
    quantidade: "10 unidades",
    dataValidade: "11/03/2026",
    doadorNome: "Bistro e Cia",
    distancia: "0.8 km de distância",
    imagem: "/doacoes/marmita-strog.png",
  },
  {
    id: "4",
    nome: "Marmita de Macarrão",
    descricaoCurta: "Macarrão ao molho vermelho (300g)",
    descricaoDetalhada:
      "Massa Spaghetti (180g): Espaguete de grano duro cozido al dente, fios longos envolvidos perfeitamente no molho.\n\nMolho Bolognesa Artesanal (110g): Carne moída bovina de primeira refogada com alho, cebola, tomates maduros, folhas de manjericão e azeite extravirgem.\n\nToque Final (10g): Sachê separado de queijo parmesão ralado para polvilhar na hora de consumir.",
    quantidade: "12 unidades",
    dataValidade: "10/03/2026",
    doadorNome: "Cantina Bella Italia",
    distancia: "1.5 km de distância",
    imagem: "/doacoes/marmita-macarrao.png",
  },
  {
    id: "5",
    nome: "Cesta de Hortaliças Frescas",
    descricaoCurta: "Alface, tomate orgânico e cenoura (1.5kg)",
    descricaoDetalhada:
      "Cesta verde fresquinha colhida no dia! Contém 2 pés de alface crespa higienizados, 1kg de tomate italiano maduro, 500g de cenouras crocantes e um maço de cheiro-verde.",
    quantidade: "8 cestas",
    dataValidade: "14/03/2026",
    doadorNome: "Horta Comunitária Esperança",
    distancia: "3.1 km de distância",
    imagem: "/doacoes/cesta-hortalicas.png",
  },
  {
    id: "6",
    nome: "Lote de Pães Franceses",
    descricaoCurta: "Pães crocantes assados na manhã (Lote com 10un)",
    descricaoDetalhada:
      "Saco com 10 pães franceses quentinhos, assados na primeira fornada do dia. Ideais para consumo imediato no café ou produção de lanches.",
    quantidade: "15 lotes",
    dataValidade: "09/03/2026",
    doadorNome: "Padaria Pão D'Ouro",
    distancia: "0.5 km de distância",
    imagem: "/doacoes/pao-frances.png",
  },
  {
    id: "7",
    nome: "Kit Frutas Variadas",
    descricaoCurta: "Maçãs, bananas nanicas e laranjas pera (2kg)",
    descricaoDetalhada:
      "Combinação nutritiva de frutas selecionadas contendo 5 maçãs fuji, 1 dúzia de bananas nanicas maduras e 6 laranjas pera suculentas.",
    quantidade: "10 kits",
    dataValidade: "13/03/2026",
    doadorNome: "Sacolão da Economia",
    distancia: "1.8 km de distância",
    imagem: "/doacoes/frutas-variadas.png",
  },
  {
    id: "8",
    nome: "Sopa Nutritiva de Legumes",
    descricaoCurta: "Caldo de mandioca com carne desfiada (400ml)",
    descricaoDetalhada:
      "Sopa quente e reconfortante feita com base de mandioca, mandioquinha, cenoura, chuchu e farta quantidade de carne bovina desfiada.",
    quantidade: "25 potes",
    dataValidade: "10/03/2026",
    doadorNome: "Cozinha Solidária",
    distancia: "2.0 km de distância",
    imagem: "/doacoes/arroz-feijao.png",
  },
];

const itensNavegacao: ItemNavegacao[] = [
  { rotulo: "Tela Inicial", link: "/", ativo: false, isRouterLink: true },
  { rotulo: "Feed Doador", link: "/feed-doador", ativo: false, isRouterLink: true },
  { rotulo: "Feed Receptor", link: "/feed-receptor", ativo: true, isRouterLink: true },
];

const detalhesContato = [
  { rotulo: "(19) 3124-5500", Icone: Phone, href: "tel:+551931245500" },
  { rotulo: "contato@foodcare.org", Icone: Mail, href: "mailto:contato@foodcare.org" },
];

const linksPaginas = ["Tela Inicial", "Sobre Nós", "Doações"];
const linksContato = ["Suporte 24h", "Parcerias", "Imprensa"];

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

// ==================== MODAL DE DETALHES DO PRODUTO ====================

interface ModalProps {
  alimento: Alimento | null;
  onClose: () => void;
}

const ModalDetalhesAlimento: React.FC<ModalProps> = ({ alimento, onClose }) => {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!alimento) return null;

  const handleQueroEsteProduto = () => {
    onClose();
    router.push("/produto-requisitado");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-modal"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl border border-[#e8eaaf] shadow-2xl overflow-hidden my-8 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2.5 bg-white/90 hover:bg-white text-gray-700 rounded-full shadow-md transition-transform hover:scale-105 border border-gray-200 cursor-pointer"
          aria-label="Fechar janela"
        >
          <X className="w-5 h-5 text-[#2b2e23]" />
        </button>

        {/* Imagem do Alimento */}
        <div className="relative w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={alimento.imagem}
            alt={alimento.nome}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <span className="absolute bottom-3 right-3 bg-white/95 text-[#2b2e23] font-semibold text-xs px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5 text-[#bf211e]" />
            {alimento.quantidade}
          </span>
        </div>

        {/* Conteúdo do Modal */}
        <div className="p-6 flex flex-col gap-5">
          {/* Cabeçalho do Produto */}
          <div className="text-center bg-[#fdfdf7] p-4 rounded-2xl border border-[#e8eaaf]">
            <h2
              id="titulo-modal"
              className="font-serif font-bold text-2xl text-[#2b2e23]"
            >
              {alimento.nome}
            </h2>
            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-600 mt-1.5">
              <MapPin className="w-4 h-4 text-[#bf211e]" />
              <span className="font-semibold text-[#2b2e23]">Doadores Próximos:</span>
              <span>{alimento.doadorNome} ({alimento.distancia})</span>
            </div>
          </div>

          {/* Mapa Visual Simulado de Localização */}
          <div className="w-full rounded-2xl overflow-hidden border border-gray-200 relative bg-slate-100 h-32 flex flex-col justify-between p-3">
            <div className="absolute inset-0 opacity-20 bg-[radial-[#bf211e]_1px,transparent_1px] [background-size:16px_16px]" />
            <div className="relative z-10 flex items-center justify-between">
              <span className="bg-white/90 text-[11px] font-bold text-gray-700 px-2.5 py-1 rounded-md shadow-xs border border-gray-200">
                Ponto de Retirada
              </span>
              <span className="bg-[#bf211e] text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
                Validade: {alimento.dataValidade}
              </span>
            </div>
            <div className="relative z-10 flex items-center gap-2 bg-white/90 p-2 rounded-xl border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-[#bf211e]/10 flex items-center justify-center text-[#bf211e] font-bold text-xs shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-left overflow-hidden">
                <p className="text-xs font-bold text-[#2b2e23] truncate">{alimento.doadorNome}</p>
                <p className="text-[11px] text-gray-500">Clique para abrir direções no mapa</p>
              </div>
            </div>
          </div>

          {/* Descrição do Produto */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-sm text-[#2b2e23] text-center">
              Descrição do Produto:
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed whitespace-pre-line bg-[#f8f8f6] p-4 rounded-xl border border-gray-100 max-h-40 overflow-y-auto">
              {alimento.descricaoDetalhada}
            </p>
          </div>
          <button
            onClick={handleQueroEsteProduto}
            className="w-full py-3.5 bg-[#bf211e] hover:bg-[#a91d1a] text-white font-bold text-base rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Quero este produto</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== LISTA DE CARDS E FEED ====================

const SecaoFeedReceptor = () => {
  const [alimentos] = useState<Alimento[]>(alimentosMock);
  const [busca, setBusca] = useState("");
  const [alimentoSelecionado, setAlimentoSelecionado] = useState<Alimento | null>(null);

  const alimentosFiltrados = alimentos.filter(
    (item) =>
      item.nome.toLowerCase().includes(busca.toLowerCase()) ||
      item.descricaoCurta.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <section aria-label="Alimentos disponíveis para doação" className="w-full bg-[#f8f8f6] py-10 px-4 md:px-12 flex flex-col items-center min-h-[calc(100vh-129px)]">
      <div className="w-full max-w-[1296px] flex flex-col items-center gap-8">
        
        {/* Título e Pesquisa */}
        <div className="flex flex-col items-center text-center gap-4 w-full">
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#2b2e23] tracking-tight">
            Alimentos disponíveis
          </h1>

          {/* Campo de Busca de Alimentos */}
          <div className="relative w-full max-w-md mt-2">
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Pesquisar alimento ou ingrediente..."
              className="w-full pl-11 pr-4 py-3 bg-white rounded-full border border-gray-300 text-sm text-[#2b2e23] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#bf211e] transition-all placeholder:text-gray-400"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            {busca && (
              <button
                onClick={() => setBusca("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Grid de Alimentos */}
        {alimentosFiltrados.length === 0 ? (
          <div className="py-16 text-center text-gray-500 text-base">
            Nenhum alimento encontrado para "{busca}".
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full pt-4">
            {alimentosFiltrados.map((alimento) => (
              <article
                key={alimento.id}
                onClick={() => setAlimentoSelecionado(alimento)}
                className="group bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden cursor-pointer hover:-translate-y-1"
              >
                {/* Imagem do Card */}
                <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={alimento.imagem}
                    alt={alimento.nome}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#2b2e23] text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs">
                    {alimento.quantidade}
                  </div>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-5 flex flex-col flex-1 justify-between items-center text-center gap-3">
                  <div className="flex flex-col gap-1.5 w-full">
                    <h3 className="font-bold text-lg text-[#2b2e23] group-hover:text-[#bf211e] transition-colors truncate">
                      {alimento.nome}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {alimento.descricaoCurta}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setAlimentoSelecionado(alimento);
                    }}
                    className="mt-2 px-5 py-2 rounded-full border border-[#2b2e23] text-xs font-bold text-[#2b2e23] group-hover:bg-[#2b2e23] group-hover:text-white transition-all cursor-pointer"
                  >
                    Ver Produto
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Modal Popup */}
      <ModalDetalhesAlimento
        alimento={alimentoSelecionado}
        onClose={() => setAlimentoSelecionado(null)}
      />
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

export const FeedReceptor = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-stretch bg-white text-[#2b2e23] font-sans">
      <SecaoCabecalho />
      <main className="flex flex-1 flex-col">
        <SecaoFeedReceptor />
      </main>
      <SecaoRodape />
    </div>
  );
};

export default FeedReceptor;