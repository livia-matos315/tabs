import React, { useRef, useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    StatusBar,
    FlatList,
    ActivityIndicator,
    Image,
    Modal,
} from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabParamList, RootStackParamList } from "../types/navigation";

type Props = CompositeScreenProps<
    BottomTabScreenProps<TabParamList, "Explorar">,
    NativeStackScreenProps<RootStackParamList>
>;

export default function Ongs({ route, navigation }: Props) {
    const usuario = route.params?.usuario || "Visitante";
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [carregando, setCarregando] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOng, setSelectedOng] = useState<any>(null);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();


        const timer = setTimeout(() => {
            setCarregando(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const renderOng = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.ongCard}
            activeOpacity={0.9}
            onPress={() => {
                console.log("ONG clicada:", item.nome); 
                setSelectedOng(item);
                setModalVisible(true);
            }}
        >
            <View style={[styles.headerCard, { backgroundColor: item.cor }]}>
                <View style={styles.logoContainer}>
                    <Image
                        source={item.logo}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.headerInformacoes}>
                    <Text style={styles.ongNome}>{item.nome}</Text>
                    <Text style={styles.fundacaoText}>Desde {item.fundacao}</Text>
                </View>
            </View>

            <View style={styles.descricaoCard}>
                <Text style={styles.descricaoText} numberOfLines={2}>
                    {item.descricao}
                </Text>
                <View style={styles.fimCard}>
                    <Text style={styles.ongCity}>📍 {item.cidade}</Text>
                    <View style={styles.contatoBanner}>
                        <Text style={styles.contatoText}>
                            {item.emojiContato}{item.contato}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (carregando) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#3D2314" />
                <Text style={{ marginTop: 10 }}>Buscando parceiros...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{selectedOng?.nome}</Text>
                        <Text style={styles.modalLabel}>Cidade</Text>
                        <Text style={styles.modalText}>{selectedOng?.cidade}</Text>
                        <Text style={styles.modalLabel}>Fundação</Text>
                        <Text style={styles.modalText}>{selectedOng?.fundacao}</Text>
                        <Text style={styles.modalLabel}>Contato</Text>
                        <Text style={styles.modalText}>{selectedOng?.emojiContato}{selectedOng?.contato}</Text>
                        <Text style={styles.modalLabel}>Descrição</Text>
                        <Text style={styles.modalDescription}>{selectedOng?.descricao}</Text>
                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={() => setModalVisible(false)}
                            activeOpacity={0.85}
                        >
                            <Text style={styles.modalCloseText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.header}>
                <Text style={styles.title}>Instituições parceiras</Text>
            </View>

            <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                <FlatList
                    data={ONGS_DATA}
                    keyExtractor={(item) => item.id}
                    renderItem={renderOng}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF6EE'
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 60,
        marginBottom: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#3D2314',
    },
    listContent: {
        padding: 24,
        paddingTop: 12,
    },
    ongCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 28,
        marginBottom: 20,
        elevation: 4,
        shadowColor: "#3D2314",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    headerCard: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
    },
    emojiContainer: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emojiText: {
        fontSize: 24,
    },
    headerInformacoes: {
        marginLeft: 12,
    },
    ongNome: {
        fontSize: 18,
        fontWeight: '800',
        color: '#3D2314',
    },
    fundacaoText: {
        fontSize: 12,
        color: '#5A3A2A',
        opacity: 0.7,
    },
    descricaoCard: {
        padding: 20,
    },
    descricaoText: {
        fontSize: 14,
        color: '#5A3A2A',
        lineHeight: 20,
        marginBottom: 16,
    },
    fimCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ongCity: {
        fontSize: 12,
        color: '#9A7A6A',
        fontWeight: '600',
    },
    contatoBanner: {
        backgroundColor: '#FDF6EE',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E8DED1',
    },
    logoContainer: {
        width: 60,
        height: 60,
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    logoImage: {
        width: '80%',
        height: '80%',
    },
    contatoText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#3D2314',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    modalContent: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
        elevation: 12,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#3D2314',
        marginBottom: 16,
    },
    modalLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#9A7A6A',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginTop: 12,
    },
    modalText: {
        fontSize: 14,
        color: '#5A3A2A',
        marginTop: 4,
    },
    modalDescription: {
        fontSize: 14,
        color: '#5A3A2A',
        lineHeight: 20,
        marginTop: 8,
    },
    modalCloseButton: {
        marginTop: 24,
        backgroundColor: '#3D2314',
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: 'center',
    },
    modalCloseText: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 15,
    },

});

const ONGS_DATA = [
    {
        id: "1",
        nome: "Aujude-nos!",
        cidade: "Varpa, SP",
        cor: "#FFE8CC",
        logo: require('../../assets/logos/vamos.png'),
        emojiContato: "📞 ",
        contato: "(14) 99788-8820",
        descricao: "ONG criada para resgatar cãezinhos de rua e dá-los uma nova oportunidade. Venha conhecer!",
        fundacao: "09/04/2025",
    },
    {
        id: "2",
        nome: "Patinhas Aumigas",
        cidade: "Campinas, SP",
        cor: "#E0F7FA",
        logo: require('../../assets/logos/patinhas.png'),
        emojiContato: " 📧 ",
        contato: "@patinhasaumigas",
        descricao: "ONG dedicada a cuidar de animais abandonados, oferecendo cuidados e adoções.",
        fundacao: "20/03/2024",
    },
    {
        id: "3",
        nome: "Ong Amigos de 4 Patas",
        cidade: "São Paulo, SP",
        cor: "#FCE4EC",
        logo: require('../../assets/logos/amigos.png'),
        emojiContato: "📧 ",
        contato: "ong.amigosde4patas@email.com",
        descricao: "ONG que oferece cuidados veterinários para os animais necessitados.",
        fundacao: "07/10/2015",
    },
    {
        id: '4',
        nome: "Cãopanheiros",
        cidade: "Colombo, PR",
        cor: "#E8F5E9",
        logo: require('../../assets/logos/cao.png'),
        emojiContato: "📞 ",
        contato: "(41) 99195-4864",
        descricao: "ONG que atua na proteção e bem-estar dos animais de estimação, deixando claro que devem adotar com responsabilidade.",
        fundacao: "05/05/2023",
    },
];