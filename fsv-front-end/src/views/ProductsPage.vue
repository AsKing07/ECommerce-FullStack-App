<template>
  <div id="page-wrap">
    <!-- Animation de chargement avec un effet de pulsation -->
    <div v-if="isLoading" class="loader">
      <div class="spinner-grow loader-circle text-primary"  role="status">
      </div>
      <div class="loader-text">Chargement en cours...</div>
    </div>
    
    <!-- Afficher la grille de produits lorsque isLoading est false -->
    <ProductsGrid :products="products" />
  </div>
</template>

<script>
import axios from 'axios';
import ProductsGrid from '@/components/ProductsGrid.vue';

export default {
  name: 'ProductsPage',
  data() {
    return {
      products: [],
      isLoading: true, // Ajouter la variable isLoading
    };
  },
  components: { ProductsGrid },

  async created() {
    try 
    {
      const result = await axios.get('/api/products');
      const products = result.data;
      this.products = products;
      this.isLoading = false; // Mettre à jour isLoading lorsque les données sont chargées
    } 
    catch (error) 
    {
      console.error('Erreur lors du chargement des données :', error);
      this.isLoading = false; // Mettre à jour isLoading en cas d'erreur
    }
  },
};
</script>

<style>
/* Styles pour l'animation de chargement */
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
