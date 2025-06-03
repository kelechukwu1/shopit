import { Product } from '@/store/productStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const router = useRouter();
    const scale = useSharedValue(1);

    const handlePress = () => {
        scale.value = withSpring(0.95, {}, () => {
            scale.value = withSpring(1);
        });
        router.push(`/product/${product.id}`);
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
                <Image source={{ uri: product.image }} className='w-full aspect-square object-contain bg-gray-50' />

                <View style={styles.info}>
                    <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
                    <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        margin: 8,
        width: '46%',
        overflow: 'hidden',
    },
    info: {
        padding: 12,
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
    },
    favoriteButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: 'white',
        borderRadius: 20,
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
});

export default ProductCard;