<template>
  <div id="page-wrap">

    <h1>Panier d'achat</h1>

    <div v-if="isLoading" class="loader">

      <div class="spinner-border text-secondary loader-circle" role="status">
      </div>
      <div class="loader-text">Chargement du panier...</div>


    </div>
    
    <div v-else>

      <ProductsList 
      :products="cartItems" 
      :removeIsLoading="removeIsLoading"
      v-on:remove-from-cart="removeFromCart($event)"
      />

    </div>
    

    <h3 id="total-price">Total: {{ totalPrice }} FCFA</h3>

    <button id="checkout-button">Procéder au payement</button>

  </div>
</template>

<script>
import axios from 'axios'
import ProductsList from '../components/ProductsList.vue';

export default 
{
    name: 'CartPage',
    components: 
    {
      ProductsList,
    },
    data() 
    {
      return {
        cartItems : [],
        isLoading: true,
        removeIsLoading : false


      }
    },
    computed: 
    {
      totalPrice() 
      {
        return this.cartItems.reduce(
          (sum, item) => sum + Number(item.price),
          0,
        );
      }
    },

    methods: 
    {
      async removeFromCart(productId) {
        this.removeIsLoading = true;
        const result = await axios.delete(`/api/users/12345/cart/${productId}`);
        this.cartItems = result.data;
        setTimeout(() => {
        this.removeIsLoading = false;
        }, 2000);
      }
    },

    async created()
    {
      const result = await axios.get('/api/users/12345/cart')
      const cartItems = result.data;
      this.cartItems = cartItems;
      this.isLoading = false;

    }
};
</script>

<style scoped>
  h1 {
    border-bottom: 1px solid black;
    margin: 0;
    margin-top: 16px;
    padding: 16px;
  }

  #total-price {
    padding: 16px;
    text-align: right;
  }

  #checkout-button {
    width: 100%;
  }

  .loader 
{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.loader-circle 
{
  width: 50px;
  height: 50px;
}

.loader-text 
{
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
}

  

</style>
