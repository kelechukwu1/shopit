import { Minus, Plus } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';


interface QuantityControlProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    size?: 'small' | 'medium' | 'large';
}

const QuantityControl: React.FC<QuantityControlProps> = ({
    quantity,
    onIncrease,
    onDecrease,
    size,
}) => {
    const scale = useSharedValue(1);

    const animateButton = (callback: () => void) => {
        scale.value = withSequence(
            withTiming(0.9, { duration: 50 }),
            withTiming(1, { duration: 100 })
        );
        callback();
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const getSizeStyles = () => {
        switch (size) {
            case 'small':
                return {
                    container: { height: 30 },
                    button: { width: 28, height: 28 },
                    text: { fontSize: 14 },
                    icon: 18,
                };
            case 'large':
                return {
                    container: { height: 48 },
                    button: { width: 44, height: 44 },
                    text: { fontSize: 18 },
                    icon: 24,
                };
            default:
                return {
                    container: { height: 36 },
                    button: { width: 36, height: 36 },
                    text: { fontSize: 16 },
                    icon: 20,
                };
        }
    };

    const sizeStyles = getSizeStyles();

    return (
        <Animated.View style={[styles.container, sizeStyles.container, animatedStyle]}>
            <TouchableOpacity
                style={[styles.buttonMinus, sizeStyles.button]}
                onPress={() => animateButton(onDecrease)}
            >
                <Minus size={sizeStyles.icon} color="#666" />
            </TouchableOpacity>

            <Text style={[styles.quantity, sizeStyles.text]}>{quantity}</Text>

            <TouchableOpacity
                style={[styles.buttonAdd, sizeStyles.button]}
                onPress={() => animateButton(onIncrease)}
            >
                <Plus size={sizeStyles.icon} color="#666" />
            </TouchableOpacity>
        </Animated.View>
    );
};
export default QuantityControl;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 36,
        flex: 1
    },
    buttonMinus: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#E2E8F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonAdd: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantity: {
        marginHorizontal: 16,
        fontWeight: '600',
        fontSize: 16,
        color: '#333',
    },
});
