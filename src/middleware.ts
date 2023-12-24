import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  if (!process.env.APP_URL || !(process.env.APP_URL || '').startsWith('http')) {
    return NextResponse.next();
  }
  const { host } = new URL(process.env.APP_URL as string);
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;
  const hostname = req.headers.get('host');
  const currentHost = hostname?.replace(`.${host}`, '');

  if (pathname.startsWith(`/sites`)) {
    return new Response(null, { status: 404 });
  }

  if (!pathname.includes('.') && !pathname.startsWith('/api')) {
    if (hostname === host) {
      url.pathname = `${pathname}`;
    } else {
      url.pathname = `/sites/${currentHost}${pathname}`;
    }
    return NextResponse.rewrite(url);
  }
}
