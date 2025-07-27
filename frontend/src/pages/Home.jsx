import { useEffect, useState } from "react";

function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Aplica ou remove a classe do body quando o estado muda
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const links = [
    { text: "Portal do Aluno", href: "./login.html" },
    { text: "Infinity App", href: "#" },
    { text: "Chamadas", href: "#" },
    { text: "Planejamento", href: "#" },
  ];

  return (
    <section className="relative w-[80%] h-[90vh] flex justify-center items-center rounded-[50px] overflow-hidden bg-transparent">
      {/* Imagem de fundo */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-[center_top] z-0 transition-all duration-500 ${
          darkMode ? "bg-[url('./image/1.jpg')]" : "bg-[url('./image/2.jpg')]"
        }`}
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-screen gap-8">
        {/* Botão de alternância */}
        <div className="flex justify-center items-center gap-5">
          <button
            onClick={toggleDarkMode}
            className="absolute top-[50px] right-[10px] w-[100px] h-[45px] rounded-full bg-black/20 flex items-center justify-center p-5"
          >
            <i
              className={`fi fi-sr-sun bg-red-600 text-white w-[35px] h-[35px] flex items-center justify-center rounded-full transition-all duration-300 ease-in-out absolute ${
                darkMode ? "opacity-0 scale-0 translate-x-[55px]" : "opacity-100 scale-100 -translate-x-3"
              }`}
            ></i>
            <i
              className={`fi fi-sr-moon bg-red-600 text-white w-[35px] h-[35px] flex items-center justify-center rounded-full transition-all duration-300 ease-in-out absolute ${
                darkMode ? "opacity-100 scale-100 translate-x-10" : "opacity-0 scale-0"
              }`}
            ></i>
          </button>
        </div>

        {/* Links principais */}
        <div className="grid grid-cols-2 gap-[50px] w-[90%] mt-[200px] h-[30vh]">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className={`relative inline-block px-6 py-4 ${
                darkMode ? "bg-white/10 italic" : ""
              } text-black text-xl uppercase tracking-[4px] font-mono overflow-hidden transition-all duration-200 flex items-center justify-center rounded-[5px] group hover:bg-red-600 hover:text-black hover:shadow-[0_0_10px_#f32121,0_0_40px_#ff0000,0_0_80px_#ff0000]`}
            >
              {/* Linhas animadas */}
              <span className="absolute top-0 left-[-100%] w-full h-[2px] bg-gradient-to-r from-transparent to-red-600 group-hover:left-[100%] transition-all duration-500"></span>
              <span className="absolute top-[-100%] right-0 w-[2px] h-full bg-gradient-to-b from-transparent to-red-600 group-hover:top-[100%] transition-all duration-500 delay-150"></span>
              <span className="absolute bottom-0 right-[-100%] w-full h-[2px] bg-gradient-to-l from-transparent to-red-600 group-hover:right-[100%] transition-all duration-500 delay-300"></span>
              <span className="absolute bottom-[-100%] left-0 w-[2px] h-full bg-gradient-to-t from-transparent to-red-600 group-hover:bottom-[100%] transition-all duration-500 delay-500"></span>
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
