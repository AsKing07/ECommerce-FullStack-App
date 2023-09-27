<template>
  <div id="app">
   
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>

import NavBar from './components/NavBar.vue';
 
export default {
  name: 'App',
  components: {NavBar}
}

</script>

<style>
  * {
    box-sizing: border-box;
    font-family: Arial;
  }

  #page-wrap {
    margin: auto;
    max-width: 800px;
    min-height: 100vh;
  }

  button 
  {
    background-color: black;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    outline: 0;
    padding: 16px;
  }

  button:disabled
  {
    cursor: not-allowed;
  }

  

  @media only screen and (min-width: 768)
  {
      button:hover
    {
      transform: scale(1.2);
    }
  }
</style>

