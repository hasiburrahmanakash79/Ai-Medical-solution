// import React from "react";

import { Link } from "react-router-dom";

const RecentQuote = () => {
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

  return (
    <div className="overflow-x-auto border h-full border-gray-200 rounded-xl p-5">
      <h2 className="text-2xl font-semibold mb-3">Recent Quote</h2>

      <table className="min-w-full text-left rounded-xl">
        <thead>
          <tr className="text-sm  bg-[#B7C8FF]">
            <th className="p-4">Author</th>
            <th className="p-4">Quote</th>
            <th className="p-4">Category</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentQuote;
