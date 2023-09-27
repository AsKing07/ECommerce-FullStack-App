<template>

    <div v-if="products.length >0" >

        <ProductsListItem 
        v-for="product in products" 
        v-on:remove-from-cart="$emit('remove-from-cart', $event)"
        :key="product.id" 
        :product="product"
        :removeIsLoading="removeIsLoading"
              
        />

    </div>
    <p v-else> Vous n'avez encore rien ajouté à votre Panier</p>


</template>

<script>
import ProductsListItem from './ProductsListItem.vue';

export default 
{
    name: 'ProductsList',
    components: {ProductsListItem},
    props: ['products', 'removeIsLoading']
    

}


</script>


<style scoped>
 
 

  

  
</style>