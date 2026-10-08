'use client';

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Phone, Mail, ArrowLeft, Calendar } from "lucide-react";

// ==================== TIPOS E INTERFACES ====================

type FormValues = {
  foodName: string;
  description: string;
  quantity: string;
  expirationDate: string;
};

type ItemNavegacao = {
  rotulo: string;
  link: string;
  ativo?: boolean;
  isRouterLink?: boolean;
};

// ==================== DADOS E CONSTANTES ====================

const initialFormValues: FormValues = {
  foodName: "",
  description: "",
  quantity: "",
  expirationDate: "",
};

const itensNavegacao: ItemNavegacao[] = [
  { rotulo: "Tela Inicial", link: "/", ativo: false, isRouterLink: true },
  { rotulo: "Feed Doador", link: "/feed-doador", ativo: true, isRouterLink: true },
  { rotulo: "Feed Receptor", link: "/feed-receptor", ativo: false, isRouterLink: true },
];

const detalhesContato = [
  {
    rotulo: "(19) 98956-0311",
    Icone: Phone,
    href: "tel:+5519989560311",
  },
  {
    rotulo: "FoodCare@gmail.com",
    Icone: Mail,
    href: "mailto:FoodCare@gmail.com",
  },
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

// ==================== FORMULÁRIO DE CADASTRO ====================

const SecaoCadastroAlimento = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = (field: keyof FormValues, value: string): void => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setIsSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setIsSubmitted(true);
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

        <div className="flex flex-col sm:flex-row items-start gap-5 w-full">
          <div className="flex flex-col items-start gap-2 w-full sm:flex-1">
            <label
              htmlFor="food-quantity"
              className="font-bold text-[#2b2e23] text-sm"
            >
              Quantidade *
            </label>
            <input
              id="food-quantity"
              name="quantity"
              type="text"
              required
              value={formValues.quantity}
              onChange={(event) => updateField("quantity", event.target.value)}
              placeholder="Ex: 50 marmitas de 400g"
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
                onChange={(event) =>
                  updateField("expirationDate", event.target.value)
                }
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
            className="w-full px-6 py-3.5 bg-[#bf211e] text-white rounded-lg font-bold text-sm hover:bg-[#a91d1a] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#bf211e] focus-visible:ring-offset-2"
          >
            Cadastrar Alimento para Doação
          </button>
        </div>

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

export const TelaCadastrarAlimentos = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-stretch bg-white text-[#2b2e23] font-sans">
      <SecaoCabecalho />
      <main className="flex flex-1 flex-col">
        <SecaoCadastroAlimento />
      </main>
      <SecaoRodape />
    </div>
  );
};

export default TelaCadastrarAlimentos;