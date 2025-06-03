import BackNav from '@/components/BackNav';
import CartItem from '@/components/CartItem';
import Header from '@/components/Header';
import { useCartStore } from '@/store/cartStore';
import { ShoppingBag } from 'lucide-react-native';
import React from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    FadeIn,
    FadeOut,
    Layout,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';

export default function CartScreen() {
    const { items, updateQuantity, removeFromCart, getCartTotal } = useCartStore();
    const shippingCost = 10;
    const buttonScale = useSharedValue(1);

    const handleCheckout = () => {
        buttonScale.value = withTiming(0.95, { duration: 100 }, () => {
            buttonScale.value = withTiming(1, { duration: 100 });
        });

        Alert.alert(
            'Checkout',
            'This would normally proceed to payment processing.',
            [{ text: 'OK' }]
        );
    };

    const animatedButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: buttonScale.value }],
        };
    });

    const subtotal = getCartTotal();
    const total = subtotal + shippingCost;

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View style={styles.container}>
                <Header />
                <BackNav text='Your Cart' />

                {items.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <ShoppingBag size={64} color="#ccc" />
                        <Text style={styles.emptyText}>Your cart is empty</Text>
                        <Text style={styles.emptySubtext}>Browse our products and add items to your cart</Text>
                    </View>
                ) : (
                    <>
                        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                            {items.map((item) => (
                                <Animated.View
                                    key={item.product.id}
                                    layout={Layout.springify()}
                                    entering={FadeIn}
                                    exiting={FadeOut}
                                >
                                    <CartItem
                                        item={item}
                                        onUpdateQuantity={updateQuantity}
                                        onRemove={removeFromCart}
                                    />
                                </Animated.View>
                            ))}

                            <View style={styles.orderSummaryContainer}>
                                <Text style={styles.orderInfoTitle}>Order Info</Text>

                                <View style={styles.orderRow}>
                                    <Text style={styles.orderLabel}>Subtotal</Text>
                                    <Text style={styles.orderValue}>${subtotal.toFixed(2)}</Text>
                                </View>

                                <View style={styles.orderRow}>
                                    <Text style={styles.orderLabel}>Shipping</Text>
                                    <Text style={styles.orderValue}>${shippingCost.toFixed(2)}</Text>
                                </View>

                                <View style={[styles.orderRow, styles.totalRow]}>
                                    <Text style={styles.totalLabel}>Total</Text>
                                    <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                                </View>
                            </View>
                        </ScrollView>

                        <View style={styles.bottomContainer}>
                            <Animated.View style={[styles.checkoutButtonContainer, animatedButtonStyle]}>
                                <TouchableOpacity
                                    style={styles.checkoutButton}
                                    onPress={handleCheckout}
                                    activeOpacity={0.9}
                                >
                                    <Text style={styles.checkoutText}>Checkout (${total.toFixed(2)})</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginTop: 16,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#777',
        marginTop: 8,
        textAlign: 'center',
    },
    orderSummaryContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginVertical: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    orderInfoTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
        color: '#333',
    },
    orderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    orderLabel: {
        fontSize: 14,
        color: '#666',
    },
    orderValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        marginTop: 8,
        paddingTop: 16,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000000',
    },
    bottomContainer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    checkoutButtonContainer: {
        width: '100%',
    },
    checkoutButton: {
        backgroundColor: '#60B5FF',
        borderRadius: 8,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkoutText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});