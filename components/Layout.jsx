import Head from "next/head";
export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/pns-regular.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/pns-bold.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
        <nav className="bg-coral py-4 px-12">
          <div className="max-w-container mx-auto flex items-center">
          <img className="h-[40px] w-[25px]" src="/headerlogo.svg"/>
          <img className="h=[40px] w-[104px] ml-[15px]"src="/whiteq.svg"/>
          <h2 className="text-white text-2xl ml-10"> 🧪🥼 Creativity Lab 🧪🥼</h2>
    </div>
        </nav>

      <body className="min-h-screen bg-bonegray">{children}</body>
    </>
  );
}
