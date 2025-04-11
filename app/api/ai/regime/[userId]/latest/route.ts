import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/firebase/admin";

export async function GET(
  request: Request,
  props: {
    params: Promise<{ regimeId: number; userId: number }>;
  }
) {
  const { params } = props;
  const { userId } = await params;

  try {
    const regimeQuerySnapshot = await db
      .collection("regimes")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .limit(1) // get only the latest
      .get();

    if (regimeQuerySnapshot.empty) {
      return Response.json(
        { success: false, message: "No regimes found" },
        { status: 404 }
      );
    }

    const docSnap = regimeQuerySnapshot.docs[0];
    const latestRegime = { id: docSnap.id, ...docSnap.data() };

    return Response.json([latestRegime], { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ success: false, error: String(e) }, { status: 500 });
  }
}
