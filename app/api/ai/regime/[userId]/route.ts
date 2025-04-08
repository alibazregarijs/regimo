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
    const regimeQuerySnapshot = await db
      .collection("regimes")
      .where("userId", "==", userId) // use .toString() only if userId in Firestore is stored as a string
      .orderBy("createdAt", "desc")
      .get();

    if (regimeQuerySnapshot.empty) {
      return Response.json(
        { success: false, message: "No regimes found" },
        { status: 404 }
      );
    }

    const regimes = regimeQuerySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return Response.json(regimes, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ success: false, error: String(e) }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  props: {
    params: Promise<{ userId: number }>;
  }
) {
  const { params } = props;
  const { userId } = await params;
  const {
    gender,
    type,
    weight,
    height,
    age,
    activity_level,
    waist_circumference,
    bicep_circumference,
  } = await request.json();

  if (!userId) {
    return Response.json(
      { success: false, error: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const { text: regime } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `{Please create a personalized nutrition ${type} regime for a user based on the following details:

Height: ${height}

Weight: ${weight}

Gender: ${gender}

Age: ${age}

Activity Level: ${activity_level}

Waist circumference : ${waist_circumference}

Bicep circumference : ${bicep_circumference}

I would like you to provide a detailed meal plan consisting of five meals throughout the day.
For each meal, please include:

The recommended time for the meal

The foods that should be consumed

The amount of each food item

The goal is to create a well-balanced, health-optimized meal plan tailored to the user's profile (I want the text you send to be readable and easy to read. I want the spacing and everything to be visible and noticeable.).}`,
    });

    // Create a new document with auto-generated ID

    // Prepare the regime data
    const regimeData = {
      userId: userId.toString(), // Store as string if needed
      gender,
      type,
      weight,
      height,
      age: Number(age),
      activity_level,
      waist_circumference,
      bicep_circumference,
      regime,
      averageRating: 0,
      userLikedId: 0,
      createdAt: new Date().toISOString(), // Add timestamp
      updatedAt: new Date().toISOString(),
    };

    // Add the regime data to Firestore
    const docRef = await db.collection("regimes").add(regimeData);

    return Response.json({
      id: docRef.id, // Document ID
      ...regimeData, // Optional: return the data that was added
    });
  } catch (e) {
    console.log(e);
    return Response.json({ success: false, e }, { status: 500 });
  }
}
