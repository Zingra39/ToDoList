import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native"
import { styles } from "./styles";
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';//Importa Icones 
import React from "react";
import { useState } from "react";
import { ListEmpty } from "../../components/ListEmpty";
import { CardItens } from "../../components/CardItens";

export function Home(){

    /////////////////////////////////  CLASSES  ////////////////////////////////////////
    //Cria classe Atividada
    interface Atividade{
        id: number;
        name: string;
        check: boolean;
    }


    /////////////////////////////////  USESTATES  //////////////////////////////////////
    //Lista que armazena atividades
    const[isListAtividades, setListAtividades] = useState<Atividade[]>([])

    //Constante que armazena nome da atividade
    const[nomeAtividade, setNomeAtividade] = useState('')

    //Constante que verifica se objeto está em foco
    const[isFocus, setIsFocus] = useState(false)

    //Constante que verifica se objeto está pressionado 
    const[isHovered, setIsHovered] = useState(false)


    /////////////////////////////////  FUNÇÕES  ////////////////////////////////////////
    //Função que adiciona atividade na isListAtividade
    function handleAddAtividade(){
        //Realiza um filtro, e verifica se existe pelo menos uma ativida com o nome passado
        if(isListAtividades.filter(item => item.name === nomeAtividade).length > 0){
            //Caso for verdadeiro, exibi mensagem de atividade cadastrada
            return Alert.alert("Atividade já cadastrada","Não é possivel cadastrar atividades duplicadas")
        }

        //Variavel que armazena o ultimo ID cadastrado
        const ultimoID = isListAtividades.length > 0 ? isListAtividades[isListAtividades.length - 1].id! + 1 : 1;

        //Cria objeto Atividade
        const novaAtividade: Atividade = {
            id: ultimoID,
            name: nomeAtividade,
            check: false
        }

        //Faz o incremento da nova atividade na isListAtividades
        setListAtividades(prev =>[...isListAtividades, novaAtividade])

        //Deixa valor do campo de input vaio
        setNomeAtividade('')
    }

    //Função que recebe como parametro um Objeto Atividade, e realiza a exclusão do objeto especificado da lista
    function handleRemoveAtividade(item: Atividade){
        //Exibi uma tela de confirmação para realizar a exclusão
        Alert.alert('Remover atividade',`Deseja mesmo remover está atividade?`,[
            {
                //Caso a opção for sim, ele chama na função onPress uma lista atualizada, onde vai realizar um filtro para deixar apenas a Atividades que não forem igual a que foi passada
                text: 'Sim',
                onPress: () => setListAtividades(prevState => prevState.filter(atividade => atividade.name != item.name))
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ])
    }

    //Função que recebe como parametro um Objeto Atividade, e realiza mudança do valor check
    function handleChecked(item: Atividade) {
        //Cria uma nova variavel, onde irá ser feito um map para encontrar a Atividade passada.
        const newListAtividades = isListAtividades.map(atividade => {
            //Caso valor seja encontrado, altera o valor
            if (atividade.id === item.id) {
                return { ...atividade, check: !atividade.check };
            } else {
                return atividade;
            }
        });
        
        //Atualiza lista com base na constante criada
        setListAtividades(newListAtividades);
    }
    

    ///////////////////////////////  ESTRUTURA DO COMPONENTE  //////////////////////////////////
    return(
        <View style={styles.container}>
            <View style={styles.cabecalho}>
                {/* Adicione icone de foguete */}
                <MaterialCommunityIcons name="rocket-outline" size={44} color="#4EA8DE" />
                <Text style={styles.primary}>to</Text>
                <Text style={styles.secondary}>do</Text>
            </View>
            <View style={styles.form}>
                <TextInput
                    // Realiza condiconal, onde se isFocus for True, altera a estilização do componente
                    style={[styles.input, isFocus && styles.focus]}
                    placeholder="Adicione uma nova tarefa"
                    placeholderTextColor={'#808080'}
                    onChangeText={setNomeAtividade}
                    value={nomeAtividade}
                    //Ao focar, seta o valor da constante isFocus para true
                    onFocus={() => setIsFocus(true)}
                    //Ao focar, seta o valor da constante isFocus para false
                    onBlur={() => setIsFocus(false)}
                />
                <TouchableOpacity 
                    // Realiza condiconal, onde se isHovered for True, altera a estilização do componente
                    style={[styles.buttonArea, isHovered && styles.hoverButtonArea]} 
                    //Ao pressionar faz chamada da função handleAddAtividade
                    onPress={handleAddAtividade}
                    //Ao Pressionar, seta o valor da constante isHovered para true
                    onPressIn={() => setIsHovered(true)}
                    //Ao Pressionar, seta o valor da constante isHovered para false
                    onPressOut={() => setIsHovered(false)}
                >
                    <Feather name="plus-circle" size={24} color="#F2F2F2" />
                </TouchableOpacity>
            </View>
            <View style={styles.dash}>
                <View style={styles.legends}>
                    <View style={styles.legend}>
                        <Text style={styles.criada}>Criadas</Text>
                        {/* Exibi quantidade de Atividades na lista isListAtividades */}
                        <Text style={styles.contagem}> {isListAtividades.length} </Text>
                    </View>
                    <View style={styles.legend}>
                        <Text style={styles.concluido}>Concluídos</Text>
                        {/* Exibi quantidade de Atividades na lista isListAtividades que tenha valor check = true */}
                        <Text style={styles.contagem}> {isListAtividades.filter(item => item.check === true).length} </Text>
                    </View>
                </View>
                <FlatList
                    //Realiza ordenação na isListAtividades, deixando em primeiro as Atividades que o check = false
                    data={isListAtividades.sort((a, b) => (a.check === b.check ? 0 : a.check ? 1 : -1))}
                    //Passo com chave o ID
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    //Quando lista estiver vazia, faz chamada do componete ListEmpty
                    ListEmptyComponent={() => (
                        <ListEmpty />
                    )}
                    //Quando a lista estiver com 1 item, renderiza o componente CardItens
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