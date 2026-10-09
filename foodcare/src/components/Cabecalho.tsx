'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail } from "lucide-react";

// ==================== TIPOS E INTERFACES ====================

interface ItemNavegacao {
  rotulo: string;
  link: string;
}

interface HeaderProps {
  paginaAtivaOverride?: string;
}

// ==================== DADOS E CONSTANTES ====================

const itensNavegacao: ItemNavegacao[] = [
  { rotulo: "Tela Inicial", link: "/" },
  { rotulo: "Feed Doador", link: "/feed-doador" },
  { rotulo: "Feed Receptor", link: "/feed-receptor" },
];

const detalhesContato = [
  {
    rotulo: "(19) 98956-0311",
    Icone: Phone,
    href: "tel:+5519989560311",
  },
  {
    rotulo: "contato@foodcare.org",
    Icone: Mail,
    href: "mailto:contato@foodcare.org",
  },
];

// ==================== COMPONENTE HEADER ====================

export const Topo: React.FC<HeaderProps> = ({ paginaAtivaOverride }) => {
  const pathname = usePathname();

  return (
    <header className="w-full flex flex-col relative z-20">
      {/* Barra Vermelha de Contato */}
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

      {/* Menu de Navegação Principal */}
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
            {itensNavegacao.map((item) => {
              const estaAtivo = paginaAtivaOverride
                ? paginaAtivaOverride === item.link
                : pathname === item.link;

              return (
                <Link
                  key={item.rotulo}
                  href={item.link}
                  className={`px-5 py-2 text-[#2b2e23] rounded-full text-sm font-medium transition-all ${
                    estaAtivo
                      ? "bg-[#dbdfd0]"
                      : "bg-transparent hover:bg-[#dbdfd0]/50"
                  }`}
                  aria-current={estaAtivo ? "page" : undefined}
                >
                  {item.rotulo}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/perfil"
            className="px-6 py-2.5 rounded-full border-[1.5px] border-[#2b2e23] text-sm font-bold hover:bg-[#2b2e23] hover:text-white transition-all cursor-pointer text-center inline-block"
          >
            Minha Conta
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Topo;