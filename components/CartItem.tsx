import { CartItem as CartItemType } from '@/store/cartStore';
import { Trash2 } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QuantityControl from './QuantityControl';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (productId: string, quantity: number) => void;
    onRemove: (productId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
    item,
    onUpdateQuantity,
    onRemove,
}) => {
    const { product, quantity } = item;

    return (
        <View className='flex flex-row w-full bg-[#F6F5F8] rounded-xl p-4 mb-4 shado'>
            <Image source={{ uri: product.image }} style={styles.image} />
            <View className='flex-1'>
                <View className='flex-1'>
                    <Text className='text-sm mb-1 text-gray-800' numberOfLines={1}>{product.name}</Text>
                    <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                    <Text style={styles.stockStatus}>
                        {product.inStock ? 'In stock' : 'Out of stock'}
                    </Text>
                </View>

                <View style={styles.actionsContainer}>
                    <QuantityControl
                        quantity={quantity}
                        onIncrease={() => onUpdateQuantity(product.id, quantity + 1)}
                        onDecrease={() => onUpdateQuantity(product.id, quantity - 1)}
                        size="medium"
                    />
                    <View style={styles.removeButtonContainer}>
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => onRemove(product.id)}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Trash2 size={20} color="#999999" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 16,
        resizeMode: 'contain',
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#334155',
        marginBottom: 4,
    },
    stockStatus: {
        fontSize: 12,
        color: '#10B981',
    },
    actionsContainer: {
        justifyContent: "space-between",
        alignItems: 'center',
        display: "flex",
        flexDirection: "row",
        marginTop: 5,
        marginRight: 16
    },
    removeButtonContainer: {
        alignItems: "flex-end",
        flex: 1
    },
    removeButton: {
        padding: 9,
        backgroundColor: "white",
        borderRadius: 100,
    },
});

export default CartItem;