import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CaseRecordCRUD() {
  const [cases, setCases] = useState([]);
  const [form, setForm] = useState({
    id: '',
    caseNumber: '',
    title: '',
    description: '',
    status: ''
  });

  const fetchCases = async () => {
    const res = await axios.get('/api/cases');
    setCases(res.data);
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await axios.put(`/api/cases/${form.id}`, form);
    } else {
      await axios.post('/api/cases', form);
    }
    setForm({ id: '', caseNumber: '', title: '', description: '', status: '' });
    fetchCases();
  };

  const handleEdit = (record) => {
    setForm(record);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/cases/${id}`);
    fetchCases();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 font-mono flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-6xl font-extrabold text-center text-white mb-12 drop-shadow-lg animate-bounce">🎉 Funky Case Manager 🎉</h1>

        <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl p-20 mb-20 space-y-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <input name="caseNumber" placeholder="📎 Case Number" value={form.caseNumber} onChange={handleChange} className="border-2 border-dashed border-indigo-400 p-8 rounded-2xl w-full text-xl focus:outline-none focus:ring-4 focus:ring-pink-300" required />
            <input name="title" placeholder="📝 Title" value={form.title} onChange={handleChange} className="border-2 border-dashed border-purple-400 p-8 rounded-2xl w-full text-xl focus:outline-none focus:ring-4 focus:ring-indigo-300" required />
            <input name="status" placeholder="🚦 Status" value={form.status} onChange={handleChange} className="border-2 border-dashed border-pink-400 p-8 rounded-2xl w-full text-xl focus:outline-none focus:ring-4 focus:ring-purple-300" required />
          </div>
          <textarea name="description" placeholder="🧾 Description" value={form.description} onChange={handleChange} className="border-2 border-dashed border-yellow-300 p-8 rounded-2xl w-full h-64 text-xl focus:outline-none focus:ring-4 focus:ring-yellow-200" required />
          <div className="text-center">
            <button type="submit" className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-20 py-6 text-3xl rounded-full font-extrabold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-xl">
              {form.id ? '🚀 Update Case' : '✨ Create Case'}
            </button>
          </div>
        </form>

        <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden">
          <table className="w-full table-auto text-lg">
            <thead className="bg-gradient-to-r from-purple-200 to-pink-200 text-purple-900">
              <tr>
                <th className="px-8 py-6 text-left">#️⃣ Case Number</th>
                <th className="px-8 py-6 text-left">📌 Title</th>
                <th className="px-8 py-6 text-left">🧾 Description</th>
                <th className="px-8 py-6 text-left">📍 Status</th>
                <th className="px-8 py-6 text-left">⚙️ Actions</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c) => (
                <tr key={c.id} className="border-t border-gray-300 hover:bg-pink-100">
                  <td className="px-8 py-6">{c.caseNumber}</td>
                  <td className="px-8 py-6">{c.title}</td>
                  <td className="px-8 py-6">{c.description}</td>
                  <td className="px-8 py-6">{c.status}</td>
                  <td className="px-8 py-6 space-x-4">
                    <button onClick={() => handleEdit(c)} className="text-indigo-700 font-bold hover:underline">Edit</button>
                    <button onClick={() => handleDelete(c.id)} className="text-red-600 font-bold hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}