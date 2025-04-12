import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/firebase/admin";

export async function GET(
  request: Request,
  props: {
    params: Promise<{ userId: string; regimeId: string }>;
  }
) {
  const { params } = props;
  const { regimeId } = await params;

  try {
    const regimeDoc = await db.collection("regimes").doc(regimeId).get();

    if (!regimeDoc.exists) {
      return Response.json({ error: "Regime not found" }, { status: 404 });
    }
    const regimeData = regimeDoc.data();

    return Response.json({ ...regimeData, id: regimeId }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ success: false, error: String(e) }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  props: {
    params: Promise<{ userId: string; regimeId: string }>;
  }
) {
  try {
    const { params } = props;
    const { regimeId, userId } = await params;
    const body = await request.json();
    const { regime } = body;

    if (typeof regime !== "string") {
      return new Response(JSON.stringify({ error: "Invalid regime payload" }), {
        status: 400,
      });
    }

    const docRef = db.collection("regimes").doc(regimeId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return new Response(JSON.stringify({ error: "Regime not found" }), {
        status: 404,
      });
    }

    const regimeData = docSnap.data();

    if (!regimeData || regimeData.userId !== userId) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: userId does not match" }),
        { status: 403 }
      );
    }

    const { text: updatedMeal } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Update or edit a regime using this user's information, while maintaining the existing data structure. the regime : ${regime} and the user's information : ${regimeData.regime} `,
    });

    await docRef.update({ regime: updatedMeal });

    return new Response(
      JSON.stringify({
        success: true,
        regime: {
          updatedMeal,
          id: regimeId,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating regime:", error);
    return new Response(JSON.stringify({ error: "Failed to update regime" }), {
      status: 500,
    });
  }
}
