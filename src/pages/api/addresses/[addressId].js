import { createRoute } from "/Users/louidji/Desktop/Projet5/addresslist/src/api/createRoute.js"
import { AddressModel } from "/Users/louidji/Desktop/Projet5/addresslist/src/db/models/model"

const handler = createRoute(async (req, res) => {
  const { addressId } = req.query;
  const address = await AddressModel.findById(addressId);

  if (!address) {
    res.status(404).send({ error: "Adresse non trouvée" });
    return;
  }

  // GET /addresses/[addressId] -> lire une adresse
  if (req.method === "GET") {
    res.send(address);
    return;
  }

  // PATCH /addresses/[addressId] -> mettre à jour une adresse
  if (req.method === "PATCH") {
    const { numero, rue, ville, lieu_dit, pays, type_lieu } = req.body;

    Object.assign(address, {
      numero: numero || address.numero,
      rue: rue || address.rue,
      ville: ville || address.ville,
      lieu_dit: lieu_dit || address.lieu_dit,
      pays: pays || address.pays,
      type_lieu: type_lieu || address.type_lieu,
    });

    await address.save();

    res.send(address);
    return;
  }

  // DELETE /addresses/[addressId] -> supprimer une adresse
  if (req.method === "DELETE") {
    await address.deleteOne();
    res.send(address);
  }
});

export default handler;
