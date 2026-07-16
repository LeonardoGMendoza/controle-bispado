import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new NextResponse('URL is required', { status: 400 });
  }

  try {
    const targetUrl = new URL(url);
    const apiKey = targetUrl.searchParams.get('X-Api-Key');
    
    const headers = new Headers();
    if (apiKey) {
      headers.set('X-Api-Key', apiKey);
    }

    const response = await fetch(targetUrl.toString(), {
      headers
    });

    if (!response.ok) {
      return new NextResponse(`Error fetching image: ${response.statusText}`, { status: response.status });
    }

    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  } catch (error) {
    console.error('Error proxying image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
