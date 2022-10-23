import { postController, userControllers } from './controllers/index.js'
import checkAuth from './utils/checkAuth.js'
import { registerValidation } from './validations/auth.js'
import { loginValidation } from './validations/loginValidation.js'
import { postCreatedValidation } from './validations/postCreatedValidation.js'
import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'

const URL =
	'mongodb+srv://admin:qwerty12345@cluster0.3lxjohh.mongodb.net/?retryWrites=true&w=majority'

mongoose
	.connect(URL)
	.then(() => console.log('Server BD Connected...'))
	.catch(() => console.log('Server BD Connected Error...'))

const app = express()
app.use(express.json())
app.use('/uploads', express.static('uploads'))

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads')
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname)
	},
})

const upload = multer({ storage })

// Upload Images
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	})
})

// { User}
// Created User
app.post('/auth/register', registerValidation, userControllers.register)
// Login User
app.post('/auth/login', loginValidation, userControllers.login)
// Get Data Profile User
app.get('/auth/profile', checkAuth, userControllers.getMe)

// { Post }
// Created Post
app.post(
	'/post',
	checkAuth,
	postCreatedValidation,
	postController.createdNewPost
)
// Get All Posts
app.get('/post', postController.getAllPosts)
// Get Single Post
app.get('/post/:id', postController.getSinglePost)
// Remove Post
app.delete('/post/:id', checkAuth, postController.removePost)
// Update Post
app.patch(
	'/post/:id',
	checkAuth,
	postCreatedValidation,
	postController.updatePost
)

app.listen('4000', (err) => {
	if (err) return console.log(`Ошибка Сервера... ${err}`)
	console.log(`Сервер был успешно запущен...`)
})
