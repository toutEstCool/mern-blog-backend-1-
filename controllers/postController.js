import PostModel from '../models/PostModel.js'

// Created Post
export const createdNewPost = async (req, res) => {
	try {
		const doc = new PostModel({
			title: req.body.title,
			text: req.body.text,
			imgUrl: req.body.imgUrl,
			tags: req.body.tags,
			user: req.userId,
		})
		const post = await doc.save()

		res.json(post)
	} catch (err) {
		console.log(`Ошибка ${err}`)
		res.status(500).json({
			message: 'К сожалению не удалось... 🥲',
		})
	}
}

// Get All Posts
export const getAllPosts = async (req, res) => {
	try {
		const posts = await PostModel.find().populate('user').exec()
		res.json(posts)
		console.log(posts)
	} catch (err) {
		console.log(`Ошибка ${err}`)
		res.status(500).json({
			message: 'К сожалению не удалось... 😌',
		})
	}
}
// Get Single Post
export const getSinglePost = async (req, res) => {
	try {
		const postId = await req.params.id

		PostModel.findByIdAndUpdate(
			{
				_id: postId,
			},
			{
				$inc: { viewsCount: 1 },
			},
			{
				returnDocument: 'after',
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					res.status(500).json({
						message: 'К сожалению не удалось... 🤬',
					})
				}

				if (!doc) {
					console.log(err)
					res.status(500).json({
						message: 'К сожалению пост не найден... 😫',
					})
				}
				res.json(doc)
			}
		)
	} catch (err) {
		console.log(`Ошибка ${err}`)
		res.status(500).json({
			message: 'К сожалению не удалось... 🥺',
		})
	}
}

// Remove Post
export const removePost = async (req, res) => {
	try {
		const postId = await req.params.id

		PostModel.findByIdAndDelete({ _id: postId }, (err, doc) => {
			if (err) {
				console.log(err)
				return res.status(500).json({
					message: 'К сожалению не удалось...🥺',
				})
			}

			if (!doc) {
				return res.status(404).json({
					message: 'К сожалению не удалось...😞',
				})
			}
			res.json({
				succes: true,
			})
		})
	} catch (err) {
		console.log(`Ошибка ${err}`)
		res.status(500).json({
			message: 'К сожалению не удалось... 🥺',
		})
	}
}

// Update Post
export const updatePost = async (req, res) => {
	try {
		const postId = await req.params.id
		await PostModel.updateOne(
			{ _id: postId },
			{
				title: req.body.title,
				text: req.body.text,
				imgUrl: req.body.imgUrl,
				tags: req.body.tags,
				user: req.userId,
			}
		)
		res.json({
			succes: true,
		})
	} catch (err) {
		console.log(`Ошибка ${err}`)
		res.status(500).json({
			message: 'Не удалось удалить пост...😤',
		})
	}
}
