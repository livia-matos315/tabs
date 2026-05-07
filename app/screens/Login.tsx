import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const { width, height } = Dimensions.get('window');

const PETS = ['🐶', '🐱', '🐰', '🐹', '🐾'];

export default function Login({ navigation }: Props) {
    const [nome, setNome] = useState('');
    const [focused, setFocused] = useState(false);
    const [error, setError] = useState('');

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(40)).current;
    const shakeAnim = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 60,
                friction: 8,
                useNativeDriver: true,
            }),

            Animated.spring(logoScale, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const shake = () => {
        Animated.sequence([
            Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
        ]).start();
    };

    const handleLogin = () => {
        if (nome.trim().length < 2) {
            setError('Digite pelo menos 2 carcteres 🐾');
            shake();
            return;
        }
        setError('');
        navigation.navigate('MainTabs', { usuario: nome.trim() });
    };
    return (
        <KeyboardAvoidingView style={styles.root}>
            <StatusBar barStyle="dark-content" backgroundColor={'#FDF6EE'} />
            <View style={styles.blob1} />
            <View style={styles.blob2} />
            <View style={styles.pawContainer}>
                {['🐾', '🐾', '🐾'].map((p, i) => (
                    <Text key={i} style={[styles.pawDecor, { opacity: 0.08 + i * 0.04, top: 80 + i * 100, left: i % 2 === 0 ? 20 : width - 55 }]}>
                        {p}
                    </Text>
                ))}
            </View>
            <View style={styles.container}>
                <View style={styles.logoArea}>
                    <Animated.View style={[styles.logoCircle, { transform: [{ scale: logoScale }] }]}>
                        <Text style={styles.logoEmoji}>🐾</Text>
                    </Animated.View>
                    <Text style={styles.appName}>PetAdopt</Text>
                    <Text style={styles.tagline}>Encontre seu novo amigo</Text>
                </View>
                <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                    <Text style={styles.cardTitle}>Olá! Qual seu nome?</Text>
                    <View style={[styles.inputWrap, focused && styles.inputWrapFocused, { transform: [{ translateX: shakeAnim }] }]}>
                        <Text style={styles.inputIcon}>👤</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite seu nome"
                            value={nome}
                            onChangeText={setNome}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            autoCapitalize="words"
                            autoCorrect={false}
                        />
                    </View>
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                    <TouchableOpacity
                        style={[styles.btn, nome.trim().length < 2 && styles.btnDisabled]}
                        onPress={handleLogin}
                        disabled={nome.trim().length < 2}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.btnText}>Entrar</Text>
                    </TouchableOpacity>
                    <Text style={styles.hint}>
                        Digite pelo menos <Text style={styles.hintBold}>2 caracteres</Text> para continuar
                    </Text>
                </Animated.View>
                <View style={styles.petRow}>
                    {PETS.map((pet, index) => (
                        <Text key={index} style={styles.petEmoji}>{pet}</Text>
                    ))}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

    const styles = StyleSheet.create({
        root: {
            flex: 1,
            backgroundColor: '#FDF6EE',
        },
        blob1: {
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: 150,
            backgroundColor: '#F9C784',
            opacity: 0.25,
            top: -80,
            right: -80,
        },
        blob2: {
            position: 'absolute',
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: '#E8A87C',
            opacity: 0.2,
            bottom: 80,
            left: -60,
        },
        pawContainer: {
            position: 'absolute',
            width: '100%',
            height: '100%',
        },
        pawDecor: {
            position: 'absolute',
            fontSize: 48,
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 28,
        },
        logoArea: {
            alignItems: 'center',
            marginBottom: 36,
        },
        logoCircle: {
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: '#E8A87C',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 14,
            shadowColor: '#E8A87C',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.4,
            shadowRadius: 16,
            elevation: 8,
        },
        logoEmoji: {
            fontSize: 36,
        },
        appName: {
            fontSize: 36,
            fontWeight: '800',
            color: '#3D2314',
            letterSpacing: -1,
        },
        tagline: {
            fontSize: 14,
            color: '#9A7A6A',
            marginTop: 4,
            textAlign: 'center',
            fontStyle: 'italic',
        },
        card: {
            backgroundColor: '#FFFFFF',
            borderRadius: 28,
            padding: 28,
            width: '100%',
            shadowColor: '#3D2314',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.08,
            shadowRadius: 24,
            elevation: 6,
        },
        cardTitle: {
            fontSize: 20,
            fontWeight: '700',
            color: '#3D2314',
            marginBottom: 20,
        },
        inputWrap: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FDF6EE',
            borderRadius: 14,
            borderWidth: 2,
            borderColor: '#EDE0D4',
            paddingHorizontal: 14,
            marginBottom: 8,
        },
        inputWrapFocused: {
            borderColor: '#E8A87C',
            backgroundColor: '#FFFAF5',
        },
        inputIcon: {
            fontSize: 16,
            marginRight: 8,
        },
        input: {
            flex: 1,
            height: 50,
            fontSize: 16,
            color: '#3D2314',
        },
        error: {
            fontSize: 13,
            color: '#E05C5C',
            marginBottom: 8,
            marginLeft: 4,
        },
        btn: {
            backgroundColor: '#E8A87C',
            borderRadius: 14,
            height: 52,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 12,
            shadowColor: '#E8A87C',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.45,
            shadowRadius: 12,
            elevation: 6,
        },
        btnDisabled: {
            backgroundColor: '#D4C4BA',
            shadowOpacity: 0,
            elevation: 0,
        },
        btnText: {
            fontSize: 16,
            fontWeight: '700',
            color: '#FFFFFF',
            letterSpacing: 0.3,
        },
        hint: {
            fontSize: 13,
            color: '#9A7A6A',
            textAlign: 'center',
            marginTop: 16,
        },
        hintBold: {
            fontWeight: '700',
            color: '#E8A87C',
        },
        petRow: {
            flexDirection: 'row',
            marginTop: 28,
            gap: 12,
        },
        petEmoji: {
            fontSize: 28,
        },
    })
