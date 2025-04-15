import { db } from "@/firebase/admin";

// Showing specific user collection when user navigates to it.

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
    const docRef = db.collection("collections").doc(collectionId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return new Response(JSON.stringify({ error: "Collection not found" }), {
        status: 404,
      });
    }

    const data = docSnap.data();
    
    if (!data) {
      return new Response(JSON.stringify({ error: "Invalid collection data" }), {
        status: 404,
      });
    }

    if (data.userId !== userId) {
      return new Response(
        JSON.stringify({ error: "Unauthorized or not found" }),
        { status: 403 }
      );
    }

    return new Response(JSON.stringify({ id: docSnap.id, ...data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching collection:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
