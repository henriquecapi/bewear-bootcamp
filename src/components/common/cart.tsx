"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingBasketIcon } from "lucide-react";
import Image from "next/image";

import { getCart } from "@/actions/get-cart";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { CartItem } from "./cart-item";

export const Cart = () => {
  const {
    data: cart,
    isPending: cartIsLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
    retry: false,
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>

        {cartIsLoading && (
          <div className="p-4 text-center">
            <p>Carregando...</p>
          </div>
        )}

        {error && (
          <div className="p-4 text-center">
            <p className="text-muted-foreground text-sm">
              Faça login para visualizar seu carrinho
            </p>
          </div>
        )}

        {cart && !cartIsLoading && !error && (
          <div className="flex flex-col gap-4 space-y-4 px-5">
            {cart.items.length === 0 ? (
              <div className="p-4 text-center">
                <p className="text-muted-foreground text-sm">
                  Seu carrinho está vazio
                </p>
              </div>
            ) : (
              cart.items.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  productName={item.productVariant.product.name}
                  productVariantName={item.productVariant.name}
                  productVariantImageUrl={item.productVariant.imageUrl}
                  productVariantPriceInCents={item.productVariant.priceInCents}
                  quantity={item.quantity}
                />
              ))
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

// SERVER ACTION
