import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function GET(
  request: Request,
  props: {
    params: Promise<{ userId: number }>;
  }
) {
  const { params } = props;
  const { userId } = await params;
  return Response.json({ success: true, data: "Route GET" }, { status: 200 });
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
    weight,
    height,
    age,
    activity_level,
    exercise_level,
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
      prompt: `{Please create a personalized nutrition regime for a user based on the following details:

Height: ${height}

Weight: ${weight}

Gender: ${gender}

Age: ${age}

Activity Level: ${activity_level}

Exercise Level: ${exercise_level}

Waist circumference : ${waist_circumference}

Bicep circumference : ${bicep_circumference}

I would like you to provide a detailed meal plan consisting of five meals throughout the day.
For each meal, please include:

The recommended time for the meal

The foods that should be consumed

The amount of each food item

The goal is to create a well-balanced, health-optimized meal plan tailored to the user's profile.}`,
    });

    return Response.json({ success: true, data: regime }, { status: 200 });
  } catch (e) {
    return Response.json({ success: false, e }, { status: 500 });
  }

  return Response.json({ success: true, data: "Route GET" }, { status: 200 });
}
