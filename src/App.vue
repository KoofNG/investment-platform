<template>
  <div id="app">
    <notifications></notifications>
    <router-view/>
    <notifications group="foo" />
  </div>
</template>

<style>
  @import "./assets/css/custom.css";
</style>
