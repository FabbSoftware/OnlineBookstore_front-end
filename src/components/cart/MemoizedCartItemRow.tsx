import React from 'react';
import { CartItemRow, CartItemRowProps } from './CartItemRow';

export const MemoizedCartItemRow: React.FC<CartItemRowProps> = React.memo(
  CartItemRow,
  (prevProps, nextProps) => {
    return (
      prevProps.item.id === nextProps.item.id &&
      prevProps.item.quantity === nextProps.item.quantity &&
      prevProps.item.subtotal === nextProps.item.subtotal &&
      prevProps.item.bookPrice === nextProps.item.bookPrice &&
      prevProps.disabled === nextProps.disabled &&
      prevProps.onUpdateQuantity === nextProps.onUpdateQuantity &&
      prevProps.onRemove === nextProps.onRemove
    );
  }
);

MemoizedCartItemRow.displayName = 'MemoizedCartItemRow';
