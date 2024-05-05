import AddressList from "./AddressList";

const AddressesContainer = ({ filteredAddresses, deleteAddress }) => (
  <div className="w-3/4">
    <h2 className="font-bold">Adresses</h2>
    <AddressList addresses={filteredAddresses} deleteAddress={deleteAddress} />
  </div>
);

export default AddressesContainer;
