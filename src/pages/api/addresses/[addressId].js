import { createRoute } from "../../api/createRoute"
import { AddressModel } from "../../database/models/model"

const handler = createRoute(async (req, res) => {
  const { addressId } = req.query
  const address = await AddressModel.findById(addressId)

  if (!address) {
    res.status(404).send({ error: "not found" })

    return
  }

  // GET /todos/[todoId] -> read resource item
  if (req.method === "GET") {
    res.send(address)

    return
  }

  // PATCH /todos/[todoId] -> update resource item
  if (req.method === "PATCH") {
    const { description, category, isDone } = req.body

    Object.assign(todo, {
      description: description || todo.description,
      category: category || todo.category,
      isDone: isDone ?? todo.isDone,
    })

    await todo.save()

    res.send(todo)

    return
  }

  // DELETE /todos/[todoId] -> delete resource item
  if (req.method === "DELETE") {
    await todo.deleteOne()

    res.send(todo)
  }
})

export default handler
