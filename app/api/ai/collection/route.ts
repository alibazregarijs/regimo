import { db } from "@/firebase/admin";
import { CollectionItem } from "@/types/root";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const collectionRef = db.collection("collections");

    // Step 1: Get all docs (or limit to first 50 if too many)
    const snapshot = await collectionRef.get();
    const docs = snapshot.docs;

    if (docs.length === 0) {
      return NextResponse.json({ success: true, data: [] });
    }

    // Step 2: Shuffle and take N random items
    const randomDocs = docs
      .sort(() => 0.5 - Math.random()) // Simple shuffle
      .slice(0, 3); // Take 6 random entries

    // Step 3: Enrich each with full data
    const items: CollectionItem[] = await Promise.all(
      randomDocs.map(async (doc) => {
        const data = doc.data();

        // Fetch related user
        const userSnap = await db.collection("users").doc(data.userId).get();
        const userData = userSnap.exists ? userSnap.data() : null;

        // Fetch related regime
        const regimeSnap = await db
          .collection("regimes")
          .doc(data.regimeId)
          .get();
        const regimeData = regimeSnap.exists ? regimeSnap.data() : null;

        // Fetch like data (optional)
        const likedSnap = await db.collection("like").doc(data.likeId).get();
        const likedData = likedSnap.exists ? likedSnap.data() : null;

        const seenSnap = await db.collection("seen").doc(data.seenId).get();
        const seenData = seenSnap.exists ? seenSnap.data() : null;

        return {
          id: doc.id,
          user: {
            id: data.userId,
            name: userData?.name || "",
          },
          regime: {
            id: data.regimeId,
            regime: regimeData?.regime || "",
            type: regimeData?.type || "loss",
            userId: regimeData?.userId || "",
            createdAt: regimeData?.createdAt || "",
          },
          seen: seenData?.seen ?? 0,
          createdAt: data.createdAt ?? "",
          updatedAt: data.updatedAt ?? "",
          liked: {
            userId: likedData?.userId || "",
            like: likedData?.like ?? 0,
          },
        };
      })
    );

    return NextResponse.json({ data: items });
  } catch (e) {
    console.error("Error fetching random collections:", e);
    return NextResponse.json(
      { success: false, error: String(e) },
      { status: 500 }
    );
  }
}
