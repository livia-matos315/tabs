export type RootStackParamList = {
    Login: undefined;
    MainTabs: {usuario: string};
    PetDetalhes: {petId: string, nomePet: string};
};

export type TabParamList = {
    Explorar: {usuario:string};
    Favoritos: {usuario:string};
    Perfil: {usuario:string};
};
