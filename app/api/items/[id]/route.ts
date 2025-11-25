import { NextRequest, NextResponse } from "next/server";
import { API_BASE, getAuthHeader } from "@/app/lib/config";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: itemId } = await params;

    if (!itemId) {
        return NextResponse.json(
            { error: "Item ID is required" },
            { status: 400 }
        );
    }

    try {
        const body = await req.json();

        const response = await fetch(`${API_BASE}/v1/items/${itemId}`, {
            method: "PUT",
            headers: {
                Authorization: getAuthHeader(),
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to update item: ${response.statusText}` },
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
