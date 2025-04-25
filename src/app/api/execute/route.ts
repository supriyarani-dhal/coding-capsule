// app/api/execute/route.ts
import { languageMap } from "@/utils/Language";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code, language } = await req.json();

    const languageId = languageMap[language];
    //console.log(languageId);
    console.log(language);
    
    
    if (!languageId) {
      return NextResponse.json(
        { error: "Unsupported language" },
        { status: 400 }
      );
    }

    const submissionRes = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
        },
        body: JSON.stringify({
          source_code: code,
          language_id: languageId,
        }),
      }
    );

    const submissionData = await submissionRes.json();

    return NextResponse.json({
      output: submissionData.stdout || submissionData.stderr || "No output",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", details: error },
      { status: 500 }
    );
  }
}
