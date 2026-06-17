import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiSearch,
  FiTrash2,
  FiEdit2,
  FiSave,
  FiX,
} from "react-icons/fi";
import { useStudy } from "../context/StudyContext";
import type { Note } from "../context/StudyContext";

export default function NotesSection() {
  const { notes, dispatch } = useStudy();
  const [query, setQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.content.toLowerCase().includes(query.toLowerCase()),
  );

  const createNote = () => {
    if (!title.trim() && !content.trim()) return;
    const note: Note = {
      id: crypto.randomUUID(),
      title: title.trim() || "Untitled Note",
      content: content.trim(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: "ADD_NOTE", payload: note });
    setTitle("");
    setContent("");
    setIsCreating(false);
  };

  const deleteNote = (id: string) => {
    dispatch({ type: "DELETE_NOTE", payload: id });
  };

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const saveEdit = (note: Note) => {
    dispatch({
      type: "UPDATE_NOTE",
      payload: {
        ...note,
        title: editTitle.trim() || "Untitled Note",
        content: editContent.trim(),
        updatedAt: new Date().toISOString(),
      },
    });
    setEditingId(null);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xl font-semibold text-white">Study Notes</h3>
        <div className="flex gap-2">
          <div className="relative flex-1 sm:flex-none">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
              size={16}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-4 text-sm text-white placeholder-white/30 outline-none focus:border-blue-500/50"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white"
          >
            <FiPlus size={16} />
            New
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden"
          >
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title"
                className="mb-3 w-full border-b border-white/10 bg-transparent pb-2 text-lg font-semibold text-white placeholder-white/30 outline-none focus:border-blue-500"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note here..."
                rows={4}
                className="mb-3 w-full resize-none rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white placeholder-white/30 outline-none focus:border-blue-500/50"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsCreating(false)}
                  className="rounded-lg px-4 py-2 text-sm text-white/60 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  onClick={createNote}
                  className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  <FiSave size={14} />
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredNotes.length === 0 && !isCreating && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-8 text-center text-sm text-white/40"
            >
              {query
                ? "No notes match your search."
                : "No notes yet. Create your first note!"}
            </motion.p>
          )}
          {filteredNotes.map((note) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group relative rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-white/20 hover:bg-white/10"
            >
              {editingId === note.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full border-b border-white/20 bg-transparent pb-2 text-lg font-semibold text-white outline-none focus:border-blue-500"
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={4}
                    className="w-full resize-none rounded-lg border border-white/10 bg-white/5 p-2 text-sm text-white outline-none focus:border-blue-500/50"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="rounded-lg p-1.5 text-white/50 hover:bg-white/10"
                    >
                      <FiX size={16} />
                    </button>
                    <button
                      onClick={() => saveEdit(note)}
                      className="rounded-lg p-1.5 text-emerald-400 hover:bg-white/10"
                    >
                      <FiSave size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-2 flex items-start justify-between">
                    <h4 className="line-clamp-1 text-lg font-semibold text-white">
                      {note.title}
                    </h4>
                    <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => startEdit(note)}
                        className="rounded-lg p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="rounded-lg p-1.5 text-white/50 hover:bg-red-500/20 hover:text-red-400"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="line-clamp-4 text-sm text-white/70">
                    {note.content}
                  </p>
                  <p className="mt-3 text-[10px] text-white/40">
                    {new Date(note.updatedAt).toLocaleString()}
                  </p>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
