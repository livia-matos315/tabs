export type RootStackParamList = {
    Login: undefined;
    MainTabs: {usuario: string};
    PetDetalhes: {petId: string, nomePet: string};
};

export type TabParamList = {
    Dashboard: {usuario:string};
    Explorar: {usuario:string};
    Perfil: {usuario:string};
    Favoritos: {usuario:string};
    
};
