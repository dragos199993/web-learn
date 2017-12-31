import express from 'express';
import authenticate from '../middlewares/authenticate';

const router = express.Router();
router.use(authenticate);
router.get('/search', (req, res) => {
res.json({
    questions: [
        {
            questionId: 1,
            title: 'How are you?',
            author: 'Dragos Nedelcu',
            dificulty: 'easy'
        },
        {
            questionId: 2,
            title: 'How old are you?',
            author: 'Madalina Chituta',
            dificulty: 'medium'
        },
        {
            questionId: 3,
            title: 'What is your favourite food?',
            author: 'Dragos Nedelcu',
            dificulty: 'hard'
        }
    ]
})
});

export default router;