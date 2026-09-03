import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    const result = user.publicMetadata?.lastResult || null;
    const createdAt = user.publicMetadata?.createdAt as string | undefined;
    const expiresInMs = 30 * 24 * 60 * 60 * 1000;
    const isExpired = createdAt
      ? Date.now() - new Date(createdAt).getTime() > expiresInMs
      : false;

    return NextResponse.json({
      profile: isExpired ? null : result,
      createdAt: createdAt || null,
      expired: isExpired,
    });
  } catch (error) {
    console.error('CRITICAL: Error in /api/profile:', error);
    return NextResponse.json({
      error: 'Failed to fetch profile',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
