import express from 'express'
import Note from '../models/Note.js'
import { createNote, deleteNote, getAllNotes,getAllFavoriteNotes, getNotesByTagService, getNoteById, updateNote } from '../controllers/note.controller.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//note: you could add middleware in these endpoints if you wanted security

//create note in DB
router.post('/createnote',createNote)

//update note
router.put('/editnote/:id', updateNote)

//get all notes
router.get('/', getAllNotes)
router.get('/favorites', getAllFavoriteNotes)

router.get('/filter', getNotesByTagService)

//get note by Id
router.get('/:id', getNoteById)

router.delete('/deletenote/:id', deleteNote)

// router.put('/updatenote/:id', updateNote)

// //update note isFavorite boolean
// router.put('/updatefavorite/:id', async (req, res) => {
//     try {
//         const noteId = req.params.id;
//         const {isFavorite} = req.body;

//         const note = await Note.findByIdAndUpdate(noteId, {isFavorite}, {new: true})

//         if (!note) {
//             return res.status(404).json({message: 'note not found'});
//         }

//         return res.json({message: 'isFavorite boolean value updated', note})
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({message: 'internal server error'})
//     }
// })

export default router;