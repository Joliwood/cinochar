import Header from "@/components/header";
import Testar from "@/components/testar";

const Home = () => {
  return (
    <>
      <Header />
      <Testar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <p className="flex bg-red-700 px-5">Welcome to this application</p>
        </div>
      </main>
    </>
  );
}

export default Home;
