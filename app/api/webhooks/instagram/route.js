import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const MY_VERIFY_TOKEN = 'rbx_AnQhGaf67U0cryuMWKmSqMrw';

  if (mode === 'subscribe' && token === MY_VERIFY_TOKEN) {
    return new NextResponse(challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  return new NextResponse('Forbidden', { status: 403 });
}
