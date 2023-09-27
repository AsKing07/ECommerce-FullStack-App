<template>
    <div id="page-wrap" v-if="product">

      <div v-if="isloading" class="loader" >

        
      <div class="spinner-border text-secondary loader-circle" role="status">
      </div>
      <div class="loader-text">Chargement des détails...</div>

      </div>

      <div v-else class="grid-wrap">

        <div id="img-wrap">
          <img :src="product.imageUrl" alt="image du produit" />
        </div>

        <div id="product-details">

          <h1> {{ product.name }} </h1>

          <h3 id="price" >FCFA {{ product.price }} </h3>
          <p>Avis: {{ product.averageRating }} ⭐</p>

          <button  id="add-to-cart"  @click="addToCart" v-if="!showSuccessMessage && !itemIsInCart" :disabled="isAddBoutonDisable"> {{ buttonText }} </button>

          <button id="add-to-cart" class="grey-button" v-if="itemIsInCart">Produit déjà dans le panier</button>

          <button class="green-button"  v-if="showSuccessMessage"> Le produit a bien été ajouté au panier ! Vous serez redirigé vers la page d'accueil </button>

          <h4>Description</h4>
          <p>{{ product.description }}</p>

         </div>

      </div>

    </div>
    <NotFoundPage v-else/> 

</template>

<script>

import axios from 'axios';
import NotFoundPage from './NotFoundPage.vue';


export default{
    name: 'ProductsDetailsPage',
    data() {
        return {
            product: { },
            showSuccessMessage: false,
            isloading : true,
            isAddBoutonDisable : false,
            buttonText :'Ajouter au Panier',
            cartItems: [],

        };
    },

    computed: {
      itemIsInCart() {
        return this.cartItems.some(item => item.id === this.product.id);
      }
    },

    components: { NotFoundPage },

    methods:{

      async addToCart()
      {
          this.isAddBoutonDisable = true

          this.buttonText = "Veuillez Patienter"

          

          await axios.post('/api/users/12345/cart',{
            productId: this.$route.params.id,
          })

          this.showSuccessMessage = true;

          setTimeout(() => 
          {
          this.$router.push('/products')
          }, 3000)
      }

    },

    async created()
    {
      
      const { data: product } = await axios.get(`/api/products/${this.$route.params.id}`);
      this.product = product;

      const { data: cartItems } = await axios.get('/api/users/12345/cart');
      this.cartItems = cartItems;

      this.isloading = false

    }
}

</script>

<style scoped >
  #page-wrap {
    margin-top: 16px;
    padding: 16px;
    max-width: 600px;
  }

  #img-wrap {
    text-align: center;
  }

  img {
    width: 400px;
  }

  #product-details {
    padding: 16px;
    position: relative;
  }

  #add-to-cart {
    width: 100%;
  }

  #price {
    
    top: 24px;
    right: 16px;
  }

  .green-button
  {
    background-color: green;
  }

  @media only screen and (min-width: 480px) {
    #price {
      position:  absolute
    }
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
