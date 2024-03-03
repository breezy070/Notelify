import Note from "../models/Note.js";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

export const createNote = async (req, res, next) => {
    try {
        const { tags, ...restOfNoteData } = req.body;
        if(tags && typeof tags === 'string') {
            const tagsArray = tags.split(',').map(tag => tag.trim());
            const newNote = new Note({
                ...restOfNoteData,
                tags: tagsArray
              });
            
            await newNote.save();
          
            return next(CreateSuccess(200, "Note Created !"))
        }else{
          
            return next(CreateError(400, "Bad Request  !"))
        }
    } catch (error) {
     
        return next(CreateError(500, "Internal server error  !"))
    }
}

export const updateNote = async (req, res, next) => {
    try {
        const note = await Note.findById({_id: req.params.id})
        if (note) {
            const newData = await Note.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true}
            );
            // await newData.save();
           
            return next(CreateSuccess(200, "Note Updated !"))
        }else{
          
            return next(CreateError(400, "Note not found  !"))
        }
    } catch (error) {
        return next(CreateError(500, "Internal server error  !"))
    }
}

export const getAllNotes = async (req, res, next) => {
    try {

        const notes = await Note.find({});
        return res.status(200).send(notes);
        
        
    } catch (error) {
        return next(CreateError(500, "Internal server error  !"))
    }
}

export const getAllFavoriteNotes = async (req, res, next) => {
    try {

        const notes = await Note.find({isFavorite: true});
        const favoriteNotes = notes;
     
        return res.status(200).send(favoriteNotes);
        
        
    } catch (error) {
        return next(CreateError(500, "Internal server error  !"))
    }
}

export const getNotesByTagService =  async (req, res) => {
    const { tag } = req.query;
  
    try {
      const filteredNotes = await Note.find({ tags: tag });
      res.json(filteredNotes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }




export const getNoteById = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) {
            return next(CreateError(404, "Note not found !"))
        }else{
            return next(CreateSuccess(200, "Single Note", note))
        }
    } catch (error) {
        return next(CreateError(500, "Internal Server Error"));
    }
}



export const deleteNote = async (req, res, next) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findById({_id: noteId});
        if (note) {
            await Note.findByIdAndDelete(noteId);
            return next(CreateSuccess(200, "Note has been deleted !"))
        }else{
            return next(CreateError(400, "Note not found  !"))
        }
    } catch (error) {
        return next(CreateError(500, "Internal server error  !"))
    }
}