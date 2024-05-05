import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import Filters from "../components/Filters";
import Router from "next/router";

export const getServerSideProps = async () => {
  const { data: addresses } = await axios("http://localhost:3002/api/addresses");

  const uniqueLocationTypes = [...new Set(addresses.map((address) => address.type_lieu))];

  return {
    props: {
      addresses,
      uniqueLocationTypes,
    },
  };
};

const deleteAddress = async (addressId) => {
  try {
    await axios.delete(`../../api/addresses/${addressId}`);
    Router.reload();
  } catch (error) {
    console.error("Erreur lors de la suppression de l'adresse :", error);
  }
};

export default function Home({ addresses, uniqueLocationTypes }) {
  const [filteredAddresses, setFilteredAddresses] = useState(addresses);

  const handleLocationTypeFilterChange = (selectedLocationType) => {
    if (selectedLocationType === "") {
      setFilteredAddresses(addresses);
    } else {
      const filteredAddresses = addresses.filter((address) => address.type_lieu === selectedLocationType);
      setFilteredAddresses(filteredAddresses);
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen text-white">
      <h2 className="text-center mt-10 font-bold text-2xl">POWERADDRESS MANAGER</h2>
      <div className="shadow-md m-auto w-5/6 flex p-5 mt-10 bg-white text-black rounded-lg">
        <Filters
          uniqueLocationTypes={uniqueLocationTypes}
          handleLocationTypeFilterChange={handleLocationTypeFilterChange}
        />
        <div className="w-3/4">
          <h2 className="font-bold">Adresses</h2>
          <div className="p-2">
            <div className="grid grid-cols-8 grid-flow-row p-2 text-center m-2">
              <p className="font-bold">Numéro</p>
              <p className="font-bold">Rue</p>
              <p className="font-bold">Ville</p>
              <p className="font-bold">Lieu dit</p>
              <p className="font-bold">Pays</p>
              <p className="font-bold">Type de lieu</p>
              <p className="font-bold">Editer</p>
              <p className="font-bold">Supprimer</p>
            </div>
            {filteredAddresses && filteredAddresses.length > 0 ? (
              filteredAddresses.map((address) => (
                <div key={address._id} className="grid grid-cols-8 grid-flow-row text-center border border-gray-300 p-2 m-2 items-center">
                  <p>{address.numero}</p>
                  <p>{address.rue}</p>
                  <p>{address.ville}</p>
                  <p>{address.lieu_dit}</p>
                  <p>{address.pays}</p>
                  <p>{address.type_lieu}</p>
                  <Link href={`addresses/${address._id}`} className="text-sm border bg-blue-800 text-white font-bold p-1 rounded-lg mr-2">
                    Détails
                  </Link>
                  <button
                    onClick={() => deleteAddress(address._id)}
                    className="text-sm border bg-blue-800 text-white font-bold p-1 rounded-lg"
                  >
                    Supprimer
                  </button>
                </div>
              ))
            ) : (
              <p>Aucune adresse trouvée.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
