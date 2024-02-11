import { useState,useRef } from "react"
import { Header } from "@/components/header"
import { Product } from "@/components/products"
import { CATEGORIES,MENU } from "@/utils/data/products"
import {View,FlatList,SectionList,Text} from "react-native"
import { CategoryButton } from "@/components/category-button"

export default function Home(){
  
 const [category, setCategory]= useState(CATEGORIES[0])

 const sectionListRef = useRef<SectionList>(null)

  function handleCategorySelect(selectedCategory:string) { 
    setCategory(selectedCategory)

    const sectionIndex = CATEGORIES.findIndex(
      (category)=>category===selectedCategory
    )
    if(sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        animated: true
      })
    }
  }

  return(
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cardQuantityItems={5}/>

      <FlatList 
        data={CATEGORIES}
        keyExtractor={(item)=>item}
        renderItem={({item})=>( 
        <CategoryButton title={item} isSelected={item== category} onPress={()=>handleCategorySelect(item)}/>
        )}
        horizontal
        className="max-h-10 mt-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap:12, paddingHorizontal:20}}
      />
      <SectionList
        ref={sectionListRef}
        className="flex-1 p-5"
        sections={MENU}
        keyExtractor={(item)=>item.id}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({section:{title}})=>( 
        <Text className="text-white text-xl mt-8 mb-3">{title}</Text>
        )}
        renderItem={({item})=>(
          <Product 
            data={item}
          />

          
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:100}}
      />
      
    </View>
  )
}