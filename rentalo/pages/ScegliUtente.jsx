import Link from "next/link";
import "../app/globals.css";
import Image from "next/image";

function ScegliUtente() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-600 to-gray-700 relative">
      <div className="absolute top-0 left-0 sm:ml-1 sm:mt-4 lg:m-8">
        <Link
          href="/"
          className="text-5xl font-bold text-white hover:text-gray-700 flex items-center"
        >
          <Image
            width={74}
            height={74}
            src="/logo.png"
            alt="Rentalo Logo"
            className="mr-1 color: white;"
          />{" "}
          Rentalo
        </Link>
      </div>
      <div className="absolute bottom-0 left-0 w-full z-0">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            d="M0,64L80,90.7C160,117,320,171,480,181.3C640,192,800,160,960,138.7C1120,117,1280,107,1360,101.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            fill="rgba(0, 0, 0, 0.22)"
          ></path>
        </svg>
      </div>

      <div className="lg:w-45/6 mt-[80px] p-8 bg-white rounded-lg shadow-lg z-10 relative">
        <div className="text-center sm:mb-2 lg:mb-20">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-2 lg:mb-4">
            Noleggia Attrezzature e Macchinari
          </h1>
          <p className="text-xl text-gray-600 sm:mb-3 lg:mb-10">
            Seleziona il tipo di account per continuare la registrazione
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Operatore */}
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center hover:bg-blue-50">
            <h2 className="sm:text-2xl lg:text-3xl font-semibold mb-6 text-gray-800">
              Operatore
            </h2>
            <p className="text-lg  mb-6 text-gray-700">
              Creando un account come operatore avrai la possibilità di guidare
              macchinari nel caso il noleggio tra due parti abbia necessità.
            </p>
            <Link href="/RegistraOperatore">
              <button className="bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-800">
                Registrati
              </button>
            </Link>
          </div>

          {/* Privato */}
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center hover:bg-blue-50">
            <h2 className="sm:text-2xl lg:text-3xl font-semibold mb-6 text-gray-800">
              Privato
            </h2>
            <p className="text-lg mb-6 text-gray-700">
              Creando un account come privato avrai la possibilità di noleggiare
              tutti i macchinari di cui hai bisogno. Avrai inoltre una pratica
              schermata dove gestire tutte le tue inforamazioni.
            </p>
            <Link href="/RegistraPrivato">
              <button className="bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-800">
                Registrati
              </button>
            </Link>
          </div>

          {/* Impresa */}
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center hover:bg-blue-50">
            <h2 className="sm:text-2xl lg:text-3xl font-semibold mb-6 text-gray-800">
              Azienda
            </h2>
            <p className="text-lg mb-6 text-gray-700">
              Creando un account aziendale avrai la possibilità di mettere a
              noleggio e gestire il tuo parco macchine. Sarai inoltre in grado
              di prendere a noleggio macchinari da altre concessionarie.
            </p>
            <Link href="/RegistraAzienda">
              <button className="bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-800">
                Registrati
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/Login"
            className="text-blue-800 hover:underline cursor-pointer"
          >
            Già Registrato? Effettua il login.
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ScegliUtente;
