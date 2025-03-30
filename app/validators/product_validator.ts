import vine from '@vinejs/vine'

export const listProductValidator = vine.compile(
  vine.object({
    order: vine.enum(['asc', 'desc']).optional(),
    field: vine.enum(['id', 'name', 'price', 'destroyedAt', 'createdAt', 'updatedAt']).optional(),
    page: vine.number().positive().optional(),
    perPage: vine.number().positive().range([0, 1000]).optional(),
    id: vine.number().optional(),
    name: vine.string().optional(),
    price: vine.number().optional(),
  })
)

export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    price: vine.number(),
  })
)

export const updateProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
    price: vine.number().optional(),
  })
)
