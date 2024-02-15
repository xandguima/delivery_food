import { Input } from "@/components/input";
import { Header } from "@/components/header";
import { Button } from "@/components/button";
import { Product } from "@/components/products";
import { LinkButton } from "@/components/link-button";

import { ProductCartProps, useCartStore } from "@/stores/cart-store";

import { useState } from "react";

import { View,Text,ScrollView,Alert,Linking } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { formatCurerncy } from "@/utils/functions/format-currency";

import { Feather } from "@expo/vector-icons";

import { useNavigation } from "expo-router";

const PHONE_NUMBER = "+55"

export default function Cart(){
  const navigation = useNavigation()
  const [adress,setAdress] =useState("")
  const cartStore =useCartStore()
  const total = formatCurerncy(cartStore.products.map((product)=>product.price*product.quantity).reduce((total,price)=>total+price,0))
  
  function handleProductRemove(product:ProductCartProps){
    Alert.alert("Remover item",`Deseja remover ${product.title} do carrinho?`,[
    {
      text:"Cancelar",
    },
    {
     text:"Remover",
     onPress:()=>cartStore.remove(product.id), 
    }
  ])}

  function handleOrder(){
    if(adress.trim().length ===0 ){
      return Alert.alert("Endereço de entrega","Por favor, informe o endereço de entrega")
    }

    const products = cartStore.products
    .map((product)=>`\n${product.quantity} ${product.title}`)
    .join("")

    const message =`
    📃 NOVO PEDIDO:
    \n Entregar para : ${adress}

    ${products}
    \n Valor total: ${total}
    `
    Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)
    cartStore.clear()
    navigation.goBack()
    Alert.alert("Novo pedido","Pedido enviado com sucesso!")
  }

  return(
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho"/>
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        extraHeight={100}
      >
        <ScrollView>
          <View className="p-5 flex-1">
            {
              cartStore.products.length > 0 ?(
                <View className="border-b border-slate-700">
                  {cartStore.products.map((product)=>(
                    <Product 
                    key={product.id} 
                    data={product} 
                    onPress={()=>handleProductRemove(product)}/>
                  ))}
                </View>
              ):
              (
              <Text className="font-body text-slate-400 text-center my-8">Seu carrinho está vazio</Text>
              )
            }

            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-slate-400 font-body text-base">Total:</Text>

              <Text className="text-lime-400 text-2xl font-heading ">
                {total}
              </Text>
              
            </View>

            <Input 
            placeholder="Informe o endereço de entrega completo" 
            onChangeText={setAdress}
            blurOnSubmit={true}
            onSubmitEditing={handleOrder}
            returnKeyType="next"
            />  
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar Pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20}/>
          </Button.Icon>
        </Button>
        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  )
}