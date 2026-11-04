'use client';

import { useState, FormEvent } from "react";
import Footer from "@/components/Rodape";
import { useRouter } from "next/navigation";
import Topo from "@/components/Cabecalho";
import { ArrowLeft, Calendar, ChevronDown, Tag } from "lucide-react";
import { alimentoService } from "@/services/alimentoService";

// ==================== DADOS E CONSTANTES ====================

const CATEGORIAS_DISPONIVEIS = [
  {
    idCategoria: 1,
    nome: "Marmitas e Refeições Prontas",
    imagem: "marmita-carne.png"
  },
  {
    idCategoria: 2,
    nome: "Padaria e Confeitaria",
    imagem: "padaria.png"
  },
  {
    idCategoria: 3,
    nome: "Frutas e Hortifruti",
    imagem: "frutas-variadas.png"
  },
  {
    idCategoria: 4,
    nome: "Alimentos Embalados",
    imagem: "embalados.png"
  },
  {
    idCategoria: 9,
    nome: "Enlatados e Conservas",
    imagem: "enlatados.png"
  }
];

type FormValues = {
  foodName: string;
  description: string;
  quantity: string;
  expirationDate: string;
  idCategoria: string;
};

const initialFormValues: FormValues = {
  foodName: "",
  description: "",
  quantity: "",
  expirationDate: "",
  idCategoria: "",
};

// ==================== FORMULÁRIO DE CADASTRO ====================

const SecaoCadastroAlimento = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (field: keyof FormValues, value: string): void => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setIsSubmitted(false);
    setErrorMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const idUsuario = localStorage.getItem('idUsuario');

      if (!idUsuario) {
        setErrorMessage("Você precisa estar logado para cadastrar um alimento.");
        setIsSubmitting(false);
        return;
      }

      if (!formValues.idCategoria) {
        setErrorMessage("Selecione uma categoria válida.");
        setIsSubmitting(false);
        return;
      }

      const partesData = formValues.expirationDate.split('/');
      if (partesData.length !== 3) {
        setErrorMessage("Informe a data no formato DD/MM/AAAA.");
        setIsSubmitting(false);
        return;
      }
      const dataFormatada = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;

      const alimentoParaAPI = {
        nome: formValues.foodName,
        descricao: formValues.description,
        qntd: parseInt(formValues.quantity, 10),
        validade: dataFormatada,
        idCategoria: parseInt(formValues.idCategoria, 10),
      };

      await alimentoService.cadastrar(idUsuario, alimentoParaAPI);

      setIsSubmitted(true);
      setFormValues(initialFormValues);
    } catch (error) {
      console.error("Erro ao cadastrar alimento:", error);
      setErrorMessage("Erro ao conectar com a API. Verifique os dados e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="food-donation-registration-title"
      className="flex flex-col items-center gap-8 py-12 px-4 md:px-12 w-full bg-[#f8f8f6] min-h-[calc(100vh-129px)]"
    >
      <div className="w-full max-w-2xl flex flex-col items-start gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#2b2e23] hover:text-[#bf211e] transition-colors cursor-pointer"
          aria-label="Voltar para a página anterior"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>

        <header className="flex flex-col items-center text-center gap-3 w-full">
          <h1
            id="food-donation-registration-title"
            className="font-serif font-bold text-3xl sm:text-4xl text-[#2b2e23]"
          >
            Cadastrar Alimento
          </h1>
          <p className="max-w-xl text-gray-600 text-sm sm:text-base leading-relaxed">
            Preencha as especificações do lote de alimento disponível para doar. Garanta que todas as informações de qualidade sejam corretas.
          </p>
        </header>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl gap-6 p-6 sm:p-10 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col items-start"
      >
        {/* NOME DO ALIMENTO */}
        <div className="gap-2 w-full flex flex-col items-start">
          <label
            htmlFor="food-name"
            className="font-bold text-[#2b2e23] text-sm"
          >
            Nome do Alimento *
          </label>
          <input
            id="food-name"
            name="foodName"
            type="text"
            required
            value={formValues.foodName}
            onChange={(event) => updateField("foodName", event.target.value)}
            placeholder="Ex: Marmita de Frango, Cesta de Frutas frescas"
            className="w-full px-4 py-3 bg-[#f8f8f6] rounded-lg border border-gray-300 text-[#2b2e23] text-sm focus:outline-none focus:ring-2 focus:ring-[#bf211e] placeholder:text-gray-400"
          />
        </div>

        {/* SELECT DE CATEGORIA ESTILIZADO */}
        <div className="gap-2 w-full flex flex-col items-start">
          <label
            htmlFor="food-category"
            className="font-bold text-[#2b2e23] text-sm flex items-center gap-1.5"
          >
            <Tag className="w-4 h-4 text-[#bf211e]" />
            Categoria *
          </label>
          <div className="relative w-full">
            <select
              id="food-category"
              name="idCategoria"
              required
              value={formValues.idCategoria}
              onChange={(event) => updateField("idCategoria", event.target.value)}
              className="w-full px-4 py-3 bg-[#f8f8f6] rounded-lg border border-gray-300 text-[#2b2e23] text-sm focus:outline-none focus:ring-2 focus:ring-[#bf211e] appearance-none cursor-pointer pr-10"
            >
              <option value="" disabled hidden>
                Selecione uma categoria...
              </option>
              {CATEGORIAS_DISPONIVEIS.map((cat) => (
                <option key={cat.idCategoria} value={cat.idCategoria} className="text-[#2b2e23] py-1">
                  #{cat.idCategoria} — {cat.nome}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* DESCRIÇÃO */}
        <div className="gap-2 w-full flex flex-col items-start">
          <label
            htmlFor="food-description"
            className="font-bold text-[#2b2e23] text-sm"
          >
            Descrição Detalhada *
          </label>
          <textarea
            id="food-description"
            name="description"
            rows={4}
            required
            value={formValues.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Descreva os ingredientes, se requer refrigeração, sachês separados ou embalagem..."
            className="w-full p-4 bg-[#f8f8f6] rounded-lg border border-gray-300 text-[#2b2e23] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#bf211e] placeholder:text-gray-400"
          />
        </div>

        {/* QUANTIDADE E DATA DE VALIDADE */}
        <div className="flex flex-col sm:flex-row items-start gap-5 w-full">
          <div className="flex flex-col items-start gap-2 w-full sm:flex-1">
            <label
              htmlFor="food-quantity"
              className="font-bold text-[#2b2e23] text-sm"
            >
              Quantidade (unidades) *
            </label>
            <input
              id="food-quantity"
              name="quantity"
              type="number"
              min="1"
              required
              value={formValues.quantity}
              onChange={(event) => updateField("quantity", event.target.value)}
              placeholder="Ex: 50"
              className="w-full px-4 py-3 bg-[#f8f8f6] rounded-lg border border-gray-300 text-[#2b2e23] text-sm focus:outline-none focus:ring-2 focus:ring-[#bf211e] placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col items-start gap-2 w-full sm:flex-1">
            <label
              htmlFor="expiration-date"
              className="font-bold text-[#2b2e23] text-sm"
            >
              Data de Validade *
            </label>
            <div className="items-center justify-between px-4 py-3 flex w-full bg-[#f8f8f6] rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-[#bf211e]">
              <input
                id="expiration-date"
                name="expirationDate"
                type="text"
                required
                inputMode="numeric"
                value={formValues.expirationDate}
                onChange={(event) => updateField("expirationDate", event.target.value)}
                placeholder="DD/MM/AAAA"
                aria-label="Data de Validade"
                className="w-full bg-transparent text-[#2b2e23] text-sm focus:outline-none placeholder:text-gray-400"
              />
              <Calendar className="w-5 h-5 text-gray-400 shrink-0 ml-2" />
            </div>
          </div>
        </div>

        <hr className="w-full border-gray-200 my-2" />

        <div className="w-full">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3.5 bg-[#bf211e] text-white rounded-lg font-bold text-sm hover:bg-[#a91d1a] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#bf211e] focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Enviando para a API..." : "Cadastrar Alimento para Doação"}
          </button>
        </div>

        {errorMessage && (
          <p
            role="alert"
            className="w-full text-center text-sm font-medium text-red-700 bg-red-50 p-3 rounded-lg border border-red-200"
          >
            {errorMessage}
          </p>
        )}

        {isSubmitted && (
          <p
            role="status"
            className="w-full text-center text-sm font-medium text-emerald-700 bg-emerald-50 p-3 rounded-lg border border-emerald-200"
          >
            Alimento cadastrado com sucesso!
          </p>
        )}
      </form>
    </section>
  );
};

// ==================== COMPONENTE PRINCIPAL ====================

const TelaCadastrarAlimentos = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-stretch bg-white text-[#2b2e23] font-sans">
      <Topo />
      <main className="flex flex-1 flex-col">
        <SecaoCadastroAlimento />
      </main>
      <Footer />
    </div>
  );
};

export default TelaCadastrarAlimentos;