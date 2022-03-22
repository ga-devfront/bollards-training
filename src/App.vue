<template>
  <header>
    <img class="logo" alt="Vue logo" src="./assets/images/bollards-training.png" width="600" height="337.5">
  </header>
  <div class="wrapper">
    <div class="container">
      <bollard-quiz />
    </div>
  </div>
  <footer>
    <a href="https://www.twitch.tv/non_creation" target="_blank" noreferrer>
      <img alt="Suivez moi sur twitch" src="./assets/images/twitch-logo.png" width="75" height="75"/>
    </a>
  </footer>
</template>

<script>
import BollardQuiz from '@/components/BollardQuiz'

export default {
  title: 'Bollards Training',
  name: 'App',
  components: {
    BollardQuiz
  }
}
</script>

<style lang="scss">
@import "assets/style/main.scss";
</style>
