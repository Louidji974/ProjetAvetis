import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState, useEffect, useRef } from "react";
import * as Yup from "yup";

const getServerSideProps = async () => {
  const { data: addresses } = await axios("http://localhost:3002/api/addresses");

  return {
    props: {
      addresses,
    },
  };
};

const validationSchema = Yup.object().shape({
  numero: Yup.number().required("Le numéro est obligatoire"),
  rue: Yup.string().required("La rue est obligatoire"),
  ville: Yup.string().required("La ville est obligatoire"),
  lieu_dit: Yup.string().required("Le lieu-dit est obligatoire"),
  pays: Yup.string().required("Le pays est obligatoire"),
  type_lieu: Yup.string().required("Le type de lieu est obligatoire"),
});

const AddressesPage = (props) => {
  const { addresses: initialAddresses } = props;
  const [addresses, setAddresses] = useState(initialAddresses);
  const submit = async (values, { resetForm }) => {
    const { numero, rue, ville, lieu_dit, pays, type_lieu } = values;
    const { data: newAddress } = await axios.post("../../api/addresses", {
      numero,
      rue,
      ville,
      lieu_dit,
      pays,
      type_lieu,
    });
    setAddresses([newAddress, ...addresses]);
    resetForm();
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

    setAddresses((currentAddresses) => {
      const updatedAddressIndex = currentAddresses.findIndex(
        ({ _id }) => _id === address._id
      );

      return currentAddresses.with(updatedAddressIndex, updatedAddress);
    });
  };

  return (
    <div>
      <h1>test</h1>
      <Formik
        initialValues={{ numero: "", rue: "", ville: "", lieu_dit: "", pays: "", type_lieu: "" }}
        onSubmit={submit}
        validationSchema={validationSchema} // Ajout de la prop validationSchema
      >
        {({ errors, touched }) => (
          <Form className="m-auto w-1/2 p-10 mt-12 shadow-md">
            <h2 className="m-auto text-center p-5">Ajouter une addresse</h2>
            <div className=" flex flex-wrap grid-cols-2 gap-3 ">
              <Field type="number" id="numero" name="numero" className="border p-2" placeholder="Numero" />
              <Field type="text" id="rue" name="rue" className="border p-2" placeholder="Rue" />
              <Field type="text" id="ville" name="ville" className="border p-2" placeholder="Ville" />
              <Field type="text" id="lieu_dit" name="lieu_dit" className="border p-2" placeholder="Lieu dit" />
              <Field type="text" id="pays" name="pays" className="border p-2" placeholder="Pays" />
              <Field as="select" id="type_lieu" name="type_lieu" className="border p-2 w-48" placeholder="Type lieu">
                <option value="maison">Maison</option>
                <option value="appartement">Appartement</option>
                <option value="autre">Autre</option>
              </Field>
            </div>
            {Object.values(errors).some((error) => error) && (
              <div className="text-red-500 mb-4">Tous les champs sont obligatoires</div>
            )}
            <button type="submit" className="border m-auto p-2 bg-green-600 text-white rounded-lg text-center">
              Nouvelle Adresse
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddressesPage;