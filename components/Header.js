import NavHeader from "./NavHeader";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Header = () => {
  const handle = async () =>{
    await signOut({
      callbackUrl: "/auth/login",
    });
  }
  const { data: session } = useSession();
  return (
    <nav className="bg-[#10409a] text-white p-4 w-full">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex flex-row items-center">
            <div className="pr-3">
              <img
                className=" w-16 h-16"
                src="https://elearning2.unp.ac.id/pluginfile.php/1/theme_adaptable/logo/1685924761/logo%20UNP%20%281%29.png"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Sistem Informasi Katalog</h1>
              <h1 className="text-lg text-[#ff9600]">
                Universitas Negeri Padang
              </h1>
            </div>
          </div>
          {session ? (
            <div className="flex flex-row py-2 px-3 font-light">
              <h1 className="font-light text-xl text-gray-400 pr-5"><span className="font-bold text-white">{session.user.name}</span></h1>{"  "}|{"  "}
              <h1 onClick={handle} className="font-light text-xl text-gray-400 cursor-pointer ml-5 px-3 rounded-xl hover:font-semibold hover:duration-300 duration-300 transition-all hover:transition-all hover:scale-110 hover:bg-[#223860] hover:text-white">
                Keluar
              </h1>
            </div>
          ) : (
            <div>
              <NavHeader />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Header;
