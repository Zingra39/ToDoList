import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        backgroundColor:'#1A1A1A',
        flex: 1
    },
    form:{
        width:'100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding:20,
        position:'absolute',
        top: 148
    },
    input:{
        backgroundColor:'#333333',
        color:'#F2F2F2',
        borderRadius: 5,
        flex: 1,
        padding: 10,
        fontSize: 16,
        height: 60,
        marginRight: 10
    },
    buttonArea:{
        width: 60,
        height: 60,
        backgroundColor:'#1E6F9F',
        borderRadius: 5,
        alignItems:'center',
        justifyContent:'center'
    },
    hoverButtonArea:{
        backgroundColor:'#4EA8DE'
    },
    primary:{
        color:'#4EA8DE',
        fontSize:44,
        fontWeight: 'bold'
    },
    secondary:{
        color:'#5E60CE',
        fontSize:44,
        fontWeight: 'bold'
    },
    cabecalho:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0D0D0D',
        padding:70
    },
    dash:{
        marginTop: 60,
        alignItems:'center'
    },
    legends:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        gap:160
    },
    criada:{
        fontSize:14,
        fontWeight:'bold',
        color:'#4EA8DE'
    },
    concluido:{
        fontSize:14,
        fontWeight:'bold',
        color:'#5E60CE'
    },
    contagem:{
        fontSize:14,
        fontWeight:'bold',
        color:'#F2F2F2',
        backgroundColor:'#333333',
        textAlign:'center',
        borderRadius:10
    },
    legend:{
        flexDirection:'row',
        gap:10
    },
    focus:{
        borderColor:'#8284FA',
        borderWidth:1
    }
})

