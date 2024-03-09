import { View, Text } from "react-native";
import { styles } from "./styles";
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';

export function ListEmpty(){
    return(
        <View style={styles.empty}>
            <MaterialCommunityIcons name="clipboard-outline" size={65} color="#808080" />
            <Text style={styles.notificationPrimary}>Você ainda não tem tarefas cadastradas</Text>
            <Text style={styles.notificationSecondary}>Crie tarefas e organize seus itens a fazer</Text>
        </View>
    )
}