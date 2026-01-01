"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ChevronRight, CreditCard, Shield, Truck, Tag, Gift } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalPrice, getTotalItems } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = getTotalPrice();
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.1;
  const total = subtotal - discount + shipping + tax;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center page-transition">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-primary/60" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Looks like you haven&apos;t added anything to your cart yet. Start shopping to fill it up!
            </p>
            <Link href="/">
              <Button variant="hero" size="xl" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background page-transition">
      <div className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">Shopping Cart</span>
          </nav>

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">Shopping Cart</h1>
              <p className="text-lg text-muted-foreground">
                {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"} ready for checkout
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={clearCart} 
              className="text-destructive hover:bg-destructive/10 hover:border-destructive rounded-full"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cart
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-card rounded-2xl shadow-card p-5 lg:p-6 border border-border/50 hover:border-primary/20 transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex gap-5">
                    {/* Product Image */}
                    <Link
                      href={`/product/${item.id}`}
                      className="w-24 h-24 lg:w-32 lg:h-32 rounded-xl overflow-hidden bg-secondary flex-shrink-0 relative group"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{item.category}</p>
                          <Link
                            href={`/product/${item.id}`}
                            className="text-lg font-semibold text-foreground hover:text-primary transition-colors block truncate"
                          >
                            {item.name}
                          </Link>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-lg font-bold text-foreground">${item.price.toLocaleString()}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${item.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full flex-shrink-0"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>

                      {/* Quantity & Total */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2 p-1 bg-secondary rounded-xl">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="rounded-lg h-8 w-8 hover:bg-background"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-10 text-center font-semibold text-foreground">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="rounded-lg h-8 w-8 hover:bg-background"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <p className="text-xl font-bold text-foreground">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl shadow-card p-6 sticky top-24 border border-border/50">
                <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

                {/* Promo Code */}
                <div className="mb-6 p-4 bg-secondary/50 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Promo Code</span>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="h-10 rounded-lg bg-background"
                      disabled={promoApplied}
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleApplyPromo}
                      disabled={promoApplied || !promoCode}
                      className="rounded-lg"
                    >
                      {promoApplied ? "Applied!" : "Apply"}
                    </Button>
                  </div>
                  {promoApplied && (
                    <p className="text-xs text-green-600 mt-2">10% discount applied!</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">Try: SAVE10</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span className="font-medium text-foreground">${subtotal.toLocaleString()}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600 font-medium" : "font-medium text-foreground"}>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax (10%)</span>
                    <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-foreground">Total</span>
                      <span className="text-2xl font-bold text-foreground">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="hero"
                  size="xl"
                  className="w-full mb-4 rounded-xl"
                  onClick={() => alert("Checkout functionality would be implemented here")}
                >
                  <CreditCard className="w-5 h-5" />
                  Proceed to Checkout
                </Button>

                <Link href="/">
                  <Button variant="outline" size="lg" className="w-full rounded-xl">
                    <ArrowLeft className="w-4 h-4" />
                    Continue Shopping
                  </Button>
                </Link>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-border space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Truck className="w-4 h-4 text-primary" />
                    </div>
                    <span>Free shipping on orders over $100</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Gift className="w-4 h-4 text-accent" />
                    </div>
                    <span>Gift wrapping available at checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
