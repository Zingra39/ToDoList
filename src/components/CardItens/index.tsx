import { View, Text, TouchableOpacity } from "react-native"
import { styles } from "../CardItens/styles"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import React, { useState } from "react";
import * as Animatable from 'react-native-animatable'
import BouncyCheckbox from "react-native-bouncy-checkbox";

type Props = {
    atividade: string;
    onRemove: () => void
}

export function CardItens({atividade, onRemove}:Props){
    const[isHovered, setIsHovered] = useState(false);

    return(
        <View style={styles.card}>
            <TouchableOpacity style={styles.checkBoxArea}>
                <Icon name="checkbox-blank-circle-outline" style={styles.uncheckedBox}/>
            </TouchableOpacity>
            <Text style={styles.descricao}> {atividade} </Text>
            <Animatable.View
                style={[styles.buttonArea, isHovered && styles.hoverButton]}
                transition={['backgroundColor']}
                duration={500}
                easing='ease-in-out'
            >
                <TouchableOpacity 
                    onPress={onRemove}
                    onPressIn={() => setIsHovered(true)}
                    onPressOut={() => setIsHovered(false)}
                >
                    <Icon name='trash-can-outline' style={[styles.delete, isHovered && styles.hoveredDelte]}/>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    )
}
