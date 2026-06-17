import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiTrash2, FiEdit2, FiCheck, FiX } from "react-icons/fi";
import { useStudy } from "../context/StudyContext";
import type { Todo } from "../context/StudyContext";

export default function TodoSection() {
  const { todos, dispatch } = useStudy();
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    const todo: Todo = {
      id: crypto.randomUUID(),
      text: input.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: "ADD_TODO", payload: todo });
    setInput("");
  };

  const toggleTodo = (todo: Todo) => {
    dispatch({
      type: "UPDATE_TODO",
      payload: { ...todo, completed: !todo.completed },
    });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id: string) => {
    if (!editText.trim()) return;
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      dispatch({
        type: "UPDATE_TODO",
        payload: { ...todo, text: editText.trim() },
      });
    }
    setEditingId(null);
    setEditText("");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="mb-4 text-xl font-semibold text-white">
        Today&apos;s To-Do
      </h3>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add a new task..."
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-blue-500/50 focus:bg-white/10"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addTodo}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white"
        >
          <FiPlus size={16} />
          Add
        </motion.button>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        <AnimatePresence>
          {todos.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8 text-center text-sm text-white/40"
            >
              No tasks yet. Add one above!
            </motion.p>
          )}
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3 transition-colors hover:border-white/10 hover:bg-white/10"
            >
              <button
                onClick={() => toggleTodo(todo)}
                className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
                  todo.completed
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-white/20 text-transparent hover:border-white/40"
                }`}
              >
                <FiCheck size={12} />
              </button>

              {editingId === todo.id ? (
                <input
                  autoFocus
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit(todo.id);
                    if (e.key === "Escape") setEditingId(null);
                  }}
                  className="flex-1 rounded-lg border border-white/20 bg-white/5 px-2 py-1 text-sm text-white outline-none focus:border-blue-500"
                />
              ) : (
                <span
                  className={`flex-1 text-sm ${
                    todo.completed
                      ? "text-white/40 line-through"
                      : "text-white/90"
                  }`}
                >
                  {todo.text}
                </span>
              )}

              {editingId === todo.id ? (
                <button
                  onClick={() => saveEdit(todo.id)}
                  className="rounded-lg p-1.5 text-emerald-400 hover:bg-white/10"
                >
                  <FiCheck size={16} />
                </button>
              ) : (
                <button
                  onClick={() => startEdit(todo)}
                  className="rounded-lg p-1.5 text-white/50 opacity-0 transition-opacity hover:bg-white/10 hover:text-white group-hover:opacity-100"
                >
                  <FiEdit2 size={16} />
                </button>
              )}

              {editingId === todo.id ? (
                <button
                  onClick={() => setEditingId(null)}
                  className="rounded-lg p-1.5 text-red-400 hover:bg-white/10"
                >
                  <FiX size={16} />
                </button>
              ) : (
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="rounded-lg p-1.5 text-white/50 opacity-0 transition-opacity hover:bg-red-500/20 hover:text-red-400 group-hover:opacity-100"
                >
                  <FiTrash2 size={16} />
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
