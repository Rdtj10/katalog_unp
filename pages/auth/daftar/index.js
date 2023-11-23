import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Daftar = () => {
  const notify = () => toast ("ASU");
  const router = useRouter();
  const [val, setValue] = useState(true);
  const trueCon = () => {
    setValue(true);
  };
  const falseCon = () => {
    setValue(false);
  };
  const [nim, setNim] = useState("");
  const [nama, setNama] = useState("");
  const [faculty, setFaculty] = useState("");
  const [univ,setUniv] = useState("");
  const handle = async () => {
    try {
      const response = await fetch("/api/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nim, nama, faculty }),
      });

      if (response.ok) {
        toast.info("Daftar Berhasil",{
          position: toast.POSITION.BOTTOM_LEFT,
        });
        router.push("/auth/login");
      } else {
        console.error("Pendaftaran Gagal");
      }
    } catch (error) {
      alert("Terjadi kesalahan jaringan: " + error);
      console.error("Terjadi kesalahan jaringan: " + error);
    }
  };
  const handleTamu = async () => {
    try {
      const response = await fetch("/api/signUp-tamu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nim, nama, faculty, univ }),
      });

      if (response.ok) {
        toast.info("Daftar Berhasil",{
          position: toast.POSITION.BOTTOM_LEFT,
        });
        router.push("/auth/login");
      } else {
        console.error("Pendaftaran Gagal");
      }
    } catch (error) {
      alert("Terjadi kesalahan jaringan: " + error);
      console.error("Terjadi kesalahan jaringan: " + error);
    }
  };

  return (
    <div className="pt-10 flex flex-col h-full justify-center items-center">
      {/* Kontainer 1 */}
      <div className="relative bg-[#1a409a] shadow-slate-800 shadow-lg hover:transition-shadow hover:duration-300 hover:shadow-xl hover:shadow-slate-900 rounded-lg">
        <div className="flex">
          <div className="w-1/2">
            <button
              className={`${
                val
                  ? "bg-[#FFA01A] text-lg w-full text-white rounded-l-lg py-2"
                  : "hover:bg-[#213b79] text-lg w-full text-white rounded-l-lg py-2"
              }`}
              onClick={trueCon}
            >
              Mahasiswa UNP
            </button>
          </div>
          <div className="w-1/2">
            <button
              className={`${
                !val
                  ? "bg-[#FFA01A] text-lg w-full text-white rounded-r-lg py-2"
                  : "hover:bg-[#213b79] text-lg w-full text-white rounded-r-lg py-2"
              }`}
              onClick={falseCon}
            >
              Tamu
            </button>
          </div>
        </div>

        <div className="flex justify-center p-5">
          <div className="p-5 flex flex-col justify-center items-center">
            {val ? (
              <div className="flex flex-col items-center space-y-4 max-w-xl transition-opacity duration:100 ease-in-out">
                <h1 className="text-2xl mb-5 text-white font-bold">
                  Daftar sebagai{" "}
                  <span className="text-[#ff9600]">Mahasiswa UNP</span>
                </h1>
                <input
                  name="nim"
                  type="text"
                  placeholder="NIP / NIM / No Induk"
                  className="border h-10 p-2 rounded w-96"
                  onChange={(e) => setNim(e.target.value)}
                />
                <input
                  name="name"
                  type="text"
                  placeholder="Nama"
                  className="border h-10 p-2 rounded w-96"
                  onChange={(e) => setNama(e.target.value)}
                />
                <select
                  name="faculty"
                  type="text"
                  placeholder="Fakultas"
                  className="border h-10 p-2 rounded w-96"
                  onChange={(e) => setFaculty(e.target.value)}
                >
                  <option>Fakultas Ekonomi dan Bisnis</option>
                  <option>Fakultas Bahasa dan Seni</option>
                  <option>Fakultas Teknik</option>
                  <option>Fakultas Pariwisata dan Perhotelan</option>
                  <option>Fakultas Ilmu Pendidikan</option>
                  <option>Fakultas Ilmu Sosial</option>
                  <option>Fakultas Psikologi dan Kesehatan</option>
                  <option>Fakultas Matematika Ilmu Pengetahuan Alam</option>
                  <option>Fakultas Ilmu Keolahragaan</option>
                  <option>Pascasarjana</option>
                </select>
                <button
                  className="bg-[#ff9600] hover:bg-[#bc7005] hover:shadow-inner h-10  text-white font-bold w-52 py-2 px-4 rounded"
                  onClick={handle}
                >
                  Daftar
                </button>
                <div className=" mt-10 flex items-center justify-center w-full">
                  <p className="text-white text-lg font-normal">
                    Sudah Punya Akun ?{" "}
                    <Link
                      href="/auth/login"
                      className="hover:underline hover:text-[#ff9600]"
                    >
                      Masuk
                    </Link>
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4 max-w-xl">
                <h1 className="text-2xl mb-5 text-white font-bold">
                  Daftar sebagai Tamu
                </h1>
                <input
                  type="text"
                  placeholder="NIP / NIM / No Induk"
                  className="border h-10 p-2 rounded w-96"
                  onChange={(e) => setNim(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Nama"
                  className="border h-10 p-2 rounded w-96"
                  onChange={(e) => setNama(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Fakultas"
                  className="border h-10 p-2 rounded w-96"
                  onChange={(e) => setFaculty(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Perguruan Tinggi"
                  className="border h-10 p-2 rounded w-96"
                  onChange={(e) => setUniv(e.target.value)}
                />
                <button onClick={handleTamu} className="bg-[#ff9600] hover:bg-[#bc7005] h-10 w-52 hover:shadow-inner text-white font-bold py-2 px-4 rounded">
                  Daftar
                </button>
                <div className=" mt-10 flex items-center justify-center w-full">
                  <p className="text-white text-lg font-normal">
                    Sudah Punya Akun ?{" "}
                    <Link
                      href="/"
                      className="hover:underline hover:text-[#ff9600]"
                    >
                      Masuk
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Daftar;
