import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export const getServerSideProps = async () => {
  const { data: addresses } = await axios("http://localhost:3002/api/addresses");

  return {
    props: {
      addresses,
    },
  };
};

const toggleAddress = (address) => async () => {
  const { data: updatedAddress } = await axios.patch(`../../api/addresses/${address._id}`, {
    numero: address.numero,
    rue: address.rue,
    ville: address.ville,
    lieu_dit: address.lieu_dit,
    pays: address.pays,
    type_lieu: address.type_lieu,
  });

  // Vous pouvez ajouter ici la logique pour mettre à jour le state avec l'adresse mise à jour
};

export default function Home({ addresses }) {
  return (
    <>
      <h2 className="text-center mt-10 font-bold text-blue-900 text-3xl">POWERADDRESS MANAGER</h2>
      <div className="shadow-md m-auto w-5/6 flex p-5 mt-10">
        <div className="w-1/4">
          {/* Filtres */}
          <h2 className="font-bold">Filtres</h2>
        </div>
        <div className="w-3/4">
          <h2 className="font-bold">Adresses</h2>
          <div className="p-2">
            <div className="grid grid-cols-7 grid-flow-row p-2 text-center m-2">
              <p className="font-bold">Numéro</p>
              <p className="font-bold">Rue</p>
              <p className="font-bold">Ville</p>
              <p className="font-bold">Lieu dit</p>
              <p className="font-bold">Pays</p>
              <p className="font-bold">Type de lieu</p>
            </div>
            {addresses && addresses.length > 0 ? (
              addresses.map((address) => (
                <div key={address._id} className="grid grid-cols-7 grid-flow-row text-center border border-100-black p-2 m-2 items-center">
                  <p>{address.numero}</p>
                  <p>{address.rue}</p>
                  <p>{address.ville}</p>
                  <p>{address.lieu_dit}</p>
                  <p>{address.pays}</p>
                  <p>{address.type_lieu}</p>
                  <Link href={`/`} className="border bg-red-500 border-radius-sm text-white font-bold w-2/3 p-2 rounded-lg m-auto">
                    Edit
                  </Link>
                </div>
              ))
            ) : (
              <p>Aucune adresse trouvée.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}