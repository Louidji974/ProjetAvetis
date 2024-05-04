import { Schema } from "mongoose"

export const AddressSchema = new Schema(
  {
    numero: {
      type: Number,
      required: true,
    },
    rue: {
      type: String,
      required: true,
    },
    ville: {
      type: String,
      required: true,
    },
    lieu_dit: {
      type: String,
      required: false,
    },
    pays: {
      type: String,
      required: true,
    },
    type_lieu: {
      type: String,
      required: true,
    }
  })
