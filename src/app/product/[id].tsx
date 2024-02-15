import { Button } from "@/components/button";
import {Feather} from "@expo/vector-icons"
import { View,Image,Text } from "react-native";
import { PRODUCTS } from "@/utils/data/products";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { LinkButton } from "@/components/link-button";
import { formatCurerncy } from "@/utils/functions/format-currency";

import { useCartStore } from "@/stores/cart-store";

export default function Product(){
  const cartStore = useCartStore();
  const {id} = useLocalSearchParams();

  const navigation = useNavigation();
  
  const product =PRODUCTS.find((item)=> item.id === id)

  if(!product){
    return <Redirect href="/"/>
  }
  function handleAddToCart() {
    if(product){
      cartStore.add(product)
      navigation.goBack()
    }
  }

  return(
    <View className="flex-1">
      <Image
      source={product.cover}
      className="w-full h-52"
      resizeMode="cover"/>

      <View className="p-5 mt-8 flex-1">
        <Text className="text-white font-heading text-xl">{product.title}</Text>
        <Text className="text-lime-400 text-2xl font-heading my-2">
          {formatCurerncy(product.price)}
        </Text>
        <Text 
        className="text-slate-400 font-body text-base leading-6 mb-6">
          {product.description}
        </Text>

        {
          product.ingredients.map((ingredient)=>(
            <Text 
            key={ingredient}
            className="text-slate-400 font-body text-base leading-6"
            >
             {"\u2022"} {ingredient}
            </Text>
          ))
        }

      </View>

      <View className="p-5 pb-8 gap-5">
        <Button onPress={handleAddToCart}>
          <Button.Icon>
            <Feather name="plus-circle" size={20}/>
          </Button.Icon>
          <Button.Text>Adicionar ao pedido</Button.Text>
        </Button>
        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>

    </View>
  )
}