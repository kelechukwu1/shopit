import BackNav from '@/components/BackNav';
import Header from '@/components/Header';
import { useCartStore } from '@/store/cartStore';
import { useFavoriteStore } from '@/store/favoriteStore';
import { useProductStore } from '@/store/productStore';
import { useLocalSearchParams } from 'expo-router';
import { Heart } from 'lucide-react-native';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

export default function ProductDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const product = useProductStore(state => state.getProduct(id || ''));
    const { addToCart } = useCartStore();
    const { isFavorite, addToFavorites, removeFromFavorites } = useFavoriteStore();

    const buttonScale = useSharedValue(1);
    const heartScale = useSharedValue(1);

    const animatedButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: buttonScale.value }],
        };
    });

    const animatedHeartStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: heartScale.value }],
        };
    });

    if (!product) {
        return (
            <View style={styles.container}>
                <Header />
                <BackNav text='Go back' />
                <View style={styles.notFound}>
                    <Text style={styles.notFoundText}>Product not found</Text>
                </View>
            </View>
        );
    }

    const isFav = isFavorite(product.id);

    const handleAddToCart = () => {
        buttonScale.value = withSequence(
            withTiming(0.95, { duration: 100, easing: Easing.inOut(Easing.ease) }),
            withTiming(1, { duration: 100, easing: Easing.inOut(Easing.ease) }, () => {
                runOnJS(addToCart)(product);
            })
        );
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'This item has been added to your cart',
            swipeable: true
        });
    };

    const toggleFavorite = () => {
        heartScale.value = withSequence(
            withTiming(1.3, { duration: 150, easing: Easing.inOut(Easing.ease) }),
            withTiming(1, { duration: 150, easing: Easing.inOut(Easing.ease) }, () => {
                if (isFav) {
                    runOnJS(removeFromFavorites)(product.id);
                } else {
                    runOnJS(addToFavorites)(product);
                }
            })
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Header />
                <BackNav text='Go back' />

                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                    <View style={{ padding: 15 }}>

                        <View style={styles.imageContainer}>
                            <Image source={{ uri: product.image }} style={styles.image} />

                            <Animated.View style={[styles.favoriteButton, animatedHeartStyle]}>
                                <TouchableOpacity onPress={toggleFavorite}>
                                    <Heart
                                        size={24}
                                        color={isFav ? '#e74c3c' : '#000'}
                                        fill={isFav ? '#e74c3c' : 'transparent'}
                                    />
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>

                        <View style={styles.descriptionContainer}>
                            <Text style={styles.descriptionTitle}>About this item</Text>
                            <View style={styles.bulletPoints}>
                                {product.description.split('. ').map((point, index) => (
                                    <View key={index} style={styles.bulletPoint}>
                                        <Text style={styles.bullet}>•</Text>
                                        <Text style={styles.descriptionText}>{point}.</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.bottomContainer}>
                    <Animated.View style={[styles.addToCartButtonContainer, animatedButtonStyle]}>
                        <TouchableOpacity
                            style={styles.addToCartButton}
                            onPress={handleAddToCart}
                            activeOpacity={0.9}
                        >
                            <Text style={styles.addToCartText}>Add to cart</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#f9f9f9',
        position: 'relative',
        borderRadius: 15
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        marginTop: 10
    },
    favoriteButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: 'white',
        borderRadius: 25,
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    infoContainer: {
        padding: 20,
    },
    productName: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    productPrice: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 20,
        color: '#000',
    },
    descriptionContainer: {
        marginTop: 12,
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
    },
    bulletPoints: {
        marginTop: 8,
    },
    bulletPoint: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'flex-start',
    },
    bullet: {
        fontSize: 14,
        marginRight: 8,
        color: '#777',
        lineHeight: 20,
    },
    descriptionText: {
        fontSize: 14,
        color: '#666',
        flex: 1,
        lineHeight: 20,
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        backgroundColor: 'white',
    },
    addToCartButtonContainer: {
        width: '100%',
    },
    addToCartButton: {
        backgroundColor: '#60B5FF',
        borderRadius: 8,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToCartText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    notFound: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notFoundText: {
        fontSize: 18,
        color: '#666',
    },
});