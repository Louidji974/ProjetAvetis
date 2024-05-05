import axios from "axios";
import Link from "next/link";

export const getServerSideProps = async ({ params: { addressId } }) => {
  const { data: address } = await axios(`http://localhost:3002/api/addresses/${addressId}`);

  return {
    props: { address },
  };
};

const AddressPage = ({ address }) => (
  <div className="max-w-4xl mx-auto py-8">
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">
        {address.numero} {address.rue}, {address.ville}
      </h1>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Pays :</span> {address.pays}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Lieu-dit :</span> {address.lieu_dit || "N/A"}
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-semibold">Type de lieu :</span> {address.type_lieu}
      </p>

      <Link href={`/addresses/${address._id}/edition`} className="inline-block bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
        Éditer
      </Link>
    </div>
  </div>
);

export default AddressPage;
