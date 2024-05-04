import { AddressSchema } from "../../db/schemas/schema"
import mongoose from "mongoose"

export const AddressModel =
  mongoose.models.Address || mongoose.model("Address", AddressSchema)
