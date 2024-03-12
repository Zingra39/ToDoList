import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native"
import { styles } from "./styles";
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from "react";
import { useState } from "react";
import { ListEmpty } from "../../components/ListEmpty";
import { CardItens } from "../../components/CardItens";

export function Home(){

    //CLASSES
    interface Atividade{
        id: number;
        name: string;
        check: boolean;
    }

    //USESTATES
    const[isListAtividades, setListAtividades] = useState<Atividade[]>([])
    const[nomeAtividade, setNomeAtividade] = useState('')
    const[isFocus, setIsFocus] = useState(false)
    const[isHovered, setIsHovered] = useState(false)

    //FUNÇÕES 
    function handleAddAtividade(){
        if(isListAtividades.filter(item => item.name === nomeAtividade).length > 0){
            return Alert.alert("Atividade já cadastrada","Não é possivel cadastrar atividades duplicadas")
        }

        const ultimoID = isListAtividades.length > 0 ? isListAtividades[isListAtividades.length - 1].id! + 1 : 1;

        const novaAtividade: Atividade = {
            id: ultimoID,
            name: nomeAtividade,
            check: false
        }

        setListAtividades(prev =>[...isListAtividades, novaAtividade])

        setNomeAtividade('')
    }

    function handleRemoveAtividade(item: Atividade){
        Alert.alert('Remover atividade',`Deseja mesmo remover está atividade?`,[
            {
                text: 'Sim',
                onPress: () => setListAtividades(prevState => prevState.filter(atividade => atividade.name != item.name))
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ])
    }

    function handleChecked(item: Atividade) {
        const newListAtividades = isListAtividades.map(atividade => {
            if (atividade.id === item.id) {
                return { ...atividade, check: !atividade.check };
            } else {
                return atividade;
            }
        });
    
        setListAtividades(newListAtividades);
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
                    style={[styles.input, isFocus && styles.focus]}
                    placeholder="Adicione uma nova tarefa"
                    placeholderTextColor={'#808080'}
                    onChangeText={setNomeAtividade}
                    value={nomeAtividade}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
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
                        <Text style={styles.contagem}> {isListAtividades.length} </Text>
                    </View>
                    <View style={styles.legend}>
                        <Text style={styles.concluido}>Concluídos</Text>
                        <Text style={styles.contagem}> {isListAtividades.filter(item => item.check === true).length} </Text>
                    </View>
                </View>
                <FlatList
                    data={isListAtividades.sort((a, b) => (a.check === b.check ? 0 : a.check ? 1 : -1))}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <ListEmpty />
                    )}
                    renderItem={({item}) => (
                        <CardItens 
                            key={item.id}
                            atividade={item.name}
                            check={item.check}
                            onCheck={() => handleChecked(item)}
                            onRemove={() => handleRemoveAtividade(item)}
                        />
                    )}
                />
            </View>
        </View>
    );
}