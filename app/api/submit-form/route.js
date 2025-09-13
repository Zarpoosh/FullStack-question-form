// app/api/submit-form/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const data = await req.json();

    // داده رو توی جدول Survey ذخیره کن (اسم جدول رو از schema.prisma بگیر)
    const result = await prisma.survey.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        answers: data.answers, // چون answers یه object هست
      },
    });

    return NextResponse.json({ message: "✅ فرم ذخیره شد", result }, { status: 200 });
  } catch (error) {
    console.error("❌ Error saving form:", error);
    return NextResponse.json({ message: "خطا در ذخیره فرم" }, { status: 500 });
  }
}
