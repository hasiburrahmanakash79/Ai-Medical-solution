import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  RiArrowLeftLine,
  RiDeleteBin5Line,
  RiEditBoxLine,
} from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import CommonModal from "../../../components/Common/CommonModal";

const quotes = [
  {
    id: 1,
    author: "Albert Einstein",
    quote: "Imagination is more important than knowledge.",
    category: "Inspiration",
  },
  {
    id: 2,
    author: "Maya Angelou",
    quote:
      "You will face many defeats in life, but never let yourself be defeated.",
    category: "Motivation",
  },
  {
    id: 3,
    author: "Steve Jobs",
    quote: "Stay hungry, stay foolish.",
    category: "Innovation",
  },
  {
    id: 4,
    author: "Confucius",
    quote: "It does not matter how slowly you go as long as you do not stop.",
    category: "Perseverance",
  },
  {
    id: 5,
    author: "Helen Keller",
    quote: "Alone we can do so little; together we can do so much.",
    category: "Teamwork",
  },
];

const Quotes = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [quoteToDelete, setQuoteToDelete] = useState(null);
  const [selectedQuote, setSelectedQuote] = useState(null);

  const handleAddChallenge = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (quote) => {
    setSelectedQuote(quote);
    setIsEditModalOpen(true);
  };

  const handleUpdateQuote = () => {
    console.log("Updated Quote:", selectedQuote);
    setIsEditModalOpen(false);
    setSelectedQuote(null);
    // TODO: Update the quote in your list or via API
  };

  const handleDeleteClick = (quote) => {
    setQuoteToDelete(quote);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleted user:", quoteToDelete);
    // TODO: Remove quote from list or trigger API call here
    setIsDeleteModalOpen(false);
    setQuoteToDelete(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 mb-6">
          <button className="text-2xl cursor-pointer" onClick={() => navigate(-1)}>
            <RiArrowLeftLine />
          </button>
          <h1 className="text-2xl font-semibold">Quotes</h1>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1 bg-[#B7C8FF] hover:bg-blue-400 py-2 px-4 cursor-pointer rounded-full"
        >
          <FaPlus className="text-sm" />
          Add New
        </button>
      </div>

      <table className="min-w-full text-left rounded-xl">
        <thead>
          <tr className="text-sm  bg-[#B7C8FF]">
            <th className="p-4">Author</th>
            <th className="p-4">Quote</th>
            <th className="p-4">Category</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {quotes.map((quote) => (
            <tr key={quote?.id} className="border-t border-gray-200">
              <td className="py-3 px-4 text-left hover:text-blue-500 hover:underline">
                <Link to={`/author/${quote?._id}`}>{quote?.author}</Link>
              </td>
              <td className="py-3 px-4">{quote?.quote}</td>
              <td className="py-3 px-4">{quote?.category}</td>
              <td className="py-3 px-4 flex items-center gap-5">
                <button onClick={() => handleEdit(quote)}>
                  <RiEditBoxLine className="cursor-pointer" />
                </button>
                <button onClick={() => handleDeleteClick(quote)}>
                  <RiDeleteBin5Line className="text-red-500 hover:text-red-700 transition cursor-pointer" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CommonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Quotes"
      >
        <input
          type="text"
          placeholder="Author Name"
          className="w-full border border-blue-300 rounded-md p-2 mb-4"
        />

        <select
          name="category"
          className="w-full border border-blue-300 rounded-md p-2 mb-4"
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="sad">Sad</option>
          <option value="success">Success</option>
          <option value="motivation">Motivation</option>
          <option value="life">Life</option>
          <option value="love">Love</option>
          <option value="happiness">Happiness</option>
        </select>

        <textarea
          placeholder="Quotes"
          className="w-full border border-blue-300 rounded-md p-2"
          rows={4}
        />

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="border px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button onClick={handleAddChallenge} className="btn-primary">
            Save
          </button>
        </div>
      </CommonModal>

      <CommonModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedQuote(null);
        }}
        title="Edit Quote"
      >
        {selectedQuote && (
          <>
            <input
              type="text"
              placeholder="Author Name"
              className="w-full border border-blue-300 rounded-md p-2 mb-4"
            />
            <select
              name="category"
              className="w-full border border-blue-300 rounded-md p-2 mb-4"
              value={selectedQuote.category}
              onChange={(e) =>
                setSelectedQuote({ ...selectedQuote, category: e.target.value })
              }
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="sad">Sad</option>
              <option value="success">Success</option>
              <option value="motivation">Motivation</option>
              <option value="life">Life</option>
              <option value="love">Love</option>
              <option value="happiness">Happiness</option>
            </select>

            <textarea
              rows={4}
              className="w-full border border-blue-300 rounded-md p-2"
              placeholder="Edit quote"
              value={selectedQuote.quote}
              onChange={(e) =>
                setSelectedQuote({ ...selectedQuote, quote: e.target.value })
              }
            />

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="border px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateQuote}
                className="btn-primary"
              >
                Save
              </button>
            </div>
          </>
        )}
      </CommonModal>

      {/* ✅ Delete Confirmation Modal */}
      <CommonModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete"
      >
        {quoteToDelete && (
          <div className="space-y-4 text-center">
            <p className="text-lg">Are you sure you want to delete?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="border px-5 py-3 rounded-md"
              >
                Cancel
              </button>
              <button onClick={confirmDelete} className="btn-primary">
                Confirm
              </button>
            </div>
          </div>
        )}
      </CommonModal>
    </div>
  );
};

export default Quotes;
