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

export const Cart = () => {
  const { data: cart, isPending: cartIsLoading, error } = useQuery({
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
            <p className="text-sm text-muted-foreground">
              Faça login para visualizar seu carrinho
            </p>
          </div>
        )}
        
        {cart && !cartIsLoading && !error && (
          <div className="flex flex-col gap-4">
            {cart.items.length === 0 ? (
              <div className="p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Seu carrinho está vazio
                </p>
              </div>
            ) : (
              cart.items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border-b">
                  <Image
                    src={item.productVariant.imageUrl}
                    alt={item.productVariant.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.productVariant.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Cor: {item.productVariant.color}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Quantidade: {item.quantity}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

// SERVER ACTION
