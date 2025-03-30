import Product from '#models/product'
import {
  createProductValidator,
  listProductValidator,
  updateProductValidator,
} from '#validators/product_validator'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class ProductsController {
  public async index(ctx: HttpContext) {
    const { page, perPage, field, order, ...params } =
      await ctx.request.validateUsing(listProductValidator)

    try {
      const data = await Product.query()
        .orderBy(field || 'name', order || 'asc')
        .paginate(Number(page) || 1, Number(perPage) || 10)

      return data
    } catch (e) {
      console.log(e)
      return ctx.response.status(400).send({ error: 'Failed to list products!' })
    }
  }

  public async store(ctx: HttpContext) {
    const data = await ctx.request.validateUsing(createProductValidator)

    try {
      const product = await Product.create(data)

      return product
    } catch (e) {
      return ctx.response.status(400).send({ error: 'Failed to create product' })
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const { id } = params

      const product = await Product.findOrFail(id)

      await product
        .merge({
          destroyedAt: DateTime.now(),
        })
        .save()

      return product
    } catch (e) {
      console.log(e)
      return response.status(400).send({ error: 'Failed to delete product' })
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const { id } = params

      const product = await Product.findOrFail(id)

      return product
    } catch (e) {
      console.log(e)
      return response.status(400).send({ error: 'Failed to get product' })
    }
  }

  public async update(ctx: HttpContext) {
    const data = await ctx.request.validateUsing(updateProductValidator)

    try {
      const { id } = ctx.params

      const product = await Product.findOrFail(id)
      await product.merge(data).save()

      return product
    } catch (e) {
      console.log(e)
      return ctx.response.status(400).send({ error: 'Failed to update product' })
    }
  }
}
