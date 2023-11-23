import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [nim, setNim] = useState("");
  const handle = async (event) => {
    event.preventDefault();
    if (!nim) {
      toast.warn("Isi NIM-nya dulu ya! :)",{
        position: toast.POSITION.BOTTOM_LEFT
      });
      return;
    }
    const data = await signIn("credentials", {
      nim,
      callbackUrl: "/",
    });
    if (data?.error) {
      toast.warn("Nim tidak ditemukan, apakah kamu belum mendaftar?");
      setError("NIM Tidak Valid");
      return;
    } else {
      router.push("/");
    }
    
  };

  return (
    <div className=" py-28 flex flex-col h-full justify-center items-center">
      <div className="relative flex justify-center p-10 items-center w-fit h-fit bg-[#1a409a] shadow-slate-800 shadow-lg hover:transition-shadow hover:duration-300 hover:shadow-xl hover:shadow-slate-900 rounded-lg">
        <div className=" flex flex-col justify-center items-center">
          <h1 className="text-3xl mb-10 text-white font-bold">Masuk</h1>
          <form onSubmit={handle}>
            <div className="flex flex-col items-center space-y-4 max-w-xl">
              <input
                type="number"
                placeholder="NIM / NPM / No.Induk"
                className="border pl-6 py-2 rounded w-96"
                onChange={(e) => setNim(e.target.value)}
              />
              <button
                className=" bg-[#ff9600] w-48 hover:bg-[#bc7005] hover:shadow-inner text-white font-bold py-2 px-4 rounded-full"
                type="submit"
              >
                Masuk
              </button>
            </div>
          </form>
          <div className=" mt-10 flex items-center justify-center w-full">
            <p className="text-white text-xl font-normal">
              Belum Punya Akun ?{" "}
              <Link
                href="/auth/daftar"
                className="hover:underline hover:text-[#ff9600]"
              >
                Daftar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
