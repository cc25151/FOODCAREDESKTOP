'use client';

import React, { useState, useEffect } from "react";
import Footer from "@/components/Rodape";
import Topo from "@/components/Cabecalho";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { categoriaService } from "@/services/categoriaService";
import { alimentoService } from "@/services/alimentoService";
import {
  Search,
  X,
  MapPin,
  Utensils,
  ChevronRight,
  User,
  Sparkles,
  MapPinOff,
  Loader2
} from "lucide-react";

// ==================== TIPOS ====================

export type Categoria = {
  idCategoria: number;
  nome: string;
};

export type Alimento = {
  idAlimento: number;
  nome: string;
  descricao?: string;
  qntd?: string;
  quantidade?: string;
  validade?: string;
  idCategoria?: number;
  idDoador?: number;
  distancia?: number;
  doador?: {
    idDoador: number;
    idUsuario: number;
    usuario?: {
      nome?: string;
      cidade?: string;
      bairro?: string;
    };
  };
  imagem?: string;
};

const imagens: Record<number, string> = {
  1: "/doacoes/marmita-carne.png",
  2: "/doacoes/padaria.png",
  3: "/doacoes/frutas.png",
  4: "/doacoes/embalados.png",
  9: "/doacoes/enlatados.png",
};

// ==================== MODAL DE DETALHES ====================

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

  const handleIrParaPerfilDoador = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
    router.push("/perfil-doador");
  };

  const nomeDoador = alimento.doador?.usuario?.nome || "Doador FoodCare";
  const textoDistancia = alimento.distancia !== undefined && alimento.distancia !== null
      ? `${alimento.distancia.toFixed(1)} km de distância`
      : "Distância não calculada";

  return (
      <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fadeIn"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
      >
        <div
            className="relative w-full max-w-lg bg-white rounded-3xl border border-[#e8eaaf] shadow-2xl overflow-hidden my-8 transition-all"
            onClick={(e) => e.stopPropagation()}
        >
          <button
              onClick={onClose}
              className="absolute top-4 left-4 z-10 p-2.5 bg-white/90 hover:bg-white text-gray-700 rounded-full shadow-md border border-gray-200 cursor-pointer"
              aria-label="Fechar janela"
          >
            <X className="w-5 h-5 text-[#2b2e23]" />
          </button>

          <div className="relative w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
            <img
                src={imagens[Number(alimento.idCategoria)]}
                alt={alimento.nome}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <span className="absolute bottom-3 right-3 bg-white/95 text-[#2b2e23] font-semibold text-xs px-3 py-1.5 rounded-full shadow-xs flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5 text-[#bf211e]" />
              {alimento.qntd || alimento.quantidade || "1 unidade"}
          </span>
          </div>

          <div className="p-6 flex flex-col gap-5">
            <div className="text-center bg-[#fdfdf7] p-4 rounded-2xl border border-[#e8eaaf]">
              <h2 className="font-serif font-bold text-2xl text-[#2b2e23]">
                {alimento.nome}
              </h2>
              <div className="flex items-center justify-center gap-1.5 text-xs text-gray-600 mt-1.5 flex-wrap">
                <MapPin className="w-4 h-4 text-[#bf211e] shrink-0" />
                <span className="font-semibold text-[#2b2e23]">Doador:</span>
                <button
                    type="button"
                    onClick={handleIrParaPerfilDoador}
                    className="font-bold text-[#bf211e] hover:underline cursor-pointer bg-transparent border-0 p-0 text-xs"
                >
                  {nomeDoador}
                </button>
                <span>({textoDistancia})</span>
              </div>
            </div>

            <div className="w-full rounded-2xl overflow-hidden border border-gray-200 relative bg-slate-100 h-32 flex flex-col justify-between p-3">
              <div className="relative z-10 flex items-center justify-between">
              <span className="bg-white/90 text-[11px] font-bold text-gray-700 px-2.5 py-1 rounded-md border border-gray-200">
                Ponto de Retirada
              </span>
                <span className="bg-[#bf211e] text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
                Validade: {alimento.validade || "Não informada"}
              </span>
              </div>

              <button
                  type="button"
                  onClick={handleIrParaPerfilDoador}
                  className="relative z-10 flex items-center gap-2 bg-white/95 hover:bg-white p-2 rounded-xl border border-gray-200 text-left transition-colors cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full bg-[#bf211e]/10 flex items-center justify-center text-[#bf211e] font-bold text-xs shrink-0 group-hover:bg-[#bf211e] group-hover:text-white transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-[#2b2e23] group-hover:text-[#bf211e] group-hover:underline truncate">
                    {nomeDoador}
                  </p>
                  <p className="text-[11px] text-gray-500">Clique para ver o perfil público</p>
                </div>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-sm text-[#2b2e23] text-center">
                Descrição do Produto:
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed whitespace-pre-line bg-[#f8f8f6] p-4 rounded-xl border border-gray-100 max-h-40 overflow-y-auto">
                {alimento.descricao || "Sem descrição detalhada."}
              </p>
            </div>

            <button
                onClick={handleQueroEsteProduto}
                className="w-full py-3.5 bg-[#bf211e] hover:bg-[#a91d1a] text-white font-bold text-base rounded-xl transition-all shadow-md active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Quero este produto</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
  );
};

// ==================== SEÇÃO PRINCIPAL ====================

const SecaoFeedReceptor = () => {
  const [alimentos, setAlimentos] = useState<Alimento[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | number>("todos");

  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erroLocalizacao, setErroLocalizacao] = useState(false);
  const [alimentoSelecionado, setAlimentoSelecionado] = useState<Alimento | null>(null);


  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        const dados = await categoriaService.obterTodas();
        setCategorias(dados);
      } catch (err) {
        console.error("Erro ao carregar categorias:", err);
      }
    };
    carregarCategorias();
  }, []);


  useEffect(() => {
    const carregarFeed = async () => {
      setCarregando(true);
      setErroLocalizacao(false);

      const idUsuario = localStorage.getItem("idUsuario");
      if (!idUsuario) {
        setCarregando(false);
        return;
      }

      try {
        const lista: Alimento[] = await alimentoService.obterFeedPorUsuario(idUsuario);

        if (categoriaSelecionada === "recomendados") {
          const recomendados = lista.filter(
              (item) => item.distancia !== undefined && item.distancia !== null && item.distancia <= 3.0
          );
          setAlimentos(recomendados);
        } else if (categoriaSelecionada === "todos") {
          setAlimentos(lista);
        } else {

          const idCat = Number(categoriaSelecionada);
          setAlimentos(lista.filter((item) => item.idCategoria === idCat));
        }
      } catch (error: unknown) {
        if (isAxiosError(error) && error.response?.status === 400) {
          if (categoriaSelecionada === "recomendados") {
            setErroLocalizacao(true);
          }
          setAlimentos([]);
        } else {
          console.error("Erro ao carregar o feed:", error);
          setAlimentos([]);
        }
      } finally {
        setCarregando(false);
      }
    };

    carregarFeed();
  }, [categoriaSelecionada]);


  const alimentosFiltrados = alimentos.filter((item) => {
    const termo = busca.toLowerCase();
    const nome = item.nome?.toLowerCase() || "";
    const desc = (item.descricao || "").toLowerCase();
    return nome.includes(termo) || desc.includes(termo);
  });

  return (
      <section className="w-full bg-[#f8f8f6] py-10 px-4 md:px-12 flex flex-col items-center min-h-[calc(100vh-129px)]">
        <div className="w-full max-w-[1296px] flex flex-col items-center gap-8">

          {/* Cabeçalho */}
          <div className="flex flex-col items-center text-center gap-4 w-full">
            <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#2b2e23] tracking-tight">
              Alimentos disponíveis
            </h1>

            {/* Campo de Busca */}
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

            {/* Seletor de Categorias / Recomendados / Todos */}
            <div className="w-full max-w-3xl overflow-x-auto py-2 px-4 no-scrollbar">
              <div className="flex items-center gap-2 w-max mx-auto">
                {/* Opção TODOS */}
                <button
                    type="button"
                    onClick={() => setCategoriaSelecionada("todos")}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                        categoriaSelecionada === "todos"
                            ? "bg-[#2b2e23] text-white shadow-md"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                >
                  Todos
                </button>

                {/* Opção RECOMENDADOS */}
                <button
                    type="button"
                    onClick={() => setCategoriaSelecionada("recomendados")}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                        categoriaSelecionada === "recomendados"
                            ? "bg-[#bf211e] text-white shadow-md"
                            : "bg-white text-[#bf211e] border border-[#bf211e]/30 hover:bg-[#bf211e]/10"
                    }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Recomendados
                </button>

                {/* Categorias Dinâmicas da tabela Categoria */}
                {categorias.map((cat) => (
                    <button
                        key={cat.idCategoria}
                        type="button"
                        onClick={() => setCategoriaSelecionada(cat.idCategoria)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                            categoriaSelecionada === cat.idCategoria
                                ? "bg-[#2b2e23] text-white shadow-md"
                                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                        }`}
                    >
                      {cat.nome}
                    </button>
                ))}
              </div>
            </div>
          </div>

          {/* Estado de Carregamento */}
          {carregando ? (
              <div className="py-20 flex flex-col items-center gap-3 text-gray-500">
                <Loader2 className="w-8 h-8 animate-spin text-[#bf211e]" />
                <p className="text-sm font-semibold">Buscando alimentos...</p>
              </div>
          ) : erroLocalizacao ? (
              /* Alerta caso a API retorne 400 em Recomendados */
              <div className="w-full max-w-md bg-amber-50 border border-amber-200 rounded-3xl p-6 text-center flex flex-col items-center gap-3 my-8 shadow-xs">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700">
                  <MapPinOff className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#2b2e23] text-lg">
                  Localização necessária
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Você precisa cadastrar sua localização no perfil para visualizar as doações recomendadas.
                </p>
              </div>
          ) : alimentosFiltrados.length === 0 ? (
              <div className="py-16 text-center text-gray-500 text-base">
                Nenhum alimento encontrado para esta seleção.
              </div>
          ) : (
              /* Grid de Alimentos */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full pt-2">
                {alimentosFiltrados.map((alimento) => (
                    <article
                        key={alimento.idAlimento}
                        onClick={() => setAlimentoSelecionado(alimento)}
                        className="group bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden cursor-pointer hover:-translate-y-1"
                    >
                      <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                        <img
                            src={imagens[Number(alimento.idCategoria)]}
                            alt={alimento.nome}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                        />
                        <div className="absolute top-3 right-3 bg-white/90 text-[#2b2e23] text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs">
                          {alimento.qntd || alimento.quantidade || "1 un"}
                        </div>
                      </div>

                      <div className="p-5 flex flex-col flex-1 justify-between items-center text-center gap-3">
                        <div className="flex flex-col gap-1.5 w-full">
                          <h3 className="font-bold text-lg text-[#2b2e23] group-hover:text-[#bf211e] transition-colors truncate">
                            {alimento.nome}
                          </h3>
                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                            {alimento.descricao || "Sem descrição"}
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

        <ModalDetalhesAlimento
            alimento={alimentoSelecionado}
            onClose={() => setAlimentoSelecionado(null)}
        />
      </section>
  );
};

// ==================== COMPONENTE PRINCIPAL ====================

const FeedReceptor = () => {
  return (
      <div className="flex min-h-screen w-full flex-col items-stretch bg-white text-[#2b2e23] font-sans">
        <Topo />
        <main className="flex flex-1 flex-col">
          <SecaoFeedReceptor />
        </main>
        <Footer />
      </div>
  );
};

export default FeedReceptor;