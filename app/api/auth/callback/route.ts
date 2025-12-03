import { NextRequest, NextResponse } from 'next/server';
import { oauthConfig } from '@/lib/oauth-config';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const error = req.nextUrl.searchParams.get('error');
  
  // Handle OAuth errors
  if (error) {
    return NextResponse.redirect(new URL(`/?error=${error}`, req.url));
  }
  
  if (!code) {
    return NextResponse.redirect(new URL('/?error=no_code', req.url));
  }

  const provider = process.env.OAUTH_PROVIDER || 'github';
  const config = oauthConfig[provider as keyof typeof oauthConfig];

  try {
    // Exchange code for access token
    const tokenResponse = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        code,
        redirect_uri: process.env.OAUTH_REDIRECT_URI,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error("Token exchange failed:", errorData);
      return NextResponse.redirect(
        new URL("/?error=token_exchange_failed", req.url)
      );
    }

    const tokenData = await tokenResponse.json();
    const access_token = tokenData.access_token || tokenData.accessToken;

    if (!access_token) {
      console.error("No access token in response:", tokenData);
      return NextResponse.redirect(new URL("/?error=no_access_token", req.url));
    }

    // Fetch user info
    const userResponse = await fetch(config.userUrl, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!userResponse.ok) {
      const errorData = await userResponse.text();
      console.error("User fetch failed:", errorData);
      return NextResponse.redirect(
        new URL("/?error=user_fetch_failed", req.url)
      );
    }

    const user = await userResponse.json();

    const safeUser = {
      id: user.id,
      login: user.login,
      name: user.name,
      email: user.email,
      avatar_url: user.avatar_url,
    };

    // Set cookie and redirect (no URL params!)
    const res = NextResponse.redirect(new URL("/profile", req.url));
    res.cookies.set("user", JSON.stringify(safeUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return res;
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(new URL('/?error=callback_error', req.url));
  }
}