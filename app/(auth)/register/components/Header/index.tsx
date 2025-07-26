import Link from "next/link";

export const RegisterFormHeader = () => (
  <div className="text-center mb-8">
    <Link href="/" className="inline-flex items-center space-x-2 group mb-6">
      <div className="bg-[#15941f] rounded transition-transform duration-200 group-hover:scale-110">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          className="lucide lucide-plus h-10 w-10 text-white rotate-0 transition-transform duration-300 group-hover:rotate-90"
          aria-hidden="true"
        >
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>
      </div>
      <span className="text-[#15941f] text-2xl font-bold tracking-tight">
        Medilogic
      </span>
    </Link>
    <h1 className="text-3xl font-bold text-gray-50 mb-2">
      Welcome to Medilogic! 🙂
    </h1>
    <p className="text-gray-300">Create your Medilogic account</p>
  </div>
);
