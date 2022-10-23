import { body } from 'express-validator'

export const postCreatedValidation = [
	body('title', 'Введите заголовок поста').isLength({ min: 5 }).isString(),
	body('text', 'Введите текст статьи').isLength({ min: 10 }).isString(),
	body('tags', 'Не верный формат тэгов').optional().isString(),
	body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]
