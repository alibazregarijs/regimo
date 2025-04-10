import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/firebase/admin";

export async function GET(
  request: Request,
  props: {
    params: Promise<{ indexOfMeal: number; userId: number }>;
  }
) {
  const { params } = props;
  const { indexOfMeal, userId } = await params;

  try {
    const lastUserRegime = await db
      .collection("regimes")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();
    const regimeField = lastUserRegime.docs[0]?.data()?.regime;

    const { text: meal } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `${regimeField} give me the meal number ${indexOfMeal} please do not add anything more except the meal.`,
    });

    return Response.json({ meal }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ success: false, error: String(e) }, { status: 500 });
  }
}
