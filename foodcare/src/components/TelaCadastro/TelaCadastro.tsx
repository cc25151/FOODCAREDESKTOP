'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import { 
  Phone, 
  Mail, 
  Lock, 
  User, 
  ChevronDown, 
  Heart, 
  Hand, 
  Plus, 
  FileText,
  ArrowLeft 
} from "lucide-react";

type TipoParticipacao = "doador" | "receptor" | "ambos";

interface OpcaoParticipacao {
  valor: TipoParticipacao;
  rotulo: string;
  descricao: string;
  Icone: React.ElementType;
}

const opcoesParticipacao: OpcaoParticipacao[] = [
  {
    valor: "doador",
    rotulo: "Doador",
    descricao: "Quero doar",
    Icone: Heart,
  },
  {
    valor: "receptor",
    rotulo: "Receptor",
    descricao: "Quero receber",
    Icone: Hand,
  },
  {
    valor: "ambos",
    rotulo: "Ambos",
    descricao: "Doar e receber",
    Icone: Plus,
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

export const Cadastro = () => {
  const searchParams = useSearchParams();
  const tipoUrl = searchParams.get("tipo") as TipoParticipacao | null;

  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoPessoa, setTipoPessoa] = useState("fisica");
  const [documento, setDocumento] = useState("");
  const [tipoParticipacao, setTipoParticipacao] = useState<TipoParticipacao>("doador");
  const [estaEnviando, setEstaEnviando] = useState(false);

  // Atualiza o tipo de participação caso o usuário venha com o parâmetro na URL
  useEffect(() => {
    if (tipoUrl && ["doador", "receptor", "ambos"].includes(tipoUrl)) {
      setTipoParticipacao(tipoUrl);
    }
  }, [tipoUrl]);

  const aoSubmeter = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setEstaEnviando(true);
    window.setTimeout(() => {
      setEstaEnviando(false);
    }, 600);
  };

  return (
    <main className="relative min-h-screen w-full bg-[#1a0a00] flex flex-col justify-between items-center overflow-x-hidden font-sans">
      {/* FUNDO */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          src="/tela-login/bg-login.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      </div>

      {/* HEADER */}
      <header className="w-full relative z-20 flex flex-col">
        <div className="w-full h-[40px] bg-[#bf211e] flex justify-center items-center px-4 md:px-12">
          <div className="w-full max-w-[1296px] flex justify-between items-center text-white text-xs sm:text-sm">
            <address className="flex items-center gap-6 not-italic">
              {detalhesContato.map((contato) => (
                <div
                  key={contato.rotulo}
                  className="flex items-center gap-2 select-text"
                >
                  <contato.Icone className="w-3.5 h-3.5 text-white" />
                  <span>{contato.rotulo}</span>
                </div>
              ))}
            </address>
            <img
              className="h-5 w-auto object-contain"
              alt="Redes sociais FoodCare"
              src="/social.svg"
            />
          </div>
        </div>

        <div className="w-full bg-black/40 backdrop-blur-sm flex justify-center items-center py-3 px-4 md:px-12 border-b border-white/10">
          <div className="w-full max-w-[1296px] flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <img
                className="h-8 sm:h-9 w-auto object-contain"
                alt="Logo FoodCare"
                src="/logo-neon.png"
              />
              <span className="font-serif italic font-bold text-xl sm:text-2xl text-white tracking-tight">
                FOODCARE
              </span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#bf211e] hover:bg-[#d32926] text-white text-sm font-semibold transition-colors shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </Link>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="relative z-10 w-full max-w-lg px-4 py-8 my-auto flex flex-col items-center">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight mb-2">
            Junte-se à nossa missão
          </h1>
          <p className="text-[#ffd9c9] text-sm sm:text-base opacity-90">
            Crie sua conta para começar a doar ou receber alimentos
          </p>
        </div>

        <section 
          className="w-full bg-white/15 backdrop-blur-md border border-white/25 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center"
          aria-labelledby="titulo-cadastro"
        >
          <div className="flex items-center justify-center gap-2.5 pb-4">
            <img
              className="h-8 w-auto object-contain"
              alt=""
              aria-hidden="true"
              src="/logo-neon.png"
            />
            <span className="font-serif italic font-bold text-xl text-white tracking-tight">
              FOODCARE
            </span>
          </div>

          <div className="text-center pb-5">
            <h2 id="titulo-cadastro" className="text-2xl font-serif font-bold text-white mb-1">
              Crie sua conta
            </h2>
            <p className="text-xs sm:text-sm text-[#ffd9c9] opacity-85">
              Preencha os dados abaixo para participar
            </p>
          </div>

          <form className="w-full flex flex-col gap-4" onSubmit={aoSubmeter}>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="nome-completo" className="text-xs font-semibold text-[#ffe8dc]">
                Nome completo
              </label>
              <div className="flex h-12 w-full items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 focus-within:border-[#ffb899] focus-within:ring-1 focus-within:ring-[#ffb899] transition-all">
                <User className="w-4 h-4 text-white/70 flex-shrink-0" />
                <input
                  id="nome-completo"
                  name="nomeCompleto"
                  type="text"
                  autoComplete="name"
                  required
                  value={nomeCompleto}
                  onChange={(evento) => setNomeCompleto(evento.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-[#ffe8dc]">
                E-mail
              </label>
              <div className="flex h-12 w-full items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 focus-within:border-[#ffb899] focus-within:ring-1 focus-within:ring-[#ffb899] transition-all">
                <Mail className="w-4 h-4 text-white/70 flex-shrink-0" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(evento) => setEmail(evento.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="senha" className="text-xs font-semibold text-[#ffe8dc]">
                Senha
              </label>
              <div className="flex h-12 w-full items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 focus-within:border-[#ffb899] focus-within:ring-1 focus-within:ring-[#ffb899] transition-all">
                <Lock className="w-4 h-4 text-white/70 flex-shrink-0" />
                <input
                  id="senha"
                  name="senha"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={senha}
                  onChange={(evento) => setSenha(evento.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="tipo-pessoa" className="text-xs font-semibold text-[#ffe8dc]">
                Tipo de pessoa
              </label>
              <div className="relative flex h-12 w-full items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 focus-within:border-[#ffb899] focus-within:ring-1 focus-within:ring-[#ffb899] transition-all">
                <select
                  id="tipo-pessoa"
                  name="tipoPessoa"
                  value={tipoPessoa}
                  onChange={(evento) => setTipoPessoa(evento.target.value)}
                  className="w-full bg-transparent text-sm text-white focus:outline-none appearance-none cursor-pointer pr-6"
                >
                  <option value="fisica" className="bg-[#1a0a00] text-white">
                    Pessoa Física
                  </option>
                  <option value="juridica" className="bg-[#1a0a00] text-white">
                    Pessoa Jurídica
                  </option>
                </select>
                <ChevronDown className="w-4 h-4 text-white/70 absolute right-4 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="documento" className="text-xs font-semibold text-[#ffe8dc]">
                CPF / CNPJ
              </label>
              <div className="flex h-12 w-full items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 focus-within:border-[#ffb899] focus-within:ring-1 focus-within:ring-[#ffb899] transition-all">
                <FileText className="w-4 h-4 text-white/70 flex-shrink-0" />
                <input
                  id="documento"
                  name="documento"
                  type="text"
                  inputMode="numeric"
                  value={documento}
                  onChange={(evento) => setDocumento(evento.target.value)}
                  placeholder="000.000.000-00"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
                />
              </div>
            </div>

            <fieldset className="flex flex-col gap-2 mt-1">
              <legend className="text-xs font-semibold text-[#ffe8dc]">
                Tipo de participação
              </legend>
              <div className="grid grid-cols-3 gap-2 w-full">
                {opcoesParticipacao.map((opcao) => {
                  const estaSelecionado = tipoParticipacao === opcao.valor;
                  const IconeOpcao = opcao.Icone;
                  return (
                    <button
                      key={opcao.valor}
                      type="button"
                      aria-pressed={estaSelecionado}
                      onClick={() => setTipoParticipacao(opcao.valor)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer gap-1 ${
                        estaSelecionado
                          ? "bg-[#bf211e] border-white shadow-md scale-[1.02]"
                          : "bg-white/10 border-white/20 hover:bg-white/15"
                      }`}
                    >
                      <IconeOpcao className="w-5 h-5 text-white" />
                      <span className="text-xs font-bold text-white text-center">
                        {opcao.rotulo}
                      </span>
                      <span
                        className={`text-[10px] text-center ${
                          estaSelecionado ? "text-[#ffd9c9]" : "text-white/60"
                        }`}
                      >
                        {opcao.descricao}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={estaEnviando}
              className="h-12 w-full bg-[#bf211e] hover:bg-[#d32926] text-white font-bold rounded-xl shadow-lg transition-colors disabled:opacity-75 disabled:cursor-wait cursor-pointer mt-2"
            >
              {estaEnviando ? "Criando conta..." : "Criar conta"}
            </button>
          </form>

          <p className="text-sm text-[#ffe8dc]/80 flex items-center justify-center gap-1.5 mt-6">
            <span>Já tem uma conta?</span>
            <Link
              href="/login"
              className="font-bold text-[#ff8a65] hover:text-white underline transition-colors"
            >
              Entrar
            </Link>
          </p>
        </section>
      </div>

      {/* RODAPÉ */}
      <footer className="w-full relative z-20 bg-black/50 py-3 flex items-center justify-center">
        <p className="text-xs text-white/70 text-center">
          © 2026 FoodCare - Juntos contra a fome
        </p>
      </footer>
    </main>
  );
};