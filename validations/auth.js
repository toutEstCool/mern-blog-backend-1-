import { body } from 'express-validator'

export const registerValidation = [
	body('email', 'Неверный формат почты...😞').isEmail(),
	body('password', 'Пароль должен быть не менее 5 символов...☹️').isLength({
		min: 6,
	}),
	body('fullName', 'Укажите имя...').isLength({ min: 3 }),
	body('avatarUrl', 'К сожалению, мы нечего не нашли... 😗').optional().isURL(),
]
