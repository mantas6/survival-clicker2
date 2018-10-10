<template>
  <div id="app">
    <header></header>
    <main>
      <nav>
        <router-link to="/">Home</router-link>
      </nav>
      <article>
        <router-view/>
      </article>
    </main>
    <aside></aside>
  </div>
</template>

<style lang="scss">
  #app {
    display: flex;
  }
</style>
