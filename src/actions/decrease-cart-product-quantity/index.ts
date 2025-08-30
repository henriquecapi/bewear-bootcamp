"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import z from "zod";

import { db } from "@/db";
import { cartItemTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { decreaseCartProductQuantitySchema } from "./schema";

export const decreaseCartProductQuantity = async (
  data: z.infer<typeof decreaseCartProductQuantitySchema>,
) => {
  decreaseCartProductQuantitySchema.parse(data);
  // usuario ta autenticado
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  } // verifico se usuário está logado
  // Esse item dentro do carrinho ele existe?
  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { eq }) => eq(cartItem.id, data.cartItemId),
    with: {
      cart: true,
    },
  }); // se o carrinho não for do usuario logado não tem permissão
  if (!cartItem) {
    throw new Error("Cart item not found in cart");
  }
  const cartDoesNotBelongToUser = cartItem.cart.userId !== session.user.id;
  if (cartDoesNotBelongToUser) {
    throw new Error("Unauthorized");
  } // Esse carrinho pertence ao usuario logado?

  if (cartItem.quantity == 1) {
    await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItem.id)); //deleta
    return;
  }
  await db
    .update(cartItemTable)
    .set({
      quantity: cartItem.quantity - 1,
    })
    .where(eq(cartItemTable.id, cartItem.id));
};
