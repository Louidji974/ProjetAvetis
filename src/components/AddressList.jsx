import Link from "next/link";

const AddressList = ({ addresses, deleteAddress }) => (
  <div className="p-2">
    <div className="grid grid-cols-8 grid-flow-row p-2 text-center m-2">
      <p className="font-bold">Numéro</p>
      <p className="font-bold">Rue</p>
      <p className="font-bold">Ville</p>
      <p className="font-bold">Lieu dit</p>
      <p className="font-bold">Pays</p>
      <p className="font-bold">Type de lieu</p>

    </div>
    {addresses && addresses.length > 0 ? (
      addresses.map((address) => (
        <div key={address._id} className="grid grid-cols-8 grid-flow-row text-center border border-100-black p-2 m-2 items-center">
          <p>{address.numero}</p>
          <p>{address.rue}</p>
          <p>{address.ville}</p>
          <p>{address.lieu_dit}</p>
          <p>{address.pays}</p>
          <p>{address.type_lieu}</p>
          <Link href={`addresses/${address._id}`} className="text-sm border bg-red-500 text-white font-bold p-1 rounded-lg mr-2">
            Détails
          </Link>
          <button
            onClick={() => deleteAddress(address._id)}
            className="text-sm border bg-red-500 text-white font-bold p-1 rounded-lg"
          >
            Supprimer
          </button>
        </div>
      ))
    ) : (
      <p>Aucune adresse trouvée.</p>
    )}
  </div>
);

export default AddressList;
