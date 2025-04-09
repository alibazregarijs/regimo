import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/firebase/admin";

export async function GET(
  request: Request,
  props: {
    params: Promise<{ userId: number }>;
  }
) {
  const { params } = props;
  const { userId } = await params;

  try {
    const lastUserRegime = await db
      .collection("regimes")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();
    const regimeField = lastUserRegime.docs[0]?.data()?.regime;

    const { text: mealsTime } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `{${regimeField} please read above text and extract start time and end time of meal as i could have includes function on it , you should just give me an string type }`,
    });

    return Response.json({ mealsTime }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ success: false, error: String(e) }, { status: 500 });
  }
}
