import { View, Text, TextInput, TouchableOpacity, FlatList, Alert} from "react-native"
import { styles } from "./styles";
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from "react";
import { useState } from "react";
import { ListEmpty } from "../../components/ListEmpty";
import { CardItens } from "../../components/CardItens";

export function Home(){

    const[atividades, setAtividades] = useState<string[]>(["Interger urna interdum massa libero auctor neque turpis turpis semper."])
    const[nomeAtividade, setNomeAtividade] = useState('')

    const[isHovered, setIsHovered] = useState(false)

    function handleAddAtividade(){
        if(atividades.includes(nomeAtividade)){
            return Alert.alert("Atividade já cadastrada","Não é possivel cadastrar atividades duplicadas")
        }

        setAtividades(prev =>[...atividades, nomeAtividade])
        setNomeAtividade('')
    }

    function handleRemoveAtividade(name: string){
        Alert.alert('Remover atividade',`Deseja mesmo remover está atividade?`,[
            {
                text: 'Sim',
                onPress: () => setAtividades(prevState => prevState.filter(atividade => atividade != name))
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ])
    }

    return(
        <View style={styles.container}>
            <View style={styles.cabecalho}>
                <MaterialCommunityIcons name="rocket-outline" size={44} color="#4EA8DE" />
                <Text style={styles.primary}>to</Text>
                <Text style={styles.secondary}>do</Text>
            </View>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Adicione uma nova tarefa"
                    placeholderTextColor={'#808080'}
                    onChangeText={setNomeAtividade}
                    value={nomeAtividade}
                />
                <TouchableOpacity 
                    style={[styles.buttonArea, isHovered && styles.hoverButtonArea]} 
                    onPress={handleAddAtividade}
                    onPressIn={() => setIsHovered(true)}
                    onPressOut={() => setIsHovered(false)}
                >
                    <Feather name="plus-circle" size={24} color="#F2F2F2" />
                </TouchableOpacity>
            </View>
            <View style={styles.dash}>
                <View style={styles.legends}>
                    <View style={styles.legend}>
                        <Text style={styles.criada}>Criadas</Text>
                        <Text style={styles.contagem}>  1  </Text>
                    </View>
                    <View style={styles.legend}>
                        <Text style={styles.concluido}>Concluídos</Text>
                        <Text style={styles.contagem}>  1  </Text>
                    </View>
                </View>
                <FlatList
                    data={atividades}
                    keyExtractor={item => item}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <ListEmpty />
                    )}
                    renderItem={({item}) => (
                        <CardItens 
                            key={item}
                            atividade={item}
                            onRemove={() => handleRemoveAtividade(item)}
                        />
                    )}
                />
            </View>
        </View>
    );
}