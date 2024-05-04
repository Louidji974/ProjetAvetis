import { createRoute } from "../../api/createRoute"
import { AddressModel } from "../../db/models/model"

const handler = createRoute(async (req, res) => {
  if (req.method === "GET") {
    const addresses = await AddressModel.find({});
    res.send(addresses);
    return;
  }


  if (req.method === "POST") {



    const { numero, rue, ville, lieu_dit, pays, type_lieu } = req.body
    const newAddress = new AddressModel({
      numero,
      rue,
      ville,
      lieu_dit,
      pays,
      type_lieu,
    })
    if (!numero || !rue || !ville || !lieu_dit || !pays || !type_lieu) {
      return res.status(400).json({ error: "Tous les champs sont obligatoires" });

    }

    await newAddress.save()

    res.send(newAddress)
  }
})

export default handler
