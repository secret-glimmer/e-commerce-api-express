import { Router } from 'express';
import statuses from 'http-status';

// Repositories
import { CategoryRepository } from '@repositories';

// Middlewares
import { authMiddleware } from '@middlewares';

// Schemas
import {
	createCategorySchema,
	getCategoriesSchema,
	getCategorySchema,
	updateCategorySchema,
	deleteCategorySchema,
} from '@schemas';

// Utils
import { zParse } from '@utils';

/** Responsável por gerenciar as marcas dos produtos */
const CategoryController = Router();

CategoryController.get('/', async (req, res, next) => {
	try {
		const { query } = await zParse(getCategoriesSchema, req);

		const carts = await CategoryRepository.getCategories(query);

		return res.status(statuses.OK).send(carts);
	} catch (error) {
		next(error);
	}
});

CategoryController.get('/:id', async (req, res, next) => {
	try {
		const {
			params: { id },
		} = await zParse(getCategorySchema, req);

		const cart = await CategoryRepository.getCategory(id);

		return res.status(statuses.OK).send(cart);
	} catch (error) {
		next(error);
	}
});

CategoryController.post('/', authMiddleware, async (req, res, next) => {
	try {
		const { body: data } = await zParse(createCategorySchema, req);

		const response = await CategoryRepository.createCategory(data);

		return res.status(statuses.CREATED).send(response);
	} catch (error) {
		next(error);
	}
});

CategoryController.put('/:id', authMiddleware, async (req, res, next) => {
	try {
		const {
			params: { id },
			body: data,
		} = await zParse(updateCategorySchema, req);

		const response = await CategoryRepository.updateCategory(id, data);

		return res.status(statuses.OK).send(response);
	} catch (error) {
		next(error);
	}
});

CategoryController.delete('/:id', authMiddleware, async (req, res, next) => {
	try {
		const {
			params: { id },
		} = await zParse(deleteCategorySchema, req);

		await CategoryRepository.deleteCategory(id);

		return res.sendStatus(statuses.NO_CONTENT);
	} catch (error) {
		next(error);
	}
});

export { CategoryController };
