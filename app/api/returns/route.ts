import { NextRequest, NextResponse } from "next/server";
import { API_BASE, getAuthHeader } from "@/app/lib/config";

export async function GET(req: NextRequest) {
    const orderNumber = req.nextUrl.searchParams.get("order");

    if (!orderNumber) {
        return NextResponse.json(
            { error: "Order number is required" },
            { status: 400 }
        );
    }

    try {
        const response = await fetch(
            `${API_BASE}/v1/customer_returns?s=${encodeURIComponent(orderNumber)}`,
            {
                headers: {
                    Authorization: getAuthHeader(),
                    Accept: "application/json",
                },
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to fetch return: ${response.statusText}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
