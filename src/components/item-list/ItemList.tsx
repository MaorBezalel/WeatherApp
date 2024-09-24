import { ReactNode, CSSProperties } from 'react';

interface ItemListProps<TItem> {
    className?: string;
    styles?: CSSProperties;
    items: TItem[];
    renderItem: (item: TItem, index: number) => ReactNode;
}

export function ItemList<TItem>({ className, styles, items, renderItem }: ItemListProps<TItem>) {
    return (
        <div
            className={className}
            style={styles}
        >
            {items.map(renderItem)}
        </div>
    );
}
