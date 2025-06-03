import { useRouter } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const BackNav = ({ text }: { text: string }) => {
    const router = useRouter()
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <ChevronLeft size={24} color="#333" />
                <Text style={styles.backText}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BackNav

const styles = StyleSheet.create({
    container: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        fontSize: 17,
        fontWeight: '700',
        marginLeft: 4,
    },
})