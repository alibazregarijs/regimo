import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/firebase/admin";

export async function PATCH(
  request: Request,
  props: {
    params: Promise<{ regimeId: string }>;
  }
) {
  try {
    const { params } = props;
    const body = await request.json();
    const { regimeId } = await params;
    const { regimeField } = body;

    const docRef = db.collection("regimes").doc(regimeId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return new Response(JSON.stringify({ error: "Regime not found" }), {
        status: 404,
      });
    }

    await docRef.update({ regime: regimeField });

    return new Response(JSON.stringify({ success: true, regimeField }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating regime:", error);
    return new Response(JSON.stringify({ error: "Failed to update regime" }), {
      status: 500,
    });
  }
}
