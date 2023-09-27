<template>

    <div class="product-container">

        <img :src="product.imageUrl" alt="" class="product-image">
  
        <div class="details-wrap">
          <h3> {{ product.name  }} </h3>
          <p> FCFA {{ product.price }} </p>
        </div>

        <button class="remove-button" @click="removeFromCart" v-if="!removeIsLoading">Retirer du panier</button>
        <div v-if="removeIsLoading" class="details-wrap">
          <div class="spinner-border text-info loader-circle" role="status"></div>
          <div class="loader-text">Veuillez patienter...</div>
        </div>

    </div>
      

</template>

<script>
export default
{
    name: 'ProductsListItem',
    props: ['product', 'removeIsLoading'],

    methods: 
    {
        removeFromCart() 
        {
            if (!this.removeIsLoading) 
            {
                // Émettre l'événement vers le composant parent pour effectuer le retrait
                this.$emit('remove-from-cart', this.product.id);
            }
        }
    }

    

}

</script>

<style scoped>

.product-container {
    align-content: 'center';
    border-bottom: 1px solid #ddd;
    display: flex;
    padding: 16px;
    width: 100%;
  }

.product-image {
    flex: 1;
    height: 100px;
    max-width: 100px;
  }

  .details-wrap {
    padding: 0 16px;
    flex: 3;
  }

  .remove-button {
    flex: 1;
    margin: auto;
  }
  
  .loader-circle {
    width: 50px;
    height: 50px;
   
  }
  
  .loader-text {
    font-size: 18px;
    font-weight: bold;
  }

</style>