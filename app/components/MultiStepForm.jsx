"use client";
import { useState } from "react";
import Question from "./Question";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    answers: {},
  });

  // state برای نگه داشتن ارور هر فیلد
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    gender: "",
  });

  const questions = [
    "آیا معمولاً سالن یا آرایشگر جدید را از طریق معرفی دوستان یا شبکه‌های اجتماعی پیدا می‌کنید؟",
    "آیا نزدیکی آرایشگاه به محل سکونت شما برای انتخاب اهمیت دارد؟",
    "آیا تاکنون در رزرو وقت با مشکل مواجه شده‌اید؟",
    "آیا ترجیح می‌دهید به جای تماس تلفنی، نوبت خود را آنلاین رزرو کنید؟",
    "آیا در صورت امکان رزرو اینترنتی، از آن استفاده خواهید کرد؟",
    "آیا قبل از انتخاب آرایشگر، دوست دارید نمونه‌کار یا امتیاز مشتری‌های قبلی را ببینید؟",
    "آیا در انتخاب سالن یا آرایشگر به تعداد ستاره و نظرات دیگران توجه می‌کنید؟",
    "آیا حاضر هستید برای کیفیت بهتر خدمات، به سالن دورتری مراجعه کنید؟",
    "آیا خدماتی مانند ناخن، ابرو یا مو را به صورت منظم دریافت می‌کنید؟ ",
    "آیا اگر آرایشگری تجربه و مهارت بالاتری داشته باشد، حتی با قیمت بالاتر او را انتخاب می‌کنید؟",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    // پاک کردن ارور وقتی کاربر چیزی وارد کرد
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name.startsWith("q")) {
      setFormData((prev) => ({
        ...prev,
        answers: { ...prev.answers, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => {
    if (step === 1) {
      const newErrors = {
        firstName: formData.firstName ? "" : "لطفاً نام را وارد کنید",
        lastName: formData.lastName ? "" : "لطفاً نام خانوادگی را وارد کنید",
        gender: formData.gender ? "" : "لطفاً جنسیت را انتخاب کنید",
      };

      setErrors(newErrors);

      // اگر اروری وجود دارد، مرحله بعد نرو
      if (Object.values(newErrors).some((e) => e)) return;
    }

    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setSubmitted(true);
    } else {
      alert("⚠️ خطایی در ثبت فرم رخ داد.");
    }
  };

  const renderStep = () => {
    if (step === 1) {
      return (
        <div className="space-y-4">
          <h2 className="text-xl text-center font-bold text-white">مشخصات </h2>

          <div>
            <input
              type="text"
              name="firstName"
              placeholder="نام"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border p-2 rounded outline-none text-gray-400 text-right"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1 txet-right text-right">
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="lastName"
              placeholder="نام خانوادگی"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border p-2 rounded outline-none text-gray-400 text-right"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1 text-right">
                {errors.lastName}
              </p>
            )}
          </div>

          <div>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border p-2 rounded text-gray-400 text-right"
            >
              <option value="">جنسیت را انتخاب کنید</option>
              <option value="male">آقا</option>
              <option value="female">خانم</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1 text-right">
                {errors.gender}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={nextStep}
            className="bg-fuchsia-500 text-white px-4 py-2 rounded w-full"
          >
            ادامه
          </button>
        </div>
      );
    }

    if (step > 1 && step <= questions.length + 1) {
      const questionIndex = step - 2;
      const questionName = `q${questionIndex + 1}`;
      const isLastStep = step === questions.length + 1;

      return (
        <div className="space-y-4">
          <Question
            question={questions[questionIndex]}
            name={questionName}
            value={formData.answers[questionName] || ""}
            onChange={handleChange}
          />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              قبلی
            </button>
            {!isLastStep ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-fuchsia-500 text-white px-4 py-2 rounded"
              >
                بعدی
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-fuchsia-500 text-white px-4 py-2 rounded"
              >
                ثبت نهایی
              </button>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <form className="min-h-screen flex flex-col items-center p-4 justify-center bg-neutral-900 ">
      <div className="w-full max-w-md shadow-lg shadow-fuchsia-400 rounded-2xl p-6  border-fuchsia-500 border-1">
        {!submitted ? (
          renderStep()
        ) : (
          <div className="text-center py-20">
            <h2 className="text-lg md:text-2xl font-bold text-fuchsia-500 mb-4">
              ✅ فرم شما با موفقیت ثبت شد
            </h2>
            <p className="text-sm md:text-lg text-white mb-6">
              ممنون از وقت با ارزشی که گذاشتی 🔥 😉
            </p>
            <div className="">
              <p className="text-gray-400 text-xs font-thin mt-2 ">
                Developed by Minoo Zarpoosh
              </p>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default MultiStepForm;
