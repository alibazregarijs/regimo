import { db } from "@/firebase/admin";
// get regimes of user collection

export async function GET(
  request: Request,
  props: {
    params: Promise<{ userId: string }>;
  }
) {
  const { params } = props;
  const { userId } = await params;
  const url = new URL(request.url);
  const collectionId = url.searchParams.get("collectionId");

  if (!collectionId) {
    return new Response(JSON.stringify({ error: "Missing collectionId" }), {
      status: 400,
    });
  }
  try {
    const snapshot = await db
      .collection("collections")
      .where("userId", "==", userId)
      .get();

    if (snapshot.empty) {
      console.log("No matching collections.");
      return;
    }

    let regimeIds: string[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.regimeId) {
        regimeIds.push(data.regimeId);
      }
    });
    // Fetch regime documents by ID
    const regimePromises = regimeIds.map((id) =>
      db.collection("regimes").doc(id).get()
    );

    const regimeDocs = await Promise.all(regimePromises);

    const regimes = regimeDocs
      .filter((doc) => doc.exists)
      .map((doc) => ({ id: doc.id, ...doc.data() }));

    return Response.json({ regimes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching regime data:", error);
  }
}
