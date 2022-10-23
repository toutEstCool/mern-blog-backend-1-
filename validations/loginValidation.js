import { body } from 'express-validator'

export const loginValidation = [
	body('email', 'Неверный формат почты...🧐').isEmail(),
	body('password', 'Пароль должен быть не менее 5 символов...').isLength({
		min: 6,
	}),
]
