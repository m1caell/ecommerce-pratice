import { NextRequest, NextResponse } from "next/server";
import { parse, serialize } from "cookie";
import { generateCart } from "./services/generate-cart/generate-cart";

export async function middleware(request: NextRequest) {
  const cookies = parse(request.headers.get("cookie") || "");

  if (!cookies.cartId) {
    const generatedCart = await generateCart();

    const response = NextResponse.next();
    response.headers.set(
      "Set-Cookie",
      serialize("cartId", generatedCart.id.toString(), {
        path: "/",
        httpOnly: false,
        maxAge: 60 * 60 * 24,
      })
    );
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
