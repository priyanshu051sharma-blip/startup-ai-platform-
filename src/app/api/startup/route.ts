import { STARTUP_CONTEXT } from "@/lib/startup-data";

export async function GET() {
  return Response.json({
    success: true,
    data: STARTUP_CONTEXT,
    updatedAt: new Date().toISOString(),
  });
}
