'use client';

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Phone, Mail, Lock, ArrowLeft } from "lucide-react";

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

export const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [estaEnviando, setEstaEnviando] = useState(false);

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
            Conectando quem tem com quem precisa
          </h1>
          <p className="text-[#ffd9c9] text-sm sm:text-base opacity-90">
            Doe alimentos, transforme vidas. Cada refeição importa.
          </p>
        </div>

        <section 
          className="w-full bg-white/15 backdrop-blur-md border border-white/25 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col items-center"
          aria-labelledby="login-title"
        >
          <div className="flex items-center justify-center gap-2.5 pb-5">
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

          <div className="text-center pb-6">
            <h2 id="login-title" className="text-2xl font-serif font-bold text-white mb-1">
              Bem-vindo de volta
            </h2>
            <p className="text-xs sm:text-sm text-[#ffd9c9] opacity-85">
              Entre na sua conta para continuar
            </p>
          </div>

          <form className="w-full flex flex-col gap-4" onSubmit={aoSubmeter}>
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
              <label htmlFor="password" className="text-xs font-semibold text-[#ffe8dc]">
                Senha
              </label>
              <div className="flex h-12 w-full items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 focus-within:border-[#ffb899] focus-within:ring-1 focus-within:ring-[#ffb899] transition-all">
                <Lock className="w-4 h-4 text-white/70 flex-shrink-0" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={senha}
                  onChange={(evento) => setSenha(evento.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-center pt-1 pb-2">
              <button
                type="button"
                className="text-xs text-[#ffb899] hover:text-white underline transition-colors cursor-pointer bg-transparent border-0"
              >
                Esqueceu a senha?
              </button>
            </div>

            <button
              type="submit"
              disabled={estaEnviando}
              className="h-12 w-full bg-[#bf211e] hover:bg-[#d32926] text-white font-bold rounded-xl shadow-lg transition-colors disabled:opacity-75 disabled:cursor-wait cursor-pointer"
            >
              {estaEnviando ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="w-full flex items-center gap-3 my-5" aria-hidden="true">
            <div className="h-px flex-1 bg-white/20" />
            <span className="text-xs text-white/60">ou</span>
            <div className="h-px flex-1 bg-white/20" />
          </div>

          <p className="text-sm text-[#ffe8dc]/80 flex items-center justify-center gap-1.5">
            <span>Não tem uma conta?</span>
            <button
              type="button"
              className="font-bold text-[#ff8a65] hover:text-white underline transition-colors cursor-pointer bg-transparent border-0"
            >
              Criar conta
            </button>
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