"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import z from "zod";

import { db } from "@/db";
import { cartItemTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { removeProductFromCartSchema } from "./schema";

export const removeProductFromCart = async (
  data: z.infer<typeof removeProductFromCartSchema>,
) => {
  removeProductFromCartSchema.parse(data);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  } // verifico se usuário está logado
  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { eq }) => eq(cartItem.id, data.cartItemId),
    with: {
      cart: true,
    },
  });
  // se o carrinho não for do usuario logado não tem permissão
  const cartDoesNotBelongToUser = cartItem?.cart.userId != session.user.id;
  if (cartDoesNotBelongToUser) {
    throw new Error("Unauthorized");
  }
  if (!cartItem) {
    // Vou estar tentando deletar um produto que não esteja no carrinho
    throw new Error("Cart item not found in cart");
  } // se passar é porque existe cartItem
  await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItem.id)); //deleta
};
