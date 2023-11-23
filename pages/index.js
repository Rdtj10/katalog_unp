import { useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { BiSolidUpArrow } from "react-icons/bi";
import { toast } from "react-toastify";
import Link from "next/link";

const Index = () => {
  //State Management
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [tahun, setYear] = useState("");
  const [faculty, setFaculty] = useState("");
  const [results, setResults] = useState([]);
  const [iconChange, setIconChange] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  //State Management

  //Required variables
  const showData = 30;
  const lastIndex = showData * currentPage;
  const firstIndex = lastIndex - showData;
  const records = results.slice(firstIndex, lastIndex);
  const totalPage = Math.ceil(results.length / showData);
  const numbers = [...Array(totalPage + 1).keys()].slice(1);
  //Required variables

  //Handler
  const handleIconClick = () => {
    setIsSearchVisible(!isSearchVisible);
    setIconChange(!iconChange);
  };
  const handleSearch = async () => {
    setCurrentPage(1);
    try {
      setIsLoading(true); // Aktifkan loading state

      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword, faculty, tahun }),
      });

      if (!keyword && !faculty && !tahun) {
        toast.warn("Harap isi form pencarian terlebih dahulu :(", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else {
        if (response.ok) {
          const data = await response.json();
          setResults(data);
          if (data.length === 0) {
            toast.error("Data tidak ditemukan :(", {
              position: toast.POSITION.BOTTOM_LEFT,
            });
          }
        } else {
          console.error("Gagal melakukan pencarian");
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan jaringan: " + error);
    } finally {
      setIsLoading(false); // Nonaktifkan loading state setelah pencarian selesai
    }
  };
  const prePage = () => {
    if (currentPage === 1) {
      setCurrentPage(totalPage);
    } else if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage === totalPage) {
      setCurrentPage(1);
    } else if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const changePage = (id) => {
    setCurrentPage(id);
  };
  //Handler

  return (
    <div className="flex flex-col items-end justify-center px-20">
      {isSearchVisible && (
        <div className="w-fit flex flex-col justify-center items-center p-4 bg-[#ff9600] rounded-bl-xl">
          <div
            className={`flex flex-row space-x-4 ${
              isSearchVisible
                ? "transition-all duration-500 opacity-100"
                : "transition-all duration-500 opacity-0"
            }`}
          >
            <input
              type="text"
              placeholder="Keyword"
              className="border text-black border-gray-300 px-3 py-1 rounded"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Fakultas"
              className="border text-black border-gray-300 px-3 py-1 rounded"
              onChange={(e) => setFaculty(e.target.value)}
            />
            <input
              type="text"
              placeholder="Tahun"
              className="border text-black border-gray-300 px-3 py-1 rounded w-28"
              onChange={(e) => setYear(e.target.value)}
            />
            <button
              className={`bg-[#1a409a] hover:scale-110 duration-300 hover:duration-300 transition-all hover:shadow-inner text-white font-bold py-2 px-4 rounded w-fit ml-10 ${
                isLoading ? "opacity-50 cursor-not-allowed duration-300 transition-all" : ""
              }`}
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? (<FaSpinner className="animate-spine mr-2"/>) : "Cari"}
            </button>
          </div>
        </div>
      )}
      <div
        className="cursor-pointer px-4 py-2 flex space-x-2 flex-row w-fit items-center justify-center bg-[rgb(255,150,0)] rounded-b-xl"
        onClick={handleIconClick}
      >
        {iconChange ? (
          <FaSearch className="hover:animate-bounce duration-300 w-5 h-5" />
        ) : (
          <BiSolidUpArrow className="w-5 h-5" />
        )}
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="bg-[#1a409a] mt-10 mb-32 h-fit w-fit p-10 rounded-xl flex justify-center">
          {records.length == 0 ? (
            <div className=" m-10 p-10 text-white flex flex-col items-center justify-center w-fit h-full font-bold ">
              <h1 className="text-4xl">Selamat datang!{" :)"}</h1>
              <div className="pt-3 text-sm font-light flex flex-row">
                Klik icon <FaSearch className="mx-2 mt-1 w-3 h-3" /> diatas
                untuk mencari
              </div>
            </div>
          ) : (
            <div className="transition-opacity duration-300 ">
              <h1 className="text-center text-5xl font-bold text-white pb-7">
                Daftar Jurnal
              </h1>
              {keyword ? (
                <h2 className="text-white">
                  Total Jurnal ditemukan untuk {keyword} : {results.length}
                </h2>
              ) : (
                <h2 className="text-white">
                  Total Jurnal ditemukan : {results.length}
                </h2>
              )}
              <table className=" w-full max-w-full bg-white shadow-lg">
                <thead>
                  <tr>
                    <th className="px-6 text-xs py-3 bg-gray-200 text-gray-600 border-b border-gray-300 rounded">
                      No.
                    </th>
                    <th className="px-6 text-xs py-3 bg-gray-200 text-gray-600 border-b border-gray-300">
                      Judul
                    </th>
                    <th className="px-6 text-xs py-3 bg-gray-200 text-gray-600 border-b border-gray-300">
                      Jenis Koleksi
                    </th>
                    <th className="px-6 text-xs py-3 bg-gray-200 text-gray-600 border-b border-gray-300">
                      Pengarang
                    </th>
                    <th className="px-6 text-xs py-3 bg-gray-200 text-gray-600 border-b border-gray-300">
                      Fakultas
                    </th>
                    <th className="px-6 text-xs py-3 bg-gray-200 text-gray-600 border-b border-gray-300">
                      Jurusan
                    </th>
                    <th className="px-6 text-xs py-3 bg-gray-200 text-gray-600 border-b border-gray-300">
                      Tahun
                    </th>
                    <th className="px-6 text-xs py-3 bg-gray-200 text-gray-600 border-b border-gray-300">
                      Abstrak
                    </th>
                    <th className="px-6 text-xs py-3 bg-gray-200 text-gray-600 border-b border-gray-300">
                      Full tek
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((jurnal, i) => (
                    <tr key={i}>
                      <td className="px-6 text-xs py-4 whitespace-no-wrap border-b border-gray-300">
                        {i + 1 + (currentPage - 1) * showData}.
                      </td>
                      <td className="px-6 font-semibold text-xs py-4 whitespace-no-wrap border-b border-gray-300">
                        {jurnal.judul_koleksi}
                      </td>
                      <td className="px-6 text-xs py-4 whitespace-no-wrap border-b border-gray-300">
                        {jurnal.jenis}
                      </td>
                      <td className="px-6 text-xs py-4 whitespace-no-wrap border-b border-gray-300">
                        {jurnal.pengarang}
                      </td>
                      <td className="px-6 text-xs py-4 whitespace-no-wrap border-b border-gray-300">
                        {jurnal.nama_fakultas}
                      </td>
                      <td className="px-6 text-xs py-4 whitespace-no-wrap border-b border-gray-300">
                        {jurnal.nm_jur}
                      </td>
                      <td className="px-6 text-xs py-4 whitespace-no-wrap border-b border-gray-300">
                        {jurnal.tahun}
                      </td>
                      <td className="px-6 text-xs underline font-bold py-4 whitespace-no-wrap border-b border-gray-300">
                        <Link
                          href={`/api/abstrak?judul=${jurnal.judul_koleksi}&type=abstrak`}
                        >
                          Lihat
                        </Link>
                      </td>
                      <td className="px-6 text-xs underline font-bold py-4 whitespace-no-wrap border-b border-gray-300">
                        <Link
                          href={`/api/fullText?judul=${jurnal.judul_koleksi}&type=full_text`}
                        >
                          Lihat
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="py-5 w-full flex justify-center">
                <nav className="rounded-lg">
                  <ul className="flex items-center">
                    <li
                      className="cursor-pointer rounded-full hover:bg-gray-500 bg-gray-200 hover:text-gray-200 text-gray-600 px-3 py-1 mr-5 font-bold"
                      onClick={prePage}
                    >
                      <a>{"<< "}Prev</a>
                    </li>
                    {numbers.length > 10 ? (
                      <>
                        {numbers.slice(0, 5).map((n, i) => (
                          <li
                            className={`cursor-pointer px-2 py-1 ${
                              currentPage === n
                                ? "bg-[#ff9600] text-white"
                                : "hover:bg-gray-500 bg-gray-200 hover:text-gray-200 text-gray-600"
                            }`}
                            onClick={() => changePage(n)}
                            key={i}
                          >
                            <a>{n}</a>
                          </li>
                        ))}
                        <li className="px-2 py-1 cursor-pointer hover:bg-gray-500 bg-gray-200 hover:text-gray-200 text-gray-600">
                          ...
                        </li>
                        {numbers.slice(-3).map((n, i) => (
                          <li
                            className={`cursor-pointer px-2 py-1 ${
                              currentPage === n
                                ? "bg-[#ff9600] text-white"
                                : "hover:bg-gray-500 bg-gray-200 hover:text-gray-200 text-gray-600"
                            }`}
                            onClick={() => changePage(n)}
                            key={i}
                          >
                            <a>{n}</a>
                          </li>
                        ))}
                      </>
                    ) : (
                      numbers.map((n, i) => (
                        <li
                          className={`cursor-pointer px-2 py-1 w-10 text-center ${
                            currentPage === n
                              ? "bg-[#ff9600] text-white "
                              : "hover:bg-gray-500 bg-gray-200 hover:text-gray-200 text-gray-600"
                          }`}
                          onClick={() => changePage(n)}
                          key={i}
                        >
                          <a>{n}</a>
                        </li>
                      ))
                    )}
                    <li
                      className="cursor-pointer rounded-full hover:bg-gray-500 bg-gray-200 hover:text-gray-200 text-gray-600 px-2 py-1 font-bold ml-5"
                      onClick={nextPage}
                    >
                      <a>Next{" >>"}</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Index;
