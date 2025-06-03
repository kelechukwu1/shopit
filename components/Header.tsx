import { useUserStore } from '@/store/userStore';
// import { useRouter } from 'expo-router';
import { Bell } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Header = () => {
    // const router = useRouter();
    const { user } = useUserStore();

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>

                <View style={styles.logoPlaceholder}>
                    <Text style={styles.logoText}>Full Logo</Text>
                </View>
            </View>

            <View style={styles.addressContainer}>
                <Text style={styles.addressLabel}>DELIVERY ADDRESS</Text>
                <Text style={styles.address}>{user?.address || 'Set your address'}</Text>
            </View>

            <TouchableOpacity style={styles.notificationButton}>
                <Bell size={24} color="#333" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoPlaceholder: {
        width: 80,
        height: 36,
        backgroundColor: '#e6f2ff',
        borderWidth: 1,
        borderColor: '#a3cbff',
        borderRadius: 4,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 12,
        color: '#3498DB',
    },
    addressContainer: {
        alignItems: 'center',
        flex: 1,
    },
    addressLabel: {
        fontSize: 12,
        color: '#777',
        fontWeight: '500',
    },
    address: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    notificationButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
});

export default Header;