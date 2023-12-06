import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

interface ProductProps {
  id: string;
  qtd: number;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productsArr } = await req.json();

  if (!productsArr || productsArr.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }

  const productIds = productsArr.map((product: ProductProps) => product.id);

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product) => {
    const productArrItem = productsArr.find(
      (item: ProductProps) => item.id === product.id
    );
    const quantity = productArrItem ? productArrItem.qtd : 1;

    if (product.stock < quantity) {
      return new NextResponse(`Not enough stock for product ${product.name}`, {
        status: 400,
      });
    }

    line_items.push({
      quantity,
      price_data: {
        currency: "BRL",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price.toNumber() * 100,
      },
    });
  });

  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productsArr.map((product: ProductProps) => ({
          product: {
            connect: {
              id: product.id,
            },
          },
          quantity: product.qtd,
        })),
      },
    },
  });

  for (const product of products) {
    const productArrItem = productsArr.find(
      (item: any) => item.id === product.id
    );
    const quantity = productArrItem ? productArrItem.qtd : 1;

    if (product.stock < quantity) {
      return new NextResponse(`Not enough stock for product ${product.name}`, {
        status: 400,
      });
    }

    await prismadb.product.update({
      where: {
        id: product.id,
      },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });
  }

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json({ url: session.url }, { headers: corsHeaders });
}
