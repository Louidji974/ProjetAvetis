const AddressForm = ({ initialValues, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ values }) => (
      <Form className="m-auto w-1/2 p-10 mt-12 shadow-md">
        <h2 className="m-auto text-center p-5">Ajouter une adresse</h2>
        <FormFields values={values} />
        <button type="submit" className="border m-auto p-2 bg-green-600 text-white rounded-lg text-center">
          Enregistrer
        </button>
      </Form>
    )}
  </Formik>
);
