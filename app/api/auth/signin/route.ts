import { NextRequest, NextResponse } from 'next/server';
import { oauthConfig } from '@/lib/oauth-config';

export async function GET(req: NextRequest) {
  const provider = process.env.OAUTH_PROVIDER || 'github';
  const config = oauthConfig[provider as keyof typeof oauthConfig];

  const params = new URLSearchParams({
    client_id: process.env.OAUTH_CLIENT_ID!,
    redirect_uri: process.env.OAUTH_REDIRECT_URI!,
    scope: config.scope,
    response_type: 'code'
  });

  const authUrl = `${config.authUrl}?${params}`;
  return NextResponse.redirect(authUrl);
}
