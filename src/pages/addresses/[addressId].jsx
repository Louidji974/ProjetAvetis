import axios from "axios";

export const getServerSideProps = async ({ params: { addressId } }) => {
  const { data: address } = await axios(`http://localhost:3002/api/addresses/${addressId}`);

  return {
    props: { address },
  };
};

const AddressPage = ({ address }) => (
  <>
    <h1 className="text-2xl font-semibold">
      {address.numero} {address.rue}, {address.ville}
    </h1>
    <p>Pays : {address.pays}</p>
    <p>Lieu-dit : {address.lieu_dit || "N/A"}</p>
    <p>Type de lieu : {address.type_lieu}</p>
  </>
);

export default AddressPage;