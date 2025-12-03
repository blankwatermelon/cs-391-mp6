import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const userCookie = req.cookies.get('user');
  
  if (!userCookie) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const user = JSON.parse(userCookie.value);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid user data' },
      { status: 400 }
    );
  }
}