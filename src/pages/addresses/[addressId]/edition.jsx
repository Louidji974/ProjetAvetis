import axios from "axios";
import { Formik, Field, Form } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";

export const getServerSideProps = async ({ params: { addressId } }) => {
  const { data: address } = await axios(`http://localhost:3002/api/addresses/${addressId}`);

  return {
    props: { address },
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

const AddressEditPage = ({ address }) => {
  const router = useRouter();
  const initialValues = address;

  const handleSubmit = async (values) => {
    const { _id, numero, rue, ville, lieu_dit, pays, type_lieu } = values;
    await axios.patch(`/api/addresses/${_id}`, { numero, rue, ville, lieu_dit, pays, type_lieu });

    router.push(`/addresses/${_id}`);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ errors, values }) => (
          <Form className="m-auto w-1/2 p-10 mt-12 shadow-md">
            <h2 className="m-auto text-center p-5">Modifier une adresse</h2>
            <div className="flex flex-wrap grid-cols-2 gap-3">
              <Field type="number" id="numero" name="numero" className="border p-2" placeholder="Numéro" />
              <Field type="text" id="rue" name="rue" className="border p-2" placeholder="Rue" />
              <Field type="text" id="ville" name="ville" className="border p-2" placeholder="Ville" />
              <Field type="text" id="lieu_dit" name="lieu_dit" className="border p-2" placeholder="Lieu dit" />
              <Field type="text" id="pays" name="pays" className="border p-2" placeholder="Pays" />
              <Field as="select" id="type_lieu" name="type_lieu" className="border p-2 w-48" placeholder="Type de lieu">
                <option value="">Choisir une option</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Musee">Musée</option>
                <option value="Bar">Bar</option>
                <option value="Parc">Parc</option>
              </Field>
            </div>

            <button type="submit" className="bg-blue-800 text-white p-2 rounded-md mt-4">
              Enregistrer
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddressEditPage;
