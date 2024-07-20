import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body);
    const { items, email, paymentSecretKey } = body;

    console.log("Payment Secret Key: ", paymentSecretKey);
    const formattedItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: items.title,
          },
          unit_amount: Math.floor(items?.price * 83),
        },
        quantity: 1,
      },
    ];

    // stripe payment gatway
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["IN", "US", "CA", "GB"],
      },
      line_items: formattedItems,
      mode: "payment",
      success_url: `${process.env.HOSTURL}/dashboard/success?session_id=${paymentSecretKey}`,
      cancel_url: `${process.env.HOSTURL}/dashboard`,
      metadata: {
        customer_email: email,
      },
    });

    return NextResponse.json({
      id: session.id,
      message: "data is comming success",
    });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
