import Link from "next/link"

export default function Header() {
  return (
    <>

      <header className="m-auto shadow-sm bg-black-500 ">
        <div className="w-1/2 flex justify-between m-auto h-16">
          <div>
            <Link href="/"><img src="../../img/logo.png" alt="Logo PowerAdress" className="h-16" /></Link>
          </div>
          <div className="h-16  flex">
            <p className="p-5"><Link href="/" >Liste</Link></p>
            <p className="p-5"><Link href="/ajout" className="p-2 rounded-md bg-blue-900 hover:bg-indigo-800 text-white transition">New</Link></p>
          </div>
        </div>
      </header>

    </>
  )
}