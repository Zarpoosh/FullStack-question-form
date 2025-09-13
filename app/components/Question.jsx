// components/Question.jsx
"use client";

const Question = ({ question, name, value, onChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold text-white text-right md:text-xl">{question}</h2>
      <div className="flex gap-6 justify-center text-white">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name={name}
            value="بله"
            checked={value === "بله"}
            onChange={onChange}
          />
          بله
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name={name}
            value="خیر"
            checked={value === "خیر"}
            onChange={onChange}
          />
          خیر
        </label>
      </div>
    </div>
  );
};

export default Question;
