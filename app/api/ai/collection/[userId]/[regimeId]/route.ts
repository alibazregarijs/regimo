import { db } from "@/firebase/admin";
import { CollectionItem } from "@/types/root";

export async function POST(
  request: Request,
  props: {
    params: Promise<{ userId: string; regimeId: string }>;
  }
) {
  const { params } = props;
  const { userId, regimeId } = await params;

  try {
    const regimeDoc = await db.collection("regimes").doc(regimeId).get();
    const regimeData = regimeDoc.data();
    if (!regimeDoc.exists || !regimeData) {
      return Response.json({ error: "Regime not found" }, { status: 404 });
    }

    const userDoc = await db.collection("users").doc(userId).get();
    const userData = userDoc.data();

    if (!userDoc.exists || !userData) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const likeref = await db.collection("like").add({
      userId: userId,
      like: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const seenRef = await db.collection("seen").add({
      userId: userId,
      seen: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const isRegimAlreadyInCollection = await db
      .collection("collections")
      .where("userId", "==", userId)
      .where("regimeId", "==", regimeId)
      .get();

    if (isRegimAlreadyInCollection.docs.length > 0) {
      return Response.json(
        { success: false, error: "Regime already in collection" },
        {
          status: 400,
        }
      );
    }

    const docRef = await db.collection("collections").add({
      userId: userId,
      regimeId: regimeId,
      seenId: seenRef.id,
      likeId: likeref.id,
      username: userData.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const collection: CollectionItem = {
      id: docRef.id,
      user: {
        id: userId,
        name: userData.name,
      },
      regime: {
        id: regimeId,
        regime: regimeData.regime,
        type: regimeData.type,
        userId: regimeData.userId,
        createdAt: regimeData.createdAt,
      },
      seen: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      liked: {
        userId: "",
        like: 0,
      },
    };

    return Response.json({ collection }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ success: false, error: String(e) }, { status: 500 });
  }
}

