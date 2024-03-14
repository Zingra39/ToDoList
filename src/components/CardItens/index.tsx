import { View, Text, TouchableOpacity } from "react-native"
import { styles } from "../CardItens/styles"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import React, { useState } from "react";
import * as Animatable from 'react-native-animatable'

//Define propriedade para o componente
type Props = {
    atividade: string;
    check: boolean;
    onRemove: () => void;
    onCheck: () => void;
}

export function CardItens({atividade, check, onRemove, onCheck}:Props){
    
    //Constante que verifica se objeto está pressionado 
    const[isHovered, setIsHovered] = useState(false);

    return(
        <View style={styles.card}>
            <TouchableOpacity style={styles.checkBoxArea} onPress={onCheck}>
                <Icon 
                    //Quando check for true, o icone irá mudar o modelo
                    name={check ?"check-circle":"checkbox-blank-circle-outline"}
                    //Quando check for true, o icone irá mudar de estilo
                    style={[styles.uncheckedBox, check && styles.checked]}
                />
            </TouchableOpacity>
                {/* Quando check for true, o texto irá mudar de estilo */}
                <Text style={[styles.descricao,check && styles.atividadeConcluida]}>{atividade}</Text>
            <Animatable.View
                //Quando isHovered for true, o area do Amimatble irá mudar de estilo
                style={[styles.buttonArea, isHovered && styles.hoverButton]}
                transition={['backgroundColor']}
                duration={500}
                easing='ease-in-out'
            >
                <TouchableOpacity 
                    onPress={onRemove}
                    //Ao Pressionar, seta o valor da constante isHovered para true
                    onPressIn={() => setIsHovered(true)}
                    //Ao Pressionar, seta o valor da constante isHovered para false
                    onPressOut={() => setIsHovered(false)}
                >
                    {/* Quando isHovered for true, o icone irá mudar de estilo */}
                    <Icon name='trash-can-outline' style={[styles.delete, isHovered && styles.hoveredDelte]}/>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    )
}
