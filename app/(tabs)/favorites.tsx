import BackNav from '@/components/BackNav';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { useFavoriteStore } from '@/store/favoriteStore';
import { Heart } from 'lucide-react-native';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function FavoritesScreen() {
    const { favorites } = useFavoriteStore();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Header />
                <BackNav text='Favorites' />

                {favorites.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Heart size={64} color="#ccc" />
                        <Text style={styles.emptyText}>No favorites yet</Text>
                        <Text style={styles.emptySubtext}>Items you save will appear here</Text>
                    </View>
                ) : (
                    <FlatList
                        data={favorites}
                        renderItem={({ item }) => (
                            <ProductCard product={item} />
                        )}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        contentContainerStyle={styles.productList}
                        showsVerticalScrollIndicator={false}
                    />
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
    productList: {
        paddingHorizontal: 8,
        paddingTop: 16,
        paddingBottom: 16,
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
});