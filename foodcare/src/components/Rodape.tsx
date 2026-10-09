'use client';

import Link from "next/link";

// ==================== TIPOS E INTERFACES ====================

interface LinkRodape {
  rotulo: string;
  link: string;
}

// ==================== DADOS E CONSTANTES ====================

const linksPaginasRodape: LinkRodape[] = [
  { rotulo: "Tela Inicial", link: "/" },
  { rotulo: "Feed Doador", link: "/feed-doador" },
  { rotulo: "Feed Receptor", link: "/feed-receptor" },
  { rotulo: "Minha Conta", link: "/perfil" },
  { rotulo: "Meus Alimentos", link: "/meus-alimentos" },
  { rotulo: "Produto Requisitado", link: "/produto-requisitado" },

];

// ==================== COMPONENTE FOOTER ====================

export const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 pt-12 pb-8 px-4 md:px-12 mt-auto">
      <div className="w-full max-w-[1296px] mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex flex-col gap-4 max-w-md">
            <Link href="/" className="flex items-center gap-3 no-underline">
              <img
                className="h-8 w-auto object-contain"
                alt="Logo FoodCare"
                src="/logo-preta.png"
              />
              <span className="font-serif italic font-bold text-xl text-[#2b2e23] tracking-tight">
                FOODCARE
              </span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Conectando quem tem em abundância com quem precisa urgentemente. Uma ponte digital contra o desperdício de alimentos.
            </p>
          </div>

          <div className="flex items-start gap-12 sm:gap-16">
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold text-[#2b2e23]">Páginas</h4>
              <ul className="grid grid-flow-col grid-rows-4 gap-x-8 sm:gap-x-12 gap-y-2">
                {linksPaginasRodape.map((pagina) => (
                  <li key={pagina.rotulo}>
                    <Link
                      href={pagina.link}
                      className="text-xs sm:text-sm text-gray-500 hover:text-[#2b2e23] transition-colors whitespace-nowrap"
                    >
                      {pagina.rotulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-gray-200 w-full" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-500">
          <p>© 2026 FoodCare - Juntos contra o desperdício e a fome.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;