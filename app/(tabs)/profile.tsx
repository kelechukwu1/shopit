import BackNav from '@/components/BackNav';
import Header from '@/components/Header';
import { useUserStore } from '@/store/userStore';
import { Bell, ChevronRight, CreditCard, EditIcon, CircleHelp as HelpCircle, LogOut, Moon, Shield, ShoppingBag } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

export default function ProfileScreen() {
    const { user, logout, updateUserInfo } = useUserStore();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(user?.name || '');
    const [editedEmail, setEditedEmail] = useState(user?.email || '');
    const [editedPhone, setEditedPhone] = useState(user?.phone || '');
    const [editedAddress, setEditedAddress] = useState(user?.address || '');
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

    const editButtonScale = useSharedValue(1);
    const saveButtonScale = useSharedValue(1);
    const formHeight = useSharedValue(0);

    const handleLogout = () => {
        Alert.alert(
            'Confirm Logout',
            'Are you sure you want to log out?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', style: 'destructive', onPress: () => logout() }
            ]
        );
    };

    const handleEditToggle = () => {
        editButtonScale.value = withSequence(
            withTiming(0.9, { duration: 100 }),
            withTiming(1, { duration: 100 }, () => {
                if (!isEditing) {
                    formHeight.value = withSpring(340);
                } else {
                    formHeight.value = withSpring(0);
                }
                setIsEditing(!isEditing);
            })
        );
    };

    const handleSaveProfile = () => {
        saveButtonScale.value = withSequence(
            withTiming(0.9, { duration: 100 }),
            withTiming(1, { duration: 100 }, () => {
                updateUserInfo({
                    name: editedName,
                    email: editedEmail,
                    phone: editedPhone,
                    address: editedAddress
                });
                formHeight.value = withSpring(0);
                setIsEditing(false);

                Toast.show({
                    type: 'success',
                    text1: 'Profile Updated',
                    text2: 'Your profile information has been updated successfully.',
                    swipeable: true
                });
            })
        );
    };

    const animatedEditButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: editButtonScale.value }],
        };
    });

    const animatedSaveButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: saveButtonScale.value }],
        };
    });

    const animatedFormStyle = useAnimatedStyle(() => {
        return {
            height: formHeight.value,
            overflow: 'hidden',
        };
    });

    const renderSettingItem = (icon: React.ReactNode, title: string, onPress?: () => void, rightElement?: React.ReactNode) => (
        <TouchableOpacity
            style={styles.settingItem}
            onPress={onPress}
            disabled={!onPress}
        >
            <View style={styles.settingIconContainer}>
                {icon}
            </View>
            <Text style={styles.settingText}>{title}</Text>
            <View style={styles.settingRight}>
                {rightElement || <ChevronRight size={18} color="#999" />}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Header />
                <BackNav text='Profile' />

                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.profileHeader}>
                        <View style={styles.profileInfo}>
                            <Text style={styles.name}>{user?.name}</Text>
                            <Text style={styles.email}>{user?.email}</Text>
                            <Text style={styles.address}>{user?.address}</Text>
                        </View>

                        <Animated.View style={animatedEditButtonStyle}>
                            <TouchableOpacity
                                style={[
                                    styles.editButton,
                                    isEditing && styles.editButtonActive
                                ]}
                                onPress={handleEditToggle}
                            >
                                <EditIcon size={18} color={isEditing ? 'white' : '#3498DB'} />
                            </TouchableOpacity>
                        </Animated.View>
                    </View>

                    {isEditing && (
                        <Animated.View style={[styles.editFormContainer, animatedFormStyle]}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Name</Text>
                                <TextInput
                                    style={styles.input}
                                    value={editedName}
                                    onChangeText={setEditedName}
                                    placeholder="Full name"
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    value={editedEmail}
                                    onChangeText={setEditedEmail}
                                    placeholder="Email address"
                                    keyboardType="email-address"
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Phone</Text>
                                <TextInput
                                    style={styles.input}
                                    value={editedPhone}
                                    onChangeText={setEditedPhone}
                                    placeholder="Phone number"
                                    keyboardType="phone-pad"
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Address</Text>
                                <TextInput
                                    style={styles.input}
                                    value={editedAddress}
                                    onChangeText={setEditedAddress}
                                    placeholder="Delivery address"
                                />
                            </View>

                            <Animated.View style={[styles.saveButtonContainer, animatedSaveButtonStyle]}>
                                <TouchableOpacity
                                    style={styles.saveButton}
                                    onPress={handleSaveProfile}
                                >
                                    <Text style={styles.saveButtonText}>Save Changes</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </Animated.View>
                    )}

                    <View style={styles.settingsContainer}>
                        <Text style={styles.settingsTitle}>Account Settings</Text>

                        {renderSettingItem(
                            <ShoppingBag size={20} color="#3498DB" />,
                            'My Orders'
                        )}

                        {renderSettingItem(
                            <CreditCard size={20} color="#3498DB" />,
                            'Payment Methods'
                        )}

                        {renderSettingItem(
                            <Bell size={20} color="#3498DB" />,
                            'Notifications',
                            () => setNotifications(!notifications),
                            <Switch
                                value={notifications}
                                onValueChange={setNotifications}
                                trackColor={{ false: '#e0e0e0', true: '#bde0ff' }}
                                thumbColor={notifications ? '#3498DB' : '#f5f5f5'}
                            />
                        )}

                        {renderSettingItem(
                            <Moon size={20} color="#3498DB" />,
                            'Dark Mode',
                            () => setDarkMode(!darkMode),
                            <Switch
                                value={darkMode}
                                onValueChange={setDarkMode}
                                trackColor={{ false: '#e0e0e0', true: '#bde0ff' }}
                                thumbColor={darkMode ? '#3498DB' : '#f5f5f5'}
                            />
                        )}

                        {renderSettingItem(
                            <Shield size={20} color="#3498DB" />,
                            'Privacy & Security'
                        )}

                        {renderSettingItem(
                            <HelpCircle size={20} color="#3498DB" />,
                            'Help & Support'
                        )}

                        {renderSettingItem(
                            <LogOut size={20} color="#e74c3c" />,
                            'Logout',
                            handleLogout,
                            <View />
                        )}
                    </View>
                </ScrollView>
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
    },
    profileHeader: {
        backgroundColor: 'white',
        padding: 20,
        marginTop: 16,
        marginHorizontal: 16,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    profileInfo: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    address: {
        fontSize: 14,
        color: '#666',
    },
    editButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#3498DB',
    },
    editButtonActive: {
        backgroundColor: '#3498DB',
        borderColor: '#3498DB',
    },
    editFormContainer: {
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginTop: 12,
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        overflow: 'hidden',
        height: 0,
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 14,
    },
    saveButtonContainer: {
        marginTop: 8,
    },
    saveButton: {
        backgroundColor: '#2ECC71',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    settingsContainer: {
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginTop: 24,
        marginBottom: 32,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        padding: 16,
    },
    settingsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    settingIconContainer: {
        width: 32,
        alignItems: 'center',
        marginRight: 12,
    },
    settingText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    settingRight: {
        marginLeft: 8,
    },
});